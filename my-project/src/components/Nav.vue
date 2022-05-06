<template>
    <div class="w-full bg-white fixed top-0 shadow-lg">
        <div class="w-11/12 mx-auto flex justify-between justify-center items-center px-5 py-7">
            <div class="text-black sm:text-left text-center text-4xl font-bold font-pacifico">
                <h1>Hospital</h1>
            </div>
            <!-- desktop view -->
            <div class="flex bg-white space-x-12 hidden sm:block text-black-200 font-raleway tracking-wide items-center">
                <router-link to="/">HOME</router-link> 
                <router-link to="/login" v-if="!user">LOGIN</router-link>
                <router-link to="/customer" v-if="user">
                    CUSTOMERS
                </router-link>
                <router-link to="/department" v-if="user">
                    DEPARTMENTS
                </router-link>
                <router-link to="/employee" v-if="user">
                    EMPLOYEES
                </router-link>
                <router-link to="/" v-if="user">
                    USERNAME: {{ user.username }}
                </router-link>
                <span @click="logout">
                    <router-link to="" v-if="user">LOGOUT</router-link>  
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    // import { mapGetters } from 'vuex'
    export default {
        name: 'NavComp',
        data() {
            return {
                user: {}
            }
        },
        mounted() {
            this.user = 'userData'
        },
        methods: {
            logout() {
                window.localStorage.removeItem('jwt')
                this.$router.push('/login')
            }
        }
    }
</script>
<style scoped>
</style>
