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
                        <v-btn outlined color="#9ba5e0" @click.stop="addRoom()">Add Room</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-title>
                                <v-chip label regular color="#9ba5e0">Daily</v-chip>
                            </v-card-title>
                            <v-card-text>
                                <v-row v-for="items in dailyRooms" :key="items.key">
                                    <v-card>
                                        <v-card-title>
                                            {{ matchRoomName(items) }}
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-btn outlined small color="#9ba5e0" @click.stop="addTaskDialog(items, 0)">+ Task</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                
                            </v-card-actions>
                        </v-card>
                    </v-col>
                   <v-col>
                        <v-card>
                            <v-card-title>
                                <v-chip label>Weekly</v-chip>
                            </v-card-title>
                            <v-card-text>
                                <v-row v-for="items in weeklyRooms" :key="items.index">
                                    <v-card>
                                        <v-card-title>
                                            {{items.name}}
                                        </v-card-title>
                                    </v-card>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card>
                            <v-card-title>
                                <v-chip label>Monthly</v-chip>
                            </v-card-title>
                            <v-card-text>
                                <v-row v-for="items in monthlyRooms" :key="items.index">
                                    <v-card>
                                        <v-card-title>
                                            {{items.name}}
                                        </v-card-title>
                                    </v-card>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>     
        </v-card>

        <v-dialog persistent v-model="showAddRoom" max-width="900px">
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
                                v-model="roomToAdd.room" 
                                label="Room"
                                :items="rooms"
                                
                                item-text='room_name'
                                return-object>
                            </v-select>
                        </v-col>
                    </v-row>
                    
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn @click="cancel()" right>Cancel</v-btn>
                    <v-btn color="#9ba5e0" @click="submit()" :loading="isLoading" right>Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog persistent v-model="showDelete" max-width="500px">
            <v-card>
                <v-card-title>Delete Confirmation</v-card-title>
                <v-card-text>
                    <v-row>
                        Are you sure you want to delete?
                    </v-row>
                </v-card-text>
                 <v-card-actions>
                    <v-btn color="#9ba5e0" @click="onConfirmDelete()" right>Yes</v-btn>
                    <v-btn color="#9ba5e0" @click="showDelete = false" right>No</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog persistent v-model="showAddTaskToRoom" max-width="500px">
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
                                    >
                            </v-select>
                        </v-col>
                        <v-col class="ma-0 pa-0">
                            <v-btn color="#9ba5e0" icon outlined @click="showAddTask = true"><v-icon>add</v-icon></v-btn>
                        </v-col>
                        <v-col v-if="showAddTask">
                            <v-text-field
                                v-model="taskToAdd"
                                label="Task Name"
                                />
                            <v-btn color="#9ba5e0" outlined @click="addTask()">Add</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
                 <v-card-actions>
                    <v-btn @click="showAddTaskToRoom = false" right>Cancel</v-btn>
                    <v-btn color="#9ba5e0" @click="addTaskToRoom()" :loading="isLoading" right>Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>   
</template>

<script>
    export default {
        data() { 
            //TODO: all buttons and functions within showAddTaskToRoom dialog
            //TODO: connect APIs for Task.  setup model and api for schedule items
            return {
                search: null,
                showDelete: false,
                isLoading: false,
                showEdit: false,
                rooms: [],
                yearScope: [{id: 0, scopeName: "Daily"}, {id: 1, scopeName: "Weekly"}, {id: 2, scopeName: "Monthly"},],
                singleRoom: null, //could be unused variable
                dailyRooms: [{name:"Living Room", index:1}, {name:"Kitchen", index:2}, {name: "Master", index:3}],
                weeklyRooms: [{name:"Living Room", index:1}, {name:"Kitchen", index:2}, {name: "Master", index:3}],
                monthlyRooms: [{name:"Living Room", index:1}, {name:"Kitchen", index:2}, {name: "Master", index:3}],
                showAddRoom: false,
                roomToAdd: {yearScope: null, room: null},
                tasks: [],
                selectedTask: {},
                showAddTaskToRoom: false,
                showAddTask: false,
                taskToAdd: null,
                selectedRoom: {}
            }
        },
        computed: {
            headers() {
                let headers = [
                    { text: 'Name', value: 'room_name', align: 'left', width: '25%' },
                    { text: 'Complexity', value: 'complexity', align: 'left', width: '25%' },
                    { text: 'Actions', value: 'action', align: 'left', width: '25%' },
                ]; 
                return headers
            },
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
                    //console.log('tempRoom', tempRoom);
                    //need to group items by rooms
                    
                });
                //fetch schedule list 
            },
            groupBy(list, keyGetter) {
                //this needs to change from maps to arrays for vuetify to support
                const map = new Map();
                list.forEach((item) => {
                     const key = keyGetter(item);
                     const collection = map.get(key);
                     if (!collection) {
                         map.set(key, [item]);
                     } else {
                         collection.push(item);
                     }
                });
                return map;
            },
            matchRoomName(item) {
                console.log("item", item);
                console.log(this.rooms.find(x => x.id == item.key));
                return this.rooms.find(x => x.id == item.key);
            },

            onEdit(item) {
                this.selectedItem = {...item};
                this.showEdit = true;
            },
            addTaskDialog(item, yearScope) {
                this.showAddTaskToRoom = true;
                this.selectedRoom = Object.assign(item);
                this.selectedRoom.yearScope = yearScope;
            },
            addTask() {
                let model =  {
                    taskName: this.taskToAdd
                };
                this.$service.config.addTask(model).then(() => {
                    this.fetchData();
                    this.showAddTask = false;
                    this.taskToAdd = null;
                })
            },
            addTaskToRoom () {
                //scheduleItem db
                
            },
            /** savingScheduleItem() {
                let model = {
                    scope: this.selectedRoom.yearScope,
                    taskId: this.selectedTask.id,
                    roomId: this.selectedRoom.room.id //room id does not exist
                }
                this.$service.config.addScheduleItem(model).then(() => {
                    this.fetchData();
                    this.selectedRoom = {};
                    this.selectedTask = {};
                })
            }**/
            onDelete() {
                
            },
            onConfirmDelete() {
                
            },
            cancel() {
                this.showAddRoom = false;
                this.selectedItem = {};
            },
            submit() {
                switch(this.roomToAdd.yearScope) {
                    case 0:
                        // for daily
                        this.dailyRooms.push(this.roomToAdd);
                        this.roomToAdd = {yearScope: null, room: null};
                        break;
                    case 1:
                        // for weekly
                        break;
                    case 2:
                        //for monthly
                        break;
                }
                this.showAddRoom = false;
            },
            save() {
                
            },
            onAddClick() {
                this.showEdit = true;
            },
            addRoom() {
                this.showAddRoom = true;
            }
        },
        created() {
            this.fetchData();
        }
    }
</script>  