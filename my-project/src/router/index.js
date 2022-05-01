import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import axios from 'axios'
import vueAxios from 'vue-axios'
import App from '../App.vue'
import HomePage from '../views/Home.vue'
import LoginPage from '../views/Login.vue'
import CustomerPage from '../views/Customer.vue'
import DepartmentPage from '../views/Department.vue'
import EmployeePage from '../views/Employee.vue'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/customer',
        name: 'CustomerPage',
        component: CustomerPage
    },
    {
        path: '/department',
        name: 'DepartmentPage',
        component: DepartmentPage
    },
    {
        path: '/employee',
        name: 'EmployeePage',
        component: EmployeePage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

createApp(App).use(router).use(vueAxios, axios).mount('#app')
