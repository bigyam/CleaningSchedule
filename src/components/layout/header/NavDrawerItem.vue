<template>
    <v-list-group v-if="hasChildren">
        <v-divider></v-divider>
        <template v-slot:activator>
            <v-list-item-action>
                <v-icon v-if="hasIcon(icon)">{{icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content v-bind="getUrl(to, href)"> 
                <v-list-item-title>{{ title }}</v-list-item-title>
            </v-list-item-content>
        </template>
        <v-list-item v-for="child in children" :key="child.title" v-bind="getUrl(child.to, child.href)">
            <v-list-item-action>
                <v-icon v-if="hasIcon(child)">{{child.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>{{ child.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
    </v-list-group>
    
    <v-list-item v-else v-bind="getUrl(to, href)">
        <v-list-item-action>
            <v-icon v-if="hasIcon(icon)">{{icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>


</template>

<script>
    export default {
        name: 'nav-drawer-item',
        props: {
            children: { type: Array, default: null },
            to: { default: null },
            href: { default: null },
            title: { type: String, default: "" },
            icon: { type: String, default: null }
        },
        computed: {
            hasChildren() {
                return typeof (this.children) !== 'undefined' && this.children !== null;
            },

        },
        methods: {
            hasIcon(icon) {
                return typeof (icon) !== undefined && icon !== null;
            },
            getUrl(to, href) {
                if (typeof (to) !== 'undefined' && to !== null) return { to };
                if (typeof (href) !== 'undefined' && href !== null) return { href };
                return { to: "#" };
            }
        }
    }
</script>
