import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from './plugins/axios'
import './main.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'

let app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.config.productionTip = false
app.use(router, axios, VueProgress)
app.mount('#app')
