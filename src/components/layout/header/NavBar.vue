<template>
    <v-row no-gutters :style="{'background': $vuetify.theme.themes.light.secondary }" align="center">
        <v-col d-flex col="10" offset-lg="1" align-self="center">
            <v-tabs background-color="secondary" hide-slider show-arrows dark align-with-title>
                <nav-bar-item v-for="menuItem in menuItems" :key="menuItem.title" v-bind="menuItem" />
            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
import NavBarItem from './NavBarItem'
import PropsMixin from './mixin/props.js'
export default {
    name: 'nav-bar',
    components: { NavBarItem },
    mixins: [ PropsMixin ],
    }
</script>