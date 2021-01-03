
<template>
<div>
    <nav-drawer 
    v-if="navigationDrawer"
      v-bind="getProps()" 
      :drawer="drawerState" 
      @drawer-change="drawerChange" />

    <nav-top-bar 
        v-bind="getProps()"
        @input="(val) => $emit('input', val)" 
        :drawer="drawerState"
        @drawer-change="drawerChange"
    >
        <template slot="profile"><slot name="profile"></slot></template>
    </nav-top-bar>

</div>
</template>

<script>
import NavTopBar from './NavTopBar'
import NavDrawer from './NavDrawer'

import Props from './mixin/props.js'

export default {
    name: 'nav-header',
    components: { NavTopBar, NavDrawer},
    mixins: [ Props ],
    data: () => ({
      drawerState: null
    }),
    methods: {
      drawerChange(val) {
        this.drawerState = val
      }
    }
}
</script>


<style>
.header .v-toolbar__extension, .gc-intranet-header .v-toolbar__content{
    padding-left:0;padding-right:0;
}
</style>
