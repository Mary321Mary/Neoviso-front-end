import Vue from 'vue'
import HomePage from './views/Home.vue'
//import './registerServiceWorker'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'
import './main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight, faArrowLeft, faSearch, faBookmark, faShare, faClock, faCheck, faUserCircle, faTrash, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'
import vuetify from './plugins/vuetify';
import moment from 'moment';
    
library.add(faArrowRight, faArrowLeft, faSearch, faBookmark, faShare, faClock, faCheck, faUserCircle, faTrash, faBars, faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(vueAxios, axios)
Vue.use(VueProgress, {
    // defaultShape: 'circle',
})
Vue.config.productionTip = false
Vue.prototype.moment = moment
new Vue({
    router,
    vuetify,
    render: h => h(HomePage)
}).$mount('#app')
