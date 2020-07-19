<template>
    <v-container>
        <v-toolbar text dense color="primary white--text">
            <v-toolbar-title>Cleaning Schedule</v-toolbar-title>
            <v-spacer></v-spacer>        
        </v-toolbar>
        <v-card outlined width="100%">
            <v-card-text>
                <v-row justify="space-between">
                    <v-col md="4">
                        <v-btn outlined color="#9ba5e0" @click.stop="showAddRoom = true">Add Room</v-btn>
                    </v-col>
                    <v-col md="4" class="text-right">
                        <v-btn :disabled="!canSave" outlined color="#9ba5e0" @click.stop="saveSchedule()">Save</v-btn>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-alert type="warning" :value="!canSave"> There are rooms with empty tasks. </v-alert>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-title>
                                <v-chip label regular color="#9ba5e0"><h2>Daily</h2></v-chip>
                            </v-card-title>
                            <v-card-text>
                                <room-editor v-for="room in dailyRooms" :key="room.roomId" :roomDetails="room" :yearScope="0" @checkValidSave="checkValidSaveModel"/>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card>
                            <v-card-title>
                                <v-chip label regular color="#9ba5e0"><h2>Weekly</h2></v-chip>
                            </v-card-title>
                            <v-card-text>
                                <room-editor v-for="room in weeklyRooms" :key="room.roomId" :roomDetails="room" :yearScope="1" @checkValidSave="checkValidSaveModel" />
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card>
                            <v-card-title>
                                <v-chip label regular color="#9ba5e0"><h2>Monthly</h2></v-chip>
                            </v-card-title>
                            <v-card-text>
                                <room-editor v-for="room in monthlyRooms" :key="room.roomId" :roomDetails="room" :yearScope="2" @checkValidSave="checkValidSaveModel" />
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-dialog v-model="showAddRoom" max-width="900px">
            <v-form ref="AddRoomForm">
            <v-card>
                <v-card-title class="title">Add Room</v-card-title>
                <v-card-text>
                    <v-form>
                    <v-row>
                        <v-col cols="12" class="my-n2">
                                <v-select 
                                    v-model="roomToAdd.yearScope" 
                                    label="Scope"
                                    :rules="yearRules"
                                    :items="yearScope"
                                    item-value='id'
                                    item-text='scopeName'
                                    required>
                                </v-select>
                        </v-col>
                    </v-row>
                    </v-form>
                    <v-row>
                        <v-col cols="12" class="my-n2">
                            <v-select 
                                v-model="roomToAdd.roomId" 
                                :disabled="!yearScopeValid(roomToAdd.yearScope)"
                                label="Room"
                                :items="rooms"
                                :rules="roomRules"
                                item-text='room_name'
                                item-value='id'
                                required>
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
            </v-form>
        </v-dialog>
    </v-container>
</template>

<script>
import RoomEditor from '../.././components/config/roomEditor.vue';
import { mapGetters, mapActions } from 'vuex';
//import { ValidationProvider, ValidationObserver } from 'vee-validate';
import _ from 'lodash';

export default {
  components: {
        RoomEditor
    },
    data() {
        return {
            //List of rooms and tasks
            //rooms: [],
            //tasks: [],

            //holds room information
            dailyRooms: [],
            weeklyRooms: [],
            monthlyRooms: [],
            originalData: {},
            yearRules: [],
            roomRules: [],
            canSave: false,
            //have submit form disabled/enable based on validation

            //Add room dialog
            showAddRoom: false,
            roomToAdd: {yearScope: null, roomId: null},
            yearScope: [{id: 0, scopeName: "Daily"}, {id: 1, scopeName: "Weekly"}, {id: 2, scopeName: "Monthly"},],
        }        
    },
    watch: {
        'roomToAdd.yearScope' () {
            this.yearRules = [];
        },
        'roomToAdd.roomId' () {
            this.roomRules = [];
        }
    },
    computed: {
        ...mapGetters(['rooms', 'tasks']),
    },
    methods: {
        ...mapActions(['loadRooms','loadTasks']),
        fetchData() {
            /**this.$service.config.getRooms().then(resp => {
                this.rooms = resp.data;
            });
            this.$service.config.getTasks().then(resp => {
                this.tasks = resp.data;
            });**/
            this.$service.config.getScheduleItems().then(resp => {
                this.originalData = _.cloneDeep(resp.data);
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
                if (!collection) {
                    array.push({roomId: key, value: [item]});
                } else {
                    collection.value.push(item);
                }
            });
            return array;
        },
        checkValidSaveModel() {
            console.log('checksave');
            console.log('monthly length', this.monthlyRooms);
            this.canSave = true;
            for(var i = 0; i < 5; i++){
                console.log('iteration', i);
                console.log(this.monthlyRooms[i]);
                if(this.dailyRooms[i] && this.dailyRooms[i].value.length == 0) this.canSave = false
                if(this.weeklyRooms[i] && this.weeklyRooms[i].value.length == 0) this.canSave = false
                if(this.monthlyRooms[i] && this.monthlyRooms[i].value.length == 0) {
                    console.log('checksave false');
                    this.canSave = false;
                }
            }
        },
        cancelAddRoom() {
            this.roomToAdd = {yearScope: null, roomId: null};
            this.$refs.AddRoomForm.resetValidation();
            this.showAddRoom = false;
        },
        roomExistInScope(room, scope) {
            switch(scope){
                case 0:
                    for(var i = 0; i < this.dailyRooms.length; i++){
                        if(this.dailyRooms[i].roomId == room){
                            return true;
                        }
                    }
                    return false;
                case 1:
                    for(var x = 0; x < this.weeklyRooms.length; x++){
                        if(this.weeklyRooms[x].roomId == room){
                            return true;
                        }
                    }
                    return false;
                case 2:
                    for(var y = 0; y < this.monthlyRooms.length; y++){
                        if(this.monthlyRooms[y].roomId == room){
                            return true;
                        }
                    }
                    return false;
            }
        },
        yearScopeValid(scope) {
            return scope == 0 || scope == 1 || scope == 2
        },
        roomIsValid(room) {
            return room == 0 || !!room
        },
        submitAddRoom() {
            this.yearRules = [
                v => this.yearScopeValid(v) || 'Field is required',
            ];
            this.roomRules = [
                v=> this.roomIsValid(v) || 'Field is required',
                v => !this.roomExistInScope(v, this.roomToAdd.yearScope) || 'Room exists already'
            ];
            let self = this
            setTimeout(function () {
                if(self.$refs.AddRoomForm.validate()) {
                switch(self.roomToAdd.yearScope) {
                    case 0:
                        self.dailyRooms.push({
                            isNew: true,
                            roomId: self.roomToAdd.roomId,
                            value: [],
                        });
                        break;
                    case 1:
                        self.weeklyRooms.push({
                            isNew: true,
                            roomId: self.roomToAdd.roomId,
                            value: [],
                        });
                        break;
                    case 2:
                        self.monthlyRooms.push({
                            isNew: true,
                            roomId: self.roomToAdd.roomId,
                            value: [],
                        });
                        break;
                }
                self.roomToAdd = {yearScope: null, roomId: null};
                self.checkValidSaveModel();
                self.showAddRoom = false;
            }
            });
        },
        saveSchedule() {
            let data = _.cloneDeep(this.dailyRooms);
            this.weeklyRooms.forEach((item) => {
                data.push(item);
            });
            this.monthlyRooms.forEach((item) => {
                data.push(item);
            });
            this.$service.config.addScheduleItem(data).then(() => {
                //loading =false
                //reload page?
                //emit something?
            }).catch((error) => {
                this.$emit('error', error);
            });
        },
    },
    created() {
        this.fetchData();
        this.loadRooms();
        this.loadTasks();
        this.checkValidSaveModel()
    }

}
</script>

<style>

</style>