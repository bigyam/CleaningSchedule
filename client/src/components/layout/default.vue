<template>
  <div>
    <v-app>
      <v-snackbar top :color="msg.isError ? 'error' : 'success'" v-model="msg.show">
            {{ msg.text }}
      </v-snackbar>
      <nav-header
        :appName="ApplicationName"
        :showSearch="false"
        navigation-drawer
        :navigation-drawer-width="$route.name == 'welcome'? 0 : 300"

      >
        <slot slot="profile">
          <v-divider></v-divider>
          <v-list>
            
          </v-list>
        </slot>
      </nav-header>

      <v-content>
        <v-container fluid class="pl-0 pr-0">
          <v-row justify="center">
            <v-col lg="12" cols="11" class="mx-2">
              <router-view v-on:success="onSuccess" v-on:error="onError" :key="`${$route.fullPath}`"></router-view>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import NavHeader from './header/index.vue'

export default {
  provide() {
    return { $validator: this.$validator }
  },
  data: () => ({
    msg: {},
    ApplicationName: "Cleaning Schedule"
  }),

  components: { NavHeader },
  methods: {
        onSuccess(message = null) {
          let text = this.$t('SaveSuccessful');

          if(typeof message == "string")
              text = message

          this.msg = {show: true, isError: false, text };
      },
      onError(message = null) {
          let text = this.$t('ErrorOccured');

          if(typeof message == "string")
              text = message
              
          this.msg = {show: true, isError: true, text };
      }
  }
}
</script>