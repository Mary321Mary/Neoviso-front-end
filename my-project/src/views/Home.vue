<template>
    <div class="overflow-x-hidden">
        <NavComp class="z-20" />
        <section>
            <h1 class="mt-32 mb-4 ml-4 font-montserrat font-bold text-4xl">Appointments</h1>
            <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                @click="edit(-1)">Add appointment</button>
            <div v-if="appointments.length > 0">
                <div class="sm:grid sm:grid-cols-3 gap-5 w-4/5 sm:w-3/5 my-5 mx-auto">
                    <div class="mb-5 cursor-pointer" v-for="(item, i) in appointments" :key="i">
                        <div class="p-5 shadow-lg">
                            <!--<router-link :to='`/bookmark/${item.label}`'>
                                <h1 class="text-2xl font-bold font-montserrat mb-5">
                                    {{ item.label }}
                                </h1>
                            </router-link>-->
                            <div class="text-md font-raleway tracking-wide">
                                <p>
                                    Date: {{ item.attributes.date }}
                                </p>
                                <p>
                                    Start: {{ getTime(item.attributes.start) }}
                                </p>
                                <p>
                                    End: {{ getTime(item.attributes.end) }}
                                </p>
                                <p>
                                    Employee: {{ item.attributes.Employee.data.attributes.Name }}
                                </p>
                                <p>
                                    Customer: {{ item.attributes.Customer.data.attributes.Name }}
                                </p>
                                <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                                    @click="edit(item.id)">Edit</button>
                                <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                                    @click="remove(item.id)">Remove</button>
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
// @ is an alias to /src
    import NavComp from '@/components/Nav.vue'
    import FooterComp from '@/components/Footer.vue'
    import PaginationComp from '@/components/Pagination'
    
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
        methods: {
            async loadListItem() {
                const res = await this.axios.get(`http://localhost:1337/api/appointments?populate=*&` + 
                    `pagination[page]=${this.page}&pagination[pageSize]=${this.recordsPerPage}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                    },
                })
                this.appointments = res.data.data
                this.totalPages = res.data.meta.pagination.pageCount
                this.totalRecords = res.data.meta.pagination.total
            },
            onPageChange(page) {
                this.page = page
                this.loadListItem()
            },
            getTime(time) {
                let newTime = time.slice(0, 5)
                return newTime
            },
            remove(appointId) {
                this.axios.delete(`http://localhost:1337/api/appointments/${appointId}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                    },
                })
                this.loadListItem()
            },
            edit(appointId) {
                window.localStorage.setItem('appointId', appointId)
                this.$router.push('/appointment-item')
            }
        },
        created() {
            this.loadListItem()
        }
    }
</script>
