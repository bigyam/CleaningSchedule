<template>
    <v-row dense>
        <v-card width="100%" outlined>
            <v-card-title class="primary white--text">
                <h5 class="font-weight-regular">{{ getRoomName }}</h5>
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
        <v-dialog v-model="showTaskDialog">
            <v-card>
                <v-card-title>Add Task</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-select 
                                v-model="selectedTask" 
                                label="tasks"
                                :items="tasks"
                                item-text='task_name'
                                return-object
                                />
                        </v-col>
                        <v-col class="ma-0 pa-0">
                            <v-btn color="#9ba5e0" icon outlined @click="addTaskToRoom()"><v-icon>add</v-icon></v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
//import _ from 'lodash';

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
            rooms: [],
            tasks: [],
            roomInstance: null,
            showTaskDialog: false,
            selectedTask: null
        }
    },
    watcher: {

    },
    computed: {
        getRoomName() {
            //TODO: add vuex to minimize api calls
            //vuex will solve this lenght =0 thing
            let result = "";
            if(this.rooms.length != 0){
                result = this.rooms.find(x => x.id == this.roomDetails.roomId).room_name;
            }
            return result;
        },
        getTaskName: function() {
            var vm = this;
            return function (item) {
                let result;
                if(vm.tasks.length != 0){
                    result = vm.tasks.find(x => x.id == item.task_id).task_name;
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
        //TODO: new tasks will not have ids.  use this for save to database.
        addTaskToRoom() {
            this.roomDetails.value.push({
                yearScope: this.yearScope,
                room_id: this.roomDetails.roomId,
                task_id: this.selectedTask.id
            });
            this.showTaskDialog = false;
        },
        removeTaskToRoom(index) {
            this.roomDetails.value.splice(index, 1);
        }
    },
    created() {
        this.fetchData();
    }
}
</script>

<style>

</style>