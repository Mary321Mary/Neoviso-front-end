<template>
    <div>
        <NavComp />
        <section>
            <h1 class="mt-32 mb-4 ml-4 font-montserrat font-bold text-4xl">Department</h1>
            <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                @click="edit(-1)" v-if="role != 'Doctor'">Add department</button>
            <div v-if="departments.length > 0">
                <div class="sm:grid sm:grid-cols-3 gap-5 w-4/5 sm:w-3/5 my-5 mx-auto">
                    <div  class="mb-5 cursor-pointer" v-for="(item, i) in departments" :key="i">
                        <div class="p-5 shadow-lg">
                            <div class="text-md font-raleway tracking-wide">
                                <p>
                                    Name: {{ item.Name }}
                                </p>
                                <p>
                                    Address: {{ item.Address }}
                                </p>
                                <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                                    @click="edit(item.id)" v-if="role != 'Doctor'">Edit</button>
                                <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                                    @click="remove(item.id)" v-if="role != 'Doctor'">Remove</button>
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
    // import io from "socket.io-client"
    // let socket = io.connect("http://localhost:1337")

    export default {
        name: 'DepartmentPage',
        components: {
            NavComp,
            FooterComp
        },
        data() {
            return {
                departments: [],
                role: window.localStorage.getItem('role')
            }
        },
        mounted() {
            // socket.emit("departments")
            // socket.on("departments", (fetchedData) => {
            //     this.departments = fetchedData.results
            // })
            socketio.sendEvent({
                type: 'departments'
            });
            socketio.addEventListener({
                type: 'departments',
                callback: (data) => {
                    this.departments = data.results
                }
            });
        },
        methods: {
            // async loadListItem() {
            //     const res = await window.axios.get(`departments`, {
            //         headers: {
            //             Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
            //         },
            //     })
            //     this.departments = res.data.data
            // },
            remove(depId) {
                if(confirm("Do you really want to delete?")) {
                    window.axios.delete(`departments/${depId}`, {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem('jwt')}`
                        }
                    }).then(() => {
                        socketio.sendEvent({
                            type: 'departments'
                        });
                    })
                }
            },
            edit(depId) {
                window.localStorage.setItem('depId', depId)
                this.$router.push('/department-item')
            }
        }
    }
</script>
<style scoped>
</style>
