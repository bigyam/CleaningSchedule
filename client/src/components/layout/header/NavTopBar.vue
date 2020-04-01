
<template>
  
  <v-app-bar 
    :class="{'app-toolbar': true, 'app-toolbar-drawer': navigationDrawer, 'app-toolbar-menu': !navigationDrawer }" 
    :color="navigationDrawer ? 'primary' : 'primary'" 
    :dense="!navigationDrawer"
    :extended="!navigationDrawer"
    app clipped-left dark >

    <nav-bar v-if="!navigationDrawer" slot="extension" v-bind="getProps()" />

    <span v-if="navigationDrawer" class="title mr-5">
          <v-app-bar-nav-icon v-if="navigationDrawer" @click="$emit('drawer-change', !drawer)"></v-app-bar-nav-icon>{{appName}}
        </span>

    <v-row no-gutters>
      <v-col offset-lg="1" d-flex align-self="center" class="pr-9">
        
        <v-toolbar-title v-if="!navigationDrawer">
          <span class="app-name">{{ appName }}</span>
        </v-toolbar-title>
      </v-col>
      
      <v-col lg="4" offset-lg="4" align-self="center" class="mr-9 pr-9">
        <v-toolbar-items class="justify-end align-center">
          <nav-search v-if="showSearch" v-bind="getProps()" @input="(val) => $emit('input', val)" style="padding-top:0" />
        
          <nav-profile v-bind="getProps()">
              <template slot="profile"><slot name="profile"></slot></template>
          </nav-profile>

          <v-icon
          v-show="displayAppTourButton" 
          class="ml-2"
          text large color="white" @click.prevent="appTourMethod">mdi-help-circle</v-icon>
        </v-toolbar-items>
      </v-col>
    </v-row>
  </v-app-bar>


</template>

<script>
import NavSearch from './NavSearch'
import NavProfile from './NavProfile'
import NavBar from './NavBar'

import Props from './mixin/props.js'

export default {
    name: 'nav-top-bar',
    components: {  NavSearch, NavProfile, NavBar },
    mixins: [ Props ],
    props: { drawer: { default: null }},
}
</script>

<style>
.app-toolbar .v-toolbar__extension {
  padding:0;
  height:48px;
}
.app-toolbar-menu .v-toolbar__content {
  padding:0;
}
</style>

<style scoped>


.app-name {
    float:left;
    padding:10px 0 10px 20px;
    background:rgba(0,0,0,0.4);
    position:relative;
    display:block;

}

.app-name:after { 
    content: " "; 
    display: block; 
    width: 0; 
    height: 0;
    border-top: 50px solid transparent; /* Go big on the size, and let overflow hide */
    border-bottom: 50px solid transparent;
    border-left: 30px solid rgba(0,0,0,0.4);
    position: absolute;
    top: 50%;
    margin-top: -50px; 
    left: 100%;
    z-index: 0; 
}


</style>
