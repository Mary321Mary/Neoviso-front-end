import Vue from 'vue'
import HomePage from './views/Home.vue'
import router from './router'
import axios from './plugins/axios'
import './main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight, faArrowLeft, faSearch, faBookmark, faShare, faClock, faCheck, faUserCircle, faTrash, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'
    
library.add(faArrowRight, faArrowLeft, faSearch, faBookmark, faShare, faClock, faCheck, faUserCircle, faTrash, faBars, faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(axios)
Vue.use(VueProgress, { })
Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(HomePage)
}).$mount('#app')
