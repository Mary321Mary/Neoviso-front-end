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

    var temp = Object.freeze({
        id: '',
        name: '',
        address: ''
    });

    export default {
        name: 'DepartmentItem',
        components: {
            NavComp,
            FooterComp
        },
        data() {
            return {
                department: Object.assign({}, temp)
            };
        },
        methods: {
            async submitDepartment() {
                var depId = window.localStorage.getItem('depId')
                const requestOptions = {
                    data: {
                        Name: this.department.name,
                        Address: this.department.address
                    }
                }
                if (depId != -1) {
                    await this.axios({
                        method: 'PUT',
                        url: `http://localhost:1337/api/departments/${this.department.id}`,
                        data: JSON.stringify(requestOptions),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                        }
                    })
                } else {
                    await this.axios({
                        method: 'POST',
                        url: 'http://localhost:1337/api/departments',
                        data: JSON.stringify(requestOptions),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                        }
                    })
                }
                this.$router.push("/department");
            }
        },
        async created() {
            var depId = window.localStorage.getItem('depId')
            console.log(depId)
            if (depId != -1) {
                const res = await this.axios.get(`http://localhost:1337/api/departments/${depId}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                    }
                })
                this.department = res.data.data
            }
        }
    };
</script>
<style scoped>
</style>
