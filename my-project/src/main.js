import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { sync } from 'vuex-router-sync'
import axios from './plugins/axios'
import './main.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'

sync(store, router)

let app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.config.productionTip = false
app.use(router, store, axios, VueProgress)
app.mount('#app')
