<template>
    <v-menu  
    open-on-hover 
    :close-on-content-click="false" 
    offset-y bottom left
>
    <template v-slot:activator="{ on }">
        <v-avatar class="ml-2 layout-avatar" :color="backgroundColor()" size="32" v-on="on">
            <span v-if="isAuthenticated" :style="{'color': $vuetify.theme.themes.light.primary }">{{ initial(userName) }}</span>
            <span v-else>
                <v-icon
                    text 
                    large
                    color="white"
                >mdi-web</v-icon>
            </span>
        </v-avatar>
        
    </template>

    <v-list v-if="isAuthenticated">
        <v-list-item >
            <v-list-item-content> 
                <v-list-item-title>               
                {{ $t("Welcome") }}, {{ userName }} 
                </v-list-item-title>    
                <v-list-item-subtitle v-show="lastLogin != null && lastLogin instanceof Date && !isNaN(lastLogin.valueOf())"> 
                {{$t("LastLogin")}}: {{lastLogin | datetime('datetime')}}
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>      
    </v-list>
    <v-divider v-if="isAuthenticated"></v-divider>

    <v-list subheader>
        <v-subheader>{{ $t('SelectALanguage') }}</v-subheader>
        <v-list-item @click="switchLanguage('en')">
            <v-list-item-action>
              <v-icon v-if="$i18n.locale == 'en'" color="pink">mdi-check</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                English
            </v-list-item-content>
        </v-list-item>
        <v-list-item @click="switchLanguage('fr')" >
            <v-list-item-action>
              <v-icon v-if="$i18n.locale == 'fr'" color="pink">mdi-check</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                Français
            </v-list-item-content>
        </v-list-item>
    </v-list>
    <slot v-if="isAuthenticated" name="profile"></slot>
</v-menu>

</template>

<script>

import Props from './mixin/props.js'

export default {
    mixins: [ Props ],
    computed: {
        selectedLanguage() {
            return (this.$i18n.locale === 'en') ? "English" : "Français";
        } 
    },
    methods: {
        backgroundColor() {
            return (this.isAuthenticated) ? "white" : "$vuetify.theme.themes.light.primary"
        },
        switchLanguage(val) {
            this.languageAltCb(val === 'en' ? 'fr' : 'en');
        },
        sanitize(value){
            var result= value.replace(/\([^()]*\)/g, '');
            return result;
        },
        initial (value) {
            let sanitizedValue = this.sanitize(value);
            let parts = sanitizedValue.split(/[ -]/)
            let initials = ''

            for (var i = 0; i < parts.length; i++) {
                initials += parts[i].charAt(0)
            }
            if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
                initials = initials.replace(/[a-z]+/g, '')
            }
            initials = initials.substr(0, 3).toUpperCase()

            return initials
        },
    }
}
</script>

<style scoped>
.layout-avatar {
    font: inherit !important;
    font-weight:bold!important;
    }
</style>
