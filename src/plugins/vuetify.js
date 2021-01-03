import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const vuetify = new Vuetify({
    icons: {
        iconfont: 'md'
    },
    theme:{ 
        themes: {
            light: {
                primary: '#4169e1',
                info: '#4C5990',
                success: '#9ba5e0',
                secondary: '#606060', 
                accent: '#9ba5e0',
             //   error: '#9ba5e0'
            }
        }
    }
});

export default vuetify