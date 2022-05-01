import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import axios from 'axios'
import vueAxios from 'vue-axios'
import App from '../App.vue'
import HomePage from '../views/Home.vue'
import LoginPage from '../views/Login.vue'
import AppointmentPage from '../views/Appointment.vue'
// import Customer from '../views/Customer.vue'
// import Department from '../views/Department.vue'
// import Employee from '../views/Employee.vue'

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
        path: '/appointment',
        name: 'AppointmentPage',
        component: AppointmentPage
    // },
    // {
    //     path: '/customer',
    //     name: 'Customer',
    //     component: Customer
    // },
    // {
    //     path: '/department',
    //     name: 'Department',
    //     component: Department
    // },
    // {
    //     path: '/employee',
    //     name: 'Employee',
    //     component: Employee
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

createApp(App).use(router).use(vueAxios, axios).mount('#app')
