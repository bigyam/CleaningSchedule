<template>
    <v-row dense>
        <v-card width="100%" outlined>
            <v-card-title class="primary white--text">
                <h5 class="font-weight-regular">{{ getRoomName }}</h5>
                <v-spacer/>
                <v-btn color="#9ba5e0" icon outlined @click="removeRoom()"><v-icon>remove</v-icon></v-btn>
            </v-card-title>
            <v-card-text>
                <v-list dense>
                    <v-list-item 
                        v-for="(taskItem, i) in taskList"
                        :key="i"
                        >
                        <v-list-item-content>
                            <v-list-item-title v-text="getTaskName(taskItem)"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn color="#9ba5e0" icon outlined @click="removeTaskToRoom(taskItem.index)"><v-icon>remove</v-icon></v-btn>
                        </v-list-item-action>
                    </v-list-item>                    
                    <v-card-actions>
                        <v-btn outlined small color="#9ba5e0" @click.stop="showTaskDialog = true">+ Task</v-btn>
                    </v-card-actions>
                </v-list>
            </v-card-text>
        </v-card>
        <v-dialog v-model="showTaskDialog" max-width="900px">
            <v-card>
                <v-form ref="AddTaskForm">
                <v-card-title>Add Task</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-select 
                                v-model="selectedTask" 
                                label="Tasks"
                                :rules="taskFieldRules"
                                :items="tasks"
                                item-text='name'
                                required
                                return-object
                                />
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn @click="cancelAddTask()" right>Cancel</v-btn>
                    <v-btn color="#9ba5e0" @click="addTaskToRoom()" right>Submit</v-btn>
                </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';

export default {
    props: {
        roomDetails: {
            type: Object,
            required: true
        },
        yearScope: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            //rooms: [],
            //tasks: [],
            roomInstance: null,
            showTaskDialog: false,
            selectedTask: null,
            taskFieldRules: []
        }
    },
    watch: {
        'selectedTask' () {
            this.taskFieldRules = [];
        }
    },
    computed: {
        ...mapGetters(['rooms', 'tasks']),
        getRoomName() {
            let result = "";
            if(this.rooms.length != 0){
                result = this.rooms.find(x => x.id == this.roomDetails.roomId).name;
            }
            return result;
        },
        getTaskName: function() {
            var vm = this;
            return function (item) {
                let result;
                if(vm.tasks.length != 0){
                    result = vm.tasks.find(x => x.id == item.task_id).name;
                }
                return result;
            }
        },
        taskList() {
            return this.roomDetails.value.map((item, idx) => ({
                index: idx,
                ...item
            }))
        }
    },
    methods: {
        fetchData() {
            this.$service.config.getRooms().then(resp => {
                this.rooms = resp.data;
            });
            this.$service.config.getTasks().then(resp => {
                this.tasks = resp.data;
            });
        },
        removeRoom() {
            var roomToRemove = _.cloneDeep(this.roomDetails);
            roomToRemove.yearScope = this.yearScope;
            this.$emit('removeRoom', roomToRemove);
        },
        taskExistInRoom(task) {
            if(task){
                for(var i = 0; i < this.roomDetails.value.length; i++){
                    if(this.roomDetails.value[i].task_id == task.id){
                        return true;
                    }
                }
            }
            return false;
        },
        //TODO: new tasks will not have ids.  use this for save to database.
        addTaskToRoom() {
            this.taskFieldRules = [
                v => !!v || 'Field is required',
                v => !this.taskExistInRoom(v) || 'Task already exist in room'
            ];
            let self = this
            setTimeout(function () {                    
                if(self.$refs.AddTaskForm.validate()){
                    self.roomDetails.value.push({
                        yearScope: self.yearScope,
                        room_id: self.roomDetails.roomId,
                        task_id: self.selectedTask.id
                    });
                    self.selectedTask = null,
                    self.showTaskDialog = false;
                    self.$emit('checkValidSave');
                }
            })
            
        },
        cancelAddTask() {
            this.selectedTask = null,
            this.$refs.AddTaskForm.resetValidation();
            this.showTaskDialog = false;
        },
        removeTaskToRoom(index) {
            this.roomDetails.value.splice(index, 1);
            this.$emit('checkValidSave');
        }
    }
}
</script>

<style>

</style>