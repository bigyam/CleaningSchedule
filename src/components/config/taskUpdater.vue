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
                        :key="i">
                        <v-list-item-content>
                            <v-list-item-title v-text="getTaskName(taskItem)"
                                @click.stop="showDetails(taskItem)">
                            </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-checkbox v-model="taskItem.isComplete" @change="toggleComplete(taskItem)"/>
                        </v-list-item-action>
                    </v-list-item>                    
                </v-list>
            </v-card-text>
        </v-card>
        <v-dialog v-model="showDetailsDialog" max-width="900px">
            <v-card>
                <v-card-title>
                    Task Details
                </v-card-title>
                <v-card-text>
                    Room: {{ getRoomName }}<br>
                    Task: {{ taskDetails != null ? getTaskName(taskDetails) : 'empty object'}}<br>
                    Last Completed: {{ taskDetails != null ? 
                                            taskDetails.lastComplete != null ? taskDetails.lastComplete : 'lastComplete is null'
                                            : 'task Details is null' }} <br>
                    Last Completed By: {{ taskDetails != null ? 
                                            taskDetails.lastCompletedBy != null ? taskDetails.lastCompletedBy : 'lastCompletedBy is null'
                                            : 'task Details is null' }}
                </v-card-text>
            </v-card>            
        </v-dialog>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

/**
 * need to add in post to "complete" a task
 */
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
            showDetailsDialog: false,
            taskDetails: null
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
        toggleComplete(item) {
            console.log(item);
            let model = {
                id: item.id,
                isComplete: item.isComplete,
                lastCompletedBy: this.$store.state.auth.user.id
            };
            this.$service.config.toggleComplete(model);
        },
        showDetails(item) {
            this.taskDetails = item;
            this.showDetailsDialog = true;
        }
    }
}
</script>

<style>

</style>