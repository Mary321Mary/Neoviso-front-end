<template>
    <div>
        <div class="flex items-center justify-center h-screen">
            <div class="sm:w-1/2">
                <div class="p-5 w-4/5 mx-auto text-left font-raleway">
                    <div class="text-left mb-7">
                        <router-link to="/"> HOME </router-link> 
                    </div>
                    
                    <h1 class="font-bold text-left font-montserrat text-4xl sm:text-6xl mb-7">
                        Sign Up To Hospital
                    </h1>
                    <p v-show="error" class="text-sm text-red-500">{{ errorMsg }}</p>
                    <form @submit="register">
                        <div class="my-4">
                            <h1 class="text-left font-bold mb-2 font-montserrat">Name</h1>
                            <input type="text" v-model="name" class="text-sm outline-none pb-2 w-4/5 bg-transparent border-b
                                hover:border-blue-700 focus:border-blue-700">
                        </div>
                        <div class="my-4">
                            <h1 class="text-left font-bold mb-2 font-montserrat">Email</h1>
                            <input type="email" v-model="email" class="text-sm outline-none pb-2 w-4/5 bg-transparent border-b
                                hover:border-blue-700 focus:border-blue-700">
                        </div>
                        <div class="my-4">
                            <h1 class="text-left font-bold mb-2 font-montserrat">Password</h1>
                            <input type="password" v-model="password" class="text-sm outline-none pb-2 w-4/5 bg-transparent border-b
                                hover:border-blue-700 focus:border-blue-700">
                        </div>
                        <div class="my-4">
                            <h1 class="text-left font-bold mb-2 font-montserrat">Username</h1>
                            <input type="text" v-model="username" class="text-sm outline-none pb-2 w-4/5 bg-transparent border-b
                                hover:border-blue-700 focus:border-blue-700">
                        </div>
                        <div class="my-4">
                            <h1 class="text-left font-bold mb-2 font-montserrat">Address</h1>
                            <input type="text" v-model="address" class="text-sm outline-none pb-2 w-4/5 bg-transparent border-b
                                hover:border-blue-700 focus:border-blue-700">
                        </div>
                        <div class="my-4">
                            <h1 class="text-left font-bold mb-2 font-montserrat">Phone (+375(25|29|33|44)222-33-44)</h1>
                            <input type="tel" v-model="phone" class="text-sm outline-none pb-2 w-4/5 bg-transparent border-b
                                hover:border-blue-700 focus:border-blue-700">
                        </div>
                        <div class="my-4">
                            <h1 class="text-left font-bold mb-2 font-montserrat">Department</h1>
                            <select v-model="department" name="department">
                                <option v-for="(item, i) in departments" :key="i" id="department" name="department">
                                    {{ item.attributes.Name }}
                                </option>
                            </select>
                        </div>
                        
                        <button type="submit" :disabled="name.length < 6 || password.length < 6 || username.length < 3"
                            class="bg-green-400 p-5 text-white"> Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'RegisterPage',
        data() {
            return {
                name: '',
                email: '',
                password: '',
                username: '',
                address: '',
                phone: '',
                error: false,
                errorMsg: `An Error occurred, please try again`,
                department: '',
                departments: []
            }
        },
        async mounted() {
            var res = await window.axios.get(`departments`)
            this.departments = res.data.data
        },
        methods: {
            async register(e) {
                try {
                    e.preventDefault()
                    console.log('in')
                    await window.axios.post(`auth/local/register`, {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        Name: this.name,
                        Address: this.address,
                        Phone: this.phone,
                        Department: this.departments.find(department => 
                            department.attributes.Name === this.department),
                        role: 'Doctor'
                    })
                    this.$router.push('login')
                } catch(e) {
                    this.error = true
                    this.email = ''
                } 
            }
        }
    }
</script>
<style scoped>
</style>
