<template>
    <v-container>
        <v-toolbar text dense color="primary white--text">
            <v-toolbar-title>Cleaning Schedule</v-toolbar-title>
            <v-spacer></v-spacer>        
        </v-toolbar>
        <v-card outlined width="100%">
            <v-card-text>
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-title>
                                <v-chip label regular color="#9ba5e0"><h2>Weekly</h2></v-chip>
                            </v-card-title>
                            <v-card-text>
                                <task-list v-for="room in weeklyRooms" :key="room.roomId" :roomDetails="room" :yearScope="1"/>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card>
                            <v-card-title>
                                <v-chip label regular color="#9ba5e0"><h2>Monthly</h2></v-chip>
                            </v-card-title>
                            <v-card-text>
                                <task-list v-for="room in monthlyRooms" :key="room.roomId" :roomDetails="room" :yearScope="2"/>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card>
                            <v-card-title>
                                <v-chip label regular color="#9ba5e0"><h2>Others</h2></v-chip>
                            </v-card-title>
                            <v-card-text>
                                <task-list v-for="room in otherRooms" :key="room.roomId" :roomDetails="room" :yearScope="0"/>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import _ from 'lodash';
import TaskList from '.././components/config/taskUpdater.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
    components: {
        TaskList
    },
    data() {
        return {
            otherRooms: [],
            weeklyRooms: [],
            monthlyRooms: [],
        }
    },
    computed: {
        ...mapGetters(['rooms', 'tasks']),
    },
    methods: {
        ...mapActions(['loadRooms', 'loadTasks']),
        fetchData() {
            /**this.$service.config.getRooms().then(resp => {
                this.rooms = resp.data;
            });
            this.$service.config.getTasks().then(resp => {
                this.tasks = resp.data;
            });**/
            this.$service.config.getScheduleItems().then(resp => {
                this.originalData = _.cloneDeep(resp.data);
                let other = resp.data.filter(x => x.yearScope == 0);
                let weekly = resp.data.filter(x => x.yearScope == 1);
                let monthly = resp.data.filter(x => x.yearScope == 2);
                this.otherRooms = this.groupBy(other, item => item.room_id);
                this.weeklyRooms = this.groupBy(weekly, item => item.room_id);
                this.monthlyRooms = this.groupBy(monthly, item => item.room_id);
                
            });
        },
        groupBy(list, keyGetter) {
            const array = [];
            list.forEach((item) => {
                const key = keyGetter(item);

                const collection = array.find(x => x.roomId == key);
                if (!collection) {
                    array.push({roomId: key, value: [item]});
                } else {
                    collection.value.push(item);
                }
            });
            return array;
        },
    },
    created() {
        this.fetchData();
        this.loadRooms();
        this.loadTasks();
    }
}
</script>
