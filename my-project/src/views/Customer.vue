<template>
    <div>
        <NavComp />
        <section>
            <h1 class="mt-32 mb-4 ml-4 font-montserrat font-bold text-4xl">Customer</h1>
            <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                @click="edit(-1)" v-if="role != 'Doctor'">Add customer</button>
            <div v-if="customers.length > 0">
                <div class="sm:grid sm:grid-cols-3 gap-5 w-4/5 sm:w-3/5 my-5 mx-auto">
                    <div  class="mb-5 cursor-pointer" v-for="(item, i) in customers" :key="i">
                        <div class="p-5 shadow-lg">
                            <div class="text-md font-raleway tracking-wide">
                                <p>
                                    Name: {{ item.Name }}
                                </p>
                                <p>
                                    Email: {{ item.Email }}
                                </p>
                                <p>
                                    Phone: {{ item.Phone }}
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
                <PaginationComp class="p-5 shadow-lg" v-if="customers" :total-pages="totalPages"
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

    export default {
        name: 'CustomerPage',
        components: {
            NavComp,
            FooterComp,
            PaginationComp
        },
        data() {
            return {
                customers: [],
                page: 1,
                totalPages: 0,
                totalRecords: 0,
                recordsPerPage: 3,
                role: window.localStorage.getItem('role')
            }
        },
        mounted() {
            if(this.role == 'Reception') {
                socketio.sendEvent({
                    type: 'customer',
                    data: {
                        id: window.localStorage.getItem('id')
                    }
                });
                socketio.addEventListener({
                    type: 'customer',
                    callback: (data) => {
                        this.customers = data
                    }
                });
            } else {
                socketio.sendEvent({
                    type: 'customers',
                    data: {
                        page: this.page,
                        recordsPerPage: this.recordsPerPage
                    }
                });
                socketio.addEventListener({
                    type: 'customers',
                    callback: (data) => {
                        this.customers = data.results
                        this.totalPages = data.pagination.pageCount
                        this.totalRecords = data.pagination.total
                    }
                });
            }
        },
        methods: {
            // async loadListItem() {
            //     const res = await window.axios.get(`customers?` + 
            //         `pagination[page]=${this.page}&pagination[pageSize]=${this.recordsPerPage}`, {
            //         headers: {
            //             Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
            //         },
            //     })
            //     this.customers = res.data.data
            //     this.totalPages = res.data.meta.pagination.pageCount
            //     this.totalRecords = res.data.meta.pagination.total
            // },
            onPageChange(page) {
                this.page = page
                if(this.role == 'Reception') {
                    socketio.sendEvent({
                        type: 'customer',
                        data: {
                            id: window.localStorage.getItem('id')
                        }
                    });
                } else {
                    socketio.sendEvent({
                        type: 'customers',
                        data: {
                            page: this.page,
                            recordsPerPage: this.recordsPerPage
                        }
                    });
                }
            },
            remove(cusId) {
                if(confirm("Do you really want to delete?")) {
                    window.axios.delete(`customers/${cusId}`, {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem('jwt')}`
                        }
                    }).then(() => {
                        if(this.role == 'Reception') {
                            socketio.sendEvent({
                                type: 'customer',
                                data: {
                                    id: window.localStorage.getItem('id')
                                }
                            });
                        } else {
                            socketio.sendEvent({
                                type: 'customers',
                                data: {
                                    page: this.page,
                                    recordsPerPage: this.recordsPerPage
                                }
                            });
                        }
                    })
                }
            },
            edit(cusId) {
                window.localStorage.setItem('cusId', cusId)
                this.$router.push('/customer-item')
            }
        }
    }
</script>
<style scoped>
</style>
