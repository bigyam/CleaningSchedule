<template>
    <v-container>
        <v-toolbar text dense color="primary white--text">
            <v-toolbar-title>Rooms</v-toolbar-title>
            <v-spacer></v-spacer>        
        </v-toolbar>
        <v-card>
            <v-card-text>
                <v-row>
                    
                </v-row>
                
                  <v-data-table
                    :headers="headers"
                    :items="rooms"   
                    :loading="isLoading" 
                    fixed-header
                    height="500"     
                    >
                    
                    <template v-slot:item.id="{ item }">
                        <v-icon v-if="item.hasScenarios" color="success">check</v-icon>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn class="mx-1" icon outlined color="#9ba5e0" @click.stop="onEdit(item)"><v-icon>edit</v-icon></v-btn>
                        <v-btn class="mx-1" icon outlined color="#9ba5e0" @click.stop="onDelete(item.id)" title='Delete'><v-icon>delete</v-icon></v-btn> 
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
                    <v-btn color="primary" @click="save()" :loading="isLoading" right>Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>   
</template>

<script>
    export default {
        data() { 
            return {
                search: null,
                showDelete: false,
                isLoading: false,
                showEdit: false,
                selectedItem: {},
                rooms: [],
                singleRoom: null,
            }
        },
        computed: {
            headers() {
                let headers = [
                    { text: 'Name', value: 'room_name', align: 'left', width: '25%' },
                    { text: 'Complexity', value: '', align: 'left', width: '25%' },
                    { text: 'Actions', value: 'action', align: 'left', width: '25%' },
                ]; 
                return headers
            },
            complexity() {
                return [ {id: 1, label: "Low"},{id: 2, label: "Medium"},{id: 3, label: "High"},]
            }
        },
        methods: {
            fetchData() {
                return this.$service.config.getRooms().then(resp => {
                    this.rooms = resp.data;
                });
            },
            fetchRooms() {
                return this.$service.config.getSingleRoom(1).then(resp => {
                    this.singleRoom = resp.data;
                });
            },
            onEdit(item) {
                this.selectedItem = item;
                this.showEdit = true;
            },
            onDelete(itemId) {
                console.log('itemId delete', itemId);
            },
            cancel() {
                this.showEdit = false;
            },
            save() {
                this.showEdit = false;
            }
        },
        created() {
            this.fetchData();
            this.fetchRooms();
        }
    }
</script>