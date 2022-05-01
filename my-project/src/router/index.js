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
import AppointmentItem from '../views/AppointmentItem.vue'
import DepartmentItem from '../views/DepartmentItem.vue'
import CustomerItem from '../views/CustomerItem.vue'
import EmployeeItem from '../views/EmployeeItem.vue'

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
    },
    {
        path: '/appointment-item',
        name: 'AppointmentItem',
        component: AppointmentItem
    },
    {
        path: '/department-item',
        name: 'DepartmentItem',
        component: DepartmentItem
    },
    {
        path: '/customer-item',
        name: 'CustomerItem',
        component: CustomerItem
    },
    {
        path: '/employee-item',
        name: 'EmployeeItem',
        component: EmployeeItem
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

createApp(App).use(router).use(vueAxios, axios).mount('#app')
