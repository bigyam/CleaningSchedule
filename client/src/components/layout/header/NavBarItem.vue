<template>
    <v-menu dark open-on-hover offset-y>
        <template v-slot:activator="{ on }"> 
            <v-btn class="menu-button" v-on="on" text v-bind="getUrl(to, href)" dark><v-icon v-if="hasIcon(icon)">{{icon}}</v-icon>{{ title }}</v-btn> 
        </template>
        <v-list v-if="hasChildren">
            <v-list-item v-for="child in children" :key="child.title"  v-bind="getUrl(child.to, child.href)" :active-class="'secondary lighten-1'">
                <v-list-item-title >
                    <v-icon v-if="hasIcon(child.icon)">{{child.icon}}</v-icon> {{ child.title }}
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: 'nav-bar-item',
    props: {
        children: { type: Array, default: null},
        to: { default: null },
        href: { default: null },
        title: { type: String, default: "" },
        icon: { type: String, default: null}
    },
    computed: {
        hasChildren() {
            return typeof(this.children) !== 'undefined' && this.children !== null;
        },
        
    },
    methods: {
        hasIcon(icon) {
            return typeof(icon) !== undefined && icon !== null;
        },
        getUrl(to, href) {
            if (typeof(to) !== 'undefined' && to !== null) return { to };
            if (typeof(href) !== 'undefined' && href !== null) return { href} ;
            return { to: "#" };
        }
    }
}
</script>
<style scoped>
.menu-button {
    height: inherit!important;
}
</style>