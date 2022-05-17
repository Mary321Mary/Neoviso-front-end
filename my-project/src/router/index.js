import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home.vue'
import RegisterPage from '../views/Register.vue'
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
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage
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

export default router
