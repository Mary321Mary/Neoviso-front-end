<template>
    <div class="overflow-x-hidden">
        <NavComp class="z-20" />
        <section>
            <div class=" mb-3">
                <div class="mt-32 mb-4 ml-4 font-montserrat font-bold text-4xl">
                    {{ employee.id != -1 ? 'Edit' : 'Add' }} Employee</div>
                <div class="ml-10">
                    <form class="w-full max-w-sm" @submit.prevent="submitEmployee">
                        <fieldset>
                            <legend class="font-montserrat font-bold text-2xl"> Form for employee: </legend> <br>

                            <label for="name">Name </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="text" v-model="employee.name" id="name" name="name" required > <br> <br>

                            <label for="email">Email </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="email" v-model="employee.Email" id="email" name="email" required > <br> <br>

                            <label for="phone">Phone </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="text" v-model="employee.Phone" id="phone" name="phone" required > <br> <br>
                            
                            <label for="address">Address </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="text" v-model="employee.address" id="address" name="address" required > <br> <br>

                            <label for="department">Department </label>
                            <select v-model="employee.Department" name="department">
                                <option v-for="(item, i) in departments" :key="i" id="department" name="department">
                                    {{ item.attributes.Name }}
                                </option>
                            </select> <br> <br>
                            
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
        Email: '',
        Phone: '',
        address: '',
        Department: ''
    });

    export default {
        name: 'EmployeeItem',
        components: {
            NavComp,
            FooterComp
        },
        data() {
            return {
                employee: Object.assign({}, temp),
                departments: []
            };
        },
        methods: {
            async submitEmployee() {
                var empId = window.localStorage.getItem('empId')
                const requestOptions = {
                    data: {
                        Name: this.employee.name,
                        Email: this.employee.Email,
                        Phone: this.employee.Phone,
                        Address: this.employee.address,
                        Department: this.departments.find(department => 
                            department.attributes.Name === this.employee.Department)
                    }
                }
                if (empId != -1) {
                    await this.axios({
                        method: 'PUT',
                        url: `http://localhost:1337/api/employees/${this.employee.id}`,
                        data: JSON.stringify(requestOptions),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                        }
                    })
                } else {
                    await this.axios({
                        method: 'POST',
                        url: 'http://localhost:1337/api/employees',
                        data: JSON.stringify(requestOptions),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                        }
                    })
                }
                this.$router.push("/employee");
            }
        },
        async created() {
            var res = await this.axios.get(`http://localhost:1337/api/departments`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                },
            })
            this.departments = res.data.data

            var empId = window.localStorage.getItem('empId')
            if (empId != -1) {
                res = await this.axios.get(`http://localhost:1337/api/employees/${empId}`, {
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
