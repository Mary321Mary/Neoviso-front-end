<template>
    <div>
        <NavComp />
        <section>
            <h1 class="mt-32 mb-4 ml-4 font-montserrat font-bold text-4xl">Employee</h1>
            <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                @click="edit(-1)" v-if="getRole != 'Doctor'">Add employee</button>
            <div v-if="employees.length > 0">
                <div class="sm:grid sm:grid-cols-3 gap-5 w-4/5 sm:w-3/5 my-5 mx-auto">
                    <div  class="mb-5 cursor-pointer" v-for="(item, i) in employees" :key="i">
                        <div class="p-5 shadow-lg">
                            <div class="text-md font-raleway tracking-wide">
                                <p>
                                    Name: {{ item.Name }}
                                </p>
                                <p>
                                    Email: {{ item.email }}
                                </p>
                                <p>
                                    Phone: {{ item.Phone }}
                                </p>
                                <p>
                                    Address: {{ item.Address }}
                                </p>
                                <p>
                                    Department: {{ item.Department.Name }}
                                </p>
                                <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                                    @click="edit(item.id)" v-if="getRole != 'Doctor'">Edit</button>
                                <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                                    @click="remove(item.id)" v-if="getRole != 'Doctor'">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <FooterComp />
    </div>
</template>
<script>
    import NavComp from '@/components/Nav.vue'
    import FooterComp from '@/components/Footer.vue'
    import * as socketio from '../plugins/socketio'
    import store from '../store/index'

    export default {
        name: 'EmployeePage',
        components: {
            NavComp,
            FooterComp
        },
        data() {
            return {
                employees: []
            }
        },
        mounted() {
            socketio.sendEvent({
                type: 'employees'
            });
            socketio.addEventListener({
                type: 'employees',
                callback: (data) => {
                    this.employees = data
                }
            });
        },
        methods: {
            remove(empId) {
                if(confirm("Do you really want to delete?")) {
                    window.axios.delete(`employees/${empId}`, {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem('jwt')}`
                        }
                    }).then(() => {
                        socketio.sendEvent({
                            type: 'employees'
                        });
                    })
                }
            },
            edit(empId) {
                window.localStorage.setItem('empId', empId)
                this.$router.push('/employee-item')
            }
        },
        computed: {
            getRole() {
                return store.getters.getRole
            }
        }
    }
</script>
<style scoped>
</style>
