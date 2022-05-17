<template>
    <div class="overflow-x-hidden">
        <NavComp class="z-20" />
        <section>
            <div class=" mb-3">
                <div class="mt-32 mb-4 ml-4 font-montserrat font-bold text-4xl">
                    {{ department.id != -1 ? 'Edit' : 'Add' }} Department</div>
                <div class="ml-10">
                    <form class="w-full max-w-sm" @submit.prevent="submitDepartment">
                        <fieldset>
                            <legend class="font-montserrat font-bold text-2xl"> Form for department: </legend> <br>

                            <label for="name">Name </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="text" v-model="department.name" id="name" name="name" required > <br> <br>
                            
                            <label for="address">Address </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="text" v-model="department.address" id="address" name="address" required > <br> <br>
                            
                            <input type="submit" value="Submit" class="btn btn-block btn-light" />
                        </fieldset>
                    </form>
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
        name: 'DepartmentItem',
        components: {
            NavComp,
            FooterComp
        },
        data() {
            return {
                department: {
                    id: '',
                    name: '',
                    address: ''
                }
            };
        },
        async mounted() {
            let depId = window.localStorage.getItem('depId')
            if (depId != -1) {
                const res = await window.axios.get(`departments/${depId}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                    }
                })
                this.department = res.data.data
            }
        },
        methods: {
            async submitDepartment() {
                let depId = window.localStorage.getItem('depId')
                const requestOptions = {
                    data: {
                        Name: this.department.name,
                        Address: this.department.address
                    }
                }
                if (confirm("Are you sure?") && depId != -1) {
                    await window.axios({
                        method: 'PUT',
                        url: `departments/${this.department.id}`,
                        data: JSON.stringify(requestOptions),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                        }
                    })
                } else {
                    await window.axios({
                        method: 'POST',
                        url: 'departments',
                        data: JSON.stringify(requestOptions),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                        }
                    })
                }
                this.$router.push("/department");
            }
        }
    }
</script>
<style scoped>
</style>
