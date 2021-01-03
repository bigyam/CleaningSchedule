<template>
  <v-navigation-drawer v-model="state" fixed clipped class="grey lighten-4" app :width="navigationDrawerWidth">
    <v-list>
        <nav-drawer-item v-for="menuItem in menuItems" :key="menuItem.title" v-bind="menuItem" />
    </v-list>
  </v-navigation-drawer>
</template>

//only finished intranet
<script>
import NavDrawerItem from './NavDrawerItem'
import Props from './mixin/props.js'
export default {
    name: 'nav-drawer',
    components: { NavDrawerItem },
    mixins: [ Props ],
    props: { drawer: { default: null }},
    data: () => ({
      state: null
    }),
    methods: {
        switchLanguage(val) {
            this.languageAltCb(val === 'en' ? 'fr' : 'en')
        }
    },
    watch: {
        drawer : {
            handler(val) {
                this.state = val
            },
            immediate: true
        },
        state: {
          handler(val) {
            this.$emit("drawer-change", val)
          },
          immediate: true
        }
    }

}
</script>

<style>

</style>