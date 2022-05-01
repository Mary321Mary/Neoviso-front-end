<template>
    <div>
        <NavComp />
        <section>
            <div v-if="departments.length > 0">
                <h1 class="mt-32 mb-4 font-montserrat font-bold text-4xl">Department</h1>
                <div class="sm:grid sm:grid-cols-3 gap-5 w-4/5 sm:w-3/5 my-5 mx-auto">
                    <div  class="mb-5 cursor-pointer" v-for="(item, i) in departments" :key="i">
                        <div class="p-5 shadow-lg">
                            <div class="text-md font-raleway tracking-wide">
                                <p>
                                    Name: {{ item.attributes.Name }}
                                </p>
                                <p>
                                    Address: {{ item.attributes.Address }}
                                </p>
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
    export default {
        name: 'DepartmentPage',
        components: {
            NavComp,
            FooterComp
        },
        data() {
            return {
                departments: []
            }
        },
        async created() {
            const res = await this.axios.get(`http://localhost:1337/api/departments`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                },
            })
            console.log(res.data.data.length);
            this.departments = res.data.data
        }
    }
</script>
<style scoped>
</style>
