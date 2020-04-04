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
                    <template v-slot:item.room_name="{ item }">
                        <v-icon v-if="item.isCurrent" color="success">check</v-icon>
                    </template>
                    <template v-slot:item.id="{ item }">
                        <v-icon v-if="item.hasScenarios" color="success">check</v-icon>
                    </template>
<!--
                    <template v-slot:item.action="{ item }">
                        <v-btn class="mx-1" :disabled="item.isCurrent" icon outlined color="success" @click.stop="setCurrent(item.id)" :title="$t('SetCurrent')"><v-icon>check</v-icon></v-btn>
                        <v-btn class="mx-1" :disabled="item.hasScenarios" icon outlined color="error" @click.stop="onDeleteClick(item.id)" :title="$t('app.Delete')"><v-icon>delete</v-icon></v-btn> 
                    </template> -->
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
                                v-model="selectedItem.en" 
                                :label="Name">
                            </v-text-field>
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
                //showEdit: false,
                //selectedItem: {},
                rooms: [],
            }
        },
        computed: {
            headers() {
                let headers = [
                    { text: 'Name', value: 'room_name', align: 'left', width: '25%' },
                    { text: 'Id', value: 'id', align: 'left', width: '25%' },
                ]; 
                return headers
            }
        },
        methods: {
            fetchData() {
                return this.$service.admin.getRooms().then(resp => {
                    this.rooms = resp.data;
                });
            },
        },
        created() {
            this.fetchData();
        }
    }
</script>