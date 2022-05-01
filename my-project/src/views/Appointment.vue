<template>
    <div>
        <NavComp />
        <section>
            <div v-if="appointments.length > 0">
                <h1 class="mt-32 mb-4 font-montserrat font-bold text-4xl">Appointments</h1>
                <div class="sm:grid sm:grid-cols-3 gap-5 w-4/5 sm:w-3/5 my-5 mx-auto">
                    <div  class="mb-5 cursor-pointer" v-for="(item, i) in appointments" :key="i">
                        <div class="p-5 shadow-lg">
                            <!--<router-link :to='`/bookmark/${item.label}`'>
                                <h1 class="text-2xl font-bold font-montserrat mb-5">
                                    {{ item.label }}
                                </h1>
                            </router-link>-->
                            <div class="text-md font-raleway tracking-wide">
                                <p>
                                    {{ item.attributes.date }}
                                </p>
                                <p>
                                    {{ item.attributes.start }}
                                </p>
                                <p>
                                    {{ item.attributes.end }}
                                </p>
                            </div>
                        </div>
                            
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    // import { mapGetters } from 'vuex';
    import NavComp from '@/components/Nav.vue'
    export default {
        name: 'AppointmentPage',
        components: {
            NavComp
        },
        data() {
            return {
                appointments: []
            }
        },
            
        methods: {
            // async removeItemFromBookmarks(item) {
            //     const itemIndex = this.bookmarks.findIndex(bookmarkItem => bookmarkItem.label === item.label)
                    
            //     this.bookmarks.splice(itemIndex, 1)
            //     window.localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks))
            //     await this.axios.delete(`http://localhost:1337/bookmarks/${item.id}`, {
            //         headers: {
            //             Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
            //         },
            //     })
            // }
        },
        async created() {
            const res = await this.axios.get(`http://localhost:1337/api/appointments?populate=*`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                },
            })
            console.log(res.data.data.length);
            this.appointments = res.data.data
        }
    }
</script>
<style scoped>
</style>