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
                        <v-btn outlined color="#9ba5e0" @click.stop="">Add Room</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-title>
                                <v-chip label regular color="#9ba5e0">Daily</v-chip>
                            </v-card-title>
                            <v-card-text>
                                <room-editor v-for="room in dailyRooms" :key="room.roomId" :roomDetails="room" yearScope=0 />
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
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
            rooms: [],
            tasks: [],
            dailyRooms: []
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
                let items = resp.data.filter(x => x.yearscope == 0);
                    
                this.dailyRooms = this.groupBy(items, item => item.room_id);
                
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
    },
    created() {
        this.fetchData();
    }

}
</script>

<style>

</style>