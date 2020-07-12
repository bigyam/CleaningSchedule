<template>
    <v-container>
        <v-toolbar text dense color="primary white--text">
            <v-toolbar-title>Rooms</v-toolbar-title>
            <v-spacer></v-spacer>        
        </v-toolbar>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-btn large color="primary" outlined @click="onAddClick">Add</v-btn>
                </v-row>
                
                  <v-data-table
                    :headers="headers"
                    :items="indexedRoomList"   
                    :loading="isLoading" 
                    fixed-header
                    height="500"     
                    >
                    
                    <template v-slot:item.complexity="{ item }">
                        {{ matchComplexity(item) }}
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-btn class="mx-1" icon outlined color="#9ba5e0" @click.stop="onEdit(item)"><v-icon>edit</v-icon></v-btn>
                        <v-btn class="mx-1" icon outlined color="#9ba5e0" @click.stop="onDelete(item)" title='Delete'><v-icon>delete</v-icon></v-btn> 
                    </template>
                </v-data-table>
            </v-card-text>     
        </v-card>

        <v-dialog persistent v-model="showEdit" max-width="900px">
            <v-card>
                <v-card-title class="title">Room Details</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" class="my-n2">
                            <v-text-field 
                                v-model="selectedItem.room_name" 
                                label="Name">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="my-n2">
                            <v-select 
                                v-model="selectedItem.complexity" 
                                label="Complexity"
                                :items="complexity"
                                item-value='id'
                                item-text='label'>
                            </v-select>
                        </v-col>
                    </v-row>
                    
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn @click="cancel()" right>Cancel</v-btn>
                    <v-btn color="#9ba5e0" @click="save()" :loading="isLoading" right>Submit</v-btn>
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
    </v-container>   
</template>

<script>
import { mapGetters } from 'vuex';
    export default {
        data() { 
            return {
                search: null,
                showDelete: false,
                isLoading: false,
                showEdit: false,
                selectedItem: {},
                //rooms: [],
                singleRoom: null,
            }
        },
        computed: {
            ...mapGetters(['rooms']),
            headers() {
                let headers = [
                    { text: 'Name', value: 'room_name', align: 'left', width: '25%' },
                    { text: 'Complexity', value: 'complexity', align: 'left', width: '25%' },
                    { text: 'Actions', value: 'action', align: 'left', width: '25%' },
                ]; 
                return headers
            },
            complexity() {
                return [ {id: 1, label: "Low"},{id: 2, label: "Medium"},{id: 3, label: "High"},]
            },
            indexedRoomList() {
                return this.rooms.map((item, idx) => ({
                    index: idx,
                    ...item
                }))
            }
        },
        methods: {
            fetchData() {
                /**return this.$service.config.getRooms().then(resp => {
                    this.rooms = resp.data;
                });**/
            },
            onEdit(item) {
                this.selectedItem = {...item};
                this.showEdit = true;
            },
            onDelete(item) {
                this.showDelete = true;
                this.selectedItem = item;
            },
            onConfirmDelete() {
                this.$service.config.deleteRoom(this.selectedItem.id).then(() => {
                        this.rooms.splice(this.selectedItem.index,1);
                        this.showDelete = false;
                        this.selectedItem = {};
                })
            },
            cancel() {
                this.showEdit = false;
                this.selectedItem = {};
            },
            save() {
                if(Object.prototype.hasOwnProperty.call(this.selectedItem, 'index')) {
                    let model = {
                        roomId: this.selectedItem.id,
                        roomName: this.selectedItem.room_name,
                        roomComplexity: this.selectedItem.complexity
                    };
                    this.$service.config.updateRoom(model).then(() => {
                        this.fetchData();
                        this.showEdit = false;
                        this.selectedItem = {};
                    })
                } else {
                    let model = {
                        roomName: this.selectedItem.room_name,
                        roomComplexity: this.selectedItem.complexity,
                    }
                    this.$service.config.addRoom(model).then(() => {
                        this.fetchData();
                        this.showEdit = false;
                        this.selectedItem = {};        
                    })
                }
            },
            matchComplexity(item) {
                return this.complexity.find(x => x.id == item.complexity).label;
            },
            onAddClick() {
                this.showEdit = true;
            }
        },
        created() {
            //this.fetchData();
        }
    }
</script>