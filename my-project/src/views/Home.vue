<template>
    <div class="overflow-x-hidden">
        <NavComp class="z-20" />
        <section>
            <h1 class="mt-32 mb-4 ml-4 font-montserrat font-bold text-4xl">Appointments</h1>
            <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                @click="edit(-1)" v-if="(getRole != 'Doctor') && getUser">Add appointment</button>
            <div v-if="appointments.length > 0">
                <div class="sm:grid sm:grid-cols-3 gap-5 w-4/5 sm:w-3/5 my-5 mx-auto">
                    <div class="mb-5 cursor-pointer" v-for="(item, i) in appointments" :key="i">
                        <div class="p-5 shadow-lg">
                            <div class="text-md font-raleway tracking-wide">
                                <p>
                                    Date: {{ item.date }}
                                </p>
                                <p>
                                    Start: {{ getTime(item.start) }}
                                </p>
                                <p>
                                    End: {{ getTime(item.end) }}
                                </p>
                                <p>
                                    Employee: {{ item.Employee.Name }}
                                </p>
                                <p>
                                    Customer: {{ item.Customer.Name }}
                                </p>
                                <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                                    @click="edit(item.id)" v-if="(getRole != 'Doctor') && getUser">Edit</button>
                                <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                                    @click="remove(item.id)" v-if="(getRole != 'Doctor') && getUser">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
                <PaginationComp class="p-5 shadow-lg" v-if="appointments" :total-pages="totalPages"
                    :per-page="recordsPerPage" :current-page="page" @pagechanged="onPageChange" />
            </div>
        </section>
        <FooterComp />
    </div>
</template>
<script>
    import NavComp from '@/components/Nav.vue'
    import FooterComp from '@/components/Footer.vue'
    import PaginationComp from '@/components/Pagination'
    import * as socketio from '../plugins/socketio'
    import store from '../store/index'
    
    export default {
        name: 'HomePage',
        components: {
            NavComp,
            FooterComp,
            PaginationComp
        },
        data() {
            return {
                appointments: [],
                page: 1,
                totalPages: 0,
                totalRecords: 0,
                recordsPerPage: 3
            }
        },
        mounted() {
            socketio.sendEvent({
                type: 'appointments',
                data: {
                    page: this.page,
                    recordsPerPage: this.recordsPerPage
                }
            });
            socketio.addEventListener({
                type: 'appointments',
                callback: (data) => {
                    this.appointments = data.results
                    this.totalPages = data.pagination.pageCount
                    this.totalRecords = data.pagination.total
                }
            });
        },
        methods: {
            // async loadListItem() {
            //     const res = await window.axios.get(`appointments?populate=*&` + 
            //         `pagination[page]=${this.page}&pagination[pageSize]=${this.recordsPerPage}`, {
            //         headers: {
            //             Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
            //         },
            //     })
            //     this.appointments = res.data.data
            //     this.totalPages = res.data.meta.pagination.pageCount
            //     this.totalRecords = res.data.meta.pagination.total
            // },
            onPageChange(page) {
                this.page = page
                socketio.sendEvent({
                    type: 'appointments',
                    data: {
                        page: this.page,
                        recordsPerPage: this.recordsPerPage
                    }
                });
            },
            getTime(time) {
                let newTime = time.slice(0, 5)
                return newTime
            },
            remove(appointId) {
                if(confirm("Do you really want to delete?")) {
                    window.axios.delete(`appointments/${appointId}`, {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem('jwt')}`
                        }
                    }).then(() => {
                        socketio.sendEvent({
                            type: 'appointments',
                            data: {
                                page: this.page,
                                recordsPerPage: this.recordsPerPage
                            }
                        });
                    })
                }
            },
            edit(appointId) {
                window.localStorage.setItem('appointId', appointId)
                this.$router.push('/appointment-item')
            }
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