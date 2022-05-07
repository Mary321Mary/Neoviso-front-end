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
                <router-link to="/department" v-if="user.role != 'Reception'">
                    DEPARTMENTS
                </router-link>
                <router-link to="/employee" v-if="user.role != 'Reception'">
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
    import * as socketio from '../plugins/socketio'

    export default {
        name: 'NavComp',
        data() {
            return {
                user: {}
            }
        },
        mounted() {
            socketio.sendEvent({
                type: 'user',
                data: {
                    id: window.localStorage.getItem('id')
                }
            });
            socketio.addEventListener({
                type: 'user',
                callback: (data) => {
                    this.user = data
                    window.localStorage.setItem('role', this.user.role)
                }
            });
        },
        methods: {
            logout() {
                window.localStorage.removeItem('jwt')
                window.localStorage.removeItem('id')
                window.localStorage.removeItem('role')
                this.$router.push('/login')
            }
        }
    }
</script>
<style scoped>
</style>
