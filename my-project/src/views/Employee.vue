<template>
    <div>
        <NavComp />
        <section>
            <div v-if="employees.length > 0">
                <h1 class="mt-32 mb-4 font-montserrat font-bold text-4xl">Employee</h1>
                <div class="sm:grid sm:grid-cols-3 gap-5 w-4/5 sm:w-3/5 my-5 mx-auto">
                    <div  class="mb-5 cursor-pointer" v-for="(item, i) in employees" :key="i">
                        <div class="p-5 shadow-lg">
                            <div class="text-md font-raleway tracking-wide">
                                <p>
                                    Name: {{ item.attributes.Name }}
                                </p>
                                <p>
                                    Email: {{ item.attributes.Email }}
                                </p>
                                <p>
                                    Phone: {{ item.attributes.Phone }}
                                </p>
                                <p>
                                    Address: {{ item.attributes.Address }}
                                </p>
                                <p>
                                    Department: {{ item.attributes.Department.data.attributes.Name }}
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
        async created() {
            const res = await this.axios.get(`http://localhost:1337/api/employees?populate[0]=Department`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                },
            })
            console.log(res.data.data.length);
            this.employees = res.data.data
        }
    }
</script>
<style scoped>
</style>
