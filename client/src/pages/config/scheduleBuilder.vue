<template>
    <v-container>
        <v-toolbar text dense color="primary white--text">
            <v-toolbar-title>Cleaning Schedule</v-toolbar-title>
            <v-spacer></v-spacer>        
        </v-toolbar>
        <v-card outlined width="100%">
            <v-card-text>
                <v-row align="baseline">
                    <v-col>
                        <v-btn outlined color="#9ba5e0" @click.stop="showAddRoom = true">Add Room</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-title>
                                <v-chip label regular color="#9ba5e0"><h2>Daily</h2></v-chip>
                            </v-card-title>
                            <v-card-text>
                                <room-editor v-for="room in dailyRooms" :key="room.roomId" :roomDetails="room" :yearScope="0" />
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card>
                            <v-card-title>
                                <v-chip label regular color="#9ba5e0"><h2>Weekly</h2></v-chip>
                            </v-card-title>
                            <v-card-text>
                                <room-editor v-for="room in weeklyRooms" :key="room.roomId" :roomDetails="room" :yearScope="1" />
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card>
                            <v-card-title>
                                <v-chip label regular color="#9ba5e0"><h2>Monthly</h2></v-chip>
                            </v-card-title>
                            <v-card-text>
                                <room-editor v-for="room in monthlyRooms" :key="room.roomId" :roomDetails="room" :yearScope="2" />
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-dialog v-model="showAddRoom" max-width="900px">
            <v-card>
                <v-card-title class="title">Add Room</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" class="my-n2">
                            <v-select 
                                v-model="roomToAdd.yearScope" 
                                label="Scope"
                                :items="yearScope"
                                item-value='id'
                                item-text='scopeName'>
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="my-n2">
                            <v-select 
                                v-model="roomToAdd.roomId" 
                                label="Room"
                                :items="rooms"
                                item-text='room_name'
                                item-value='id'>
                            </v-select>
                        </v-col>
                    </v-row>                    
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn @click="cancelAddRoom()" right>Cancel</v-btn>
                    <v-btn color="#9ba5e0" @click="submitAddRoom()" right>Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import RoomEditor from '../.././components/config/roomEditor.vue';

export default {
    components: {
        RoomEditor
    },
    data() {
        return {
            //List of rooms and tasks
            rooms: [],
            tasks: [],

            //holds room information
            dailyRooms: [],
            weeklyRooms: [],
            monthlyRooms: [],

            //Add room dialog
            showAddRoom: false,
            roomToAdd: {yearScope: null, roomId: null},
            yearScope: [{id: 0, scopeName: "Daily"}, {id: 1, scopeName: "Weekly"}, {id: 2, scopeName: "Monthly"},],
        }        
    },
    computed: {

    },
    methods: {
        fetchData() {
            this.$service.config.getRooms().then(resp => {
                this.rooms = resp.data;
            });
            this.$service.config.getTasks().then(resp => {
                this.tasks = resp.data;
            });
            this.$service.config.getScheduleItems().then(resp => {
                let daily = resp.data.filter(x => x.yearscope == 0);
                let weekly = resp.data.filter(x => x.yearscope == 1);
                let monthly = resp.data.filter(x => x.yearscope == 2);
                this.dailyRooms = this.groupBy(daily, item => item.room_id);
                this.weeklyRooms = this.groupBy(weekly, item => item.room_id);
                this.monthlyRooms = this.groupBy(monthly, item => item.room_id);
                
            });
        },
        /** 
         * Vuetify items only support generic arrays (no collections like maps, etc)
         * Method to group then spit out vuetify supported collection
         */
        groupBy(list, keyGetter) {
            const array = [];
            list.forEach((item) => {
                const key = keyGetter(item);

                const collection = array.find(x => x.roomId == key);
                console.log('collection', collection);
                if (!collection) {
                    array.push({roomId: key, value: [item]});
                } else {
                    collection.value.push(item);
                }
            });
            return array;
        },
        cancelAddRoom() {
            this.roomToAdd = {yearScope: null, roomId: null},
            this.showAddRoom = false;
        },
        submitAddRoom() {
            switch(this.roomToAdd.yearScope) {
                case 0:
                    this.dailyRooms.push({
                        isNew: true,
                        roomId: this.roomToAdd.roomId,
                        value: [],
                    });
                    break;
                case 1:
                    this.weeklyRooms.push({
                        isNew: true,
                        roomId: this.roomToAdd.roomId,
                        value: [],
                    });
                    break;
                case 2:
                    this.monthlyRooms.push({
                        isNew: true,
                        roomId: this.roomToAdd.roomId,
                        value: [],
                    });
                    break;
            }
            this.roomToAdd = {yearScope: null, roomId: null};
            this.showAddRoom = false;
        }
    },
    created() {
        this.fetchData();
    }

}
</script>

<style>

</style>