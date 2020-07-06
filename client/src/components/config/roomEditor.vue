<template>
    <v-dialog>
        <v-card>
            <v-card-title>
                {{ getRoomName() }}
            </v-card-title>
            <v-card-text>
                <v-list>
                    <v-list-item 
                        v-for="(taskItem, i) in roomDetails.value"
                        :key="i"
                        >
                        <v-list-item-content>
                            <v-list-item-title v-text="getTaskName(taskItem)"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-actions>
                        <v-btn outlined small color="#9ba5e0" @click.stop="">+ Task</v-btn>
                    </v-card-actions>
                </v-list>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        roomDetails: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            rooms: [],
            tasks: []
        }
    },
    method: {
        fetchData() {
            this.$service.config.getRooms().then(resp => {
                this.rooms = resp.data;
            });
            this.$service.config.getTasks().then(resp => {
                this.tasks = resp.data;
            });
        },
        getRoomName() {
            return this.rooms.find(x => x.id == this.roomDetails.roomId).room_name;
        },
        getTaskName(item) {
            return this.tasks.find(x => x.id == item.task_Id).room_name;
        }
    }
}
</script>

<style>

</style>