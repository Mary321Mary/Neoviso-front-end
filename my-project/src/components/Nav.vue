<template>
    <div class="w-full bg-white fixed top-0 shadow-lg">
        <div class="w-11/12 mx-auto flex justify-between justify-center items-center px-5 py-7">
            <div class="text-black sm:text-left text-center text-4xl font-bold font-pacifico">
                <h1>Hospital</h1>
            </div>
            <!-- desktop view -->
            <div class="flex bg-white space-x-12 hidden sm:block text-black-200 font-raleway tracking-wide items-center">
                <router-link to="/">HOME</router-link>
                <router-link to="/login" v-if="!getUser">LOGIN</router-link>
                <router-link to="/customer" v-if="getUser">
                    CUSTOMERS
                </router-link>
                <router-link to="/department" v-if="(getRole != 'Reception') && getUser">
                    DEPARTMENTS
                </router-link>
                <router-link to="/employee" v-if="(getRole != 'Reception') && getUser">
                    EMPLOYEES
                </router-link>
                <router-link to="/" v-if="getUser">
                    USERNAME: {{ getUser }}
                </router-link>
                <span @click="logout">
                    <router-link to="" v-if="getUser">LOGOUT</router-link>  
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '../store/index'
    import { mapActions } from 'vuex'

    export default {
        name: 'NavComp',
        methods: {
            ...mapActions(['fetchUser']),
            logout() {
                window.localStorage.removeItem('jwt')
                store.dispatch('logout')
                this.$router.push('/login')
            }
        },
        async mounted() {
            store.dispatch('fetchUser')
        },
        computed: {
            getUser() {
                return store.getters.getUser;
            },
            getRole() {
                return store.getters.getRole
            }
        }
    }
</script>
<style scoped>
</style>
