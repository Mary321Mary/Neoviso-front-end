<template>
    <div>
        <div class="flex items-center justify-center h-screen">
            <div class="sm:w-1/2">
                <div class="p-5 w-4/5 mx-auto text-left font-raleway">
                    <div class="flex bg-white space-x-12 hidden sm:block text-black-200 font-raleway tracking-wide items-center"> 
                        <router-link to="/"> HOME </router-link> 
                        <router-link to="/register">SIGN UP</router-link>
                    </div>
                    
                    <h1 class="font-bold text-left font-montserrat text-4xl sm:text-6xl mb-10">
                        Login To Hospital
                    </h1>
                    <p v-show="error" class="text-sm text-red-500">{{ errorMsg }}</p>
                    <form @submit="login">
                        <div class="my-5">
                            <h1 class="text-left font-bold mb-5 font-montserrat">Email</h1>
                            <input type="email" v-model="email" class="text-sm outline-none pb-5 w-4/5 bg-transparent border-b hover:border-blue-700 focus:border-blue-700">
                        </div>
                        <div class="my-5">
                            <h1 class="text-left font-bold mb-5 font-montserrat">Password</h1>
                            <input type="password" v-model="password" class="text-sm outline-none pb-5 w-4/5 bg-transparent border-b hover:border-blue-700 focus:border-blue-700">
                        </div>                        
                        <button type="submit" :disabled="password.length < 3" class="bg-green-400 p-5 text-white">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import store from '../store/index'
                        // <router-link to="/register" v-if="!getUser">SIGN UP</router-link>
    
    export default {
        name: 'LoginPage',
        data() {
            return {
                email: '',
                password: '',
                error: false,
                errorMsg: `An error occurred, please try again`
            }
        },
        methods: {
            ...mapActions(['fetchUser']),
            async login(e) {
                e.preventDefault()
                try {
                    const res = await window.axios.post(`auth/local`, {
                        identifier: this.email,
                        password: this.password
                    });
                    const jwt = res.data.jwt
                    window.localStorage.setItem('jwt', jwt)
                    store.dispatch('fetchUser')
                    this.$router.push('/')
                } catch(error) {
                    this.error = true
                    this.password = ''
                }
            }
        }
    }
</script>
<style scoped>
</style>
