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
                                type="email" v-model="employee.email" id="email" name="email" required > <br> <br>

                            <label for="phone">Phone (+375(25|29|33|44)222-33-44) </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="tel" v-model="employee.phone" id="phone" name="phone"
                                pattern="^\+375\((?:25|29|33|44)\)\d{3}-\d{2}-\d{2}$" required > <br> <br>
                            
                            <label for="address">Address </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="text" v-model="employee.address" id="address" name="address" required > <br> <br>

                            <label for="department">Department </label>
                            <select v-model="employee.department" name="department">
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

    export default {
        name: 'EmployeeItem',
        components: {
            NavComp,
            FooterComp
        },
        data() {
            return {
                employee: {
                    id: '',
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    department: ''
                },
                departments: []
            };
        },
        async mounted() {
            var res = await window.axios.get(`departments`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                },
            })
            this.departments = res.data.data

            var empId = window.localStorage.getItem('empId')
            if (empId != -1) {
                res = await window.axios.get(`employees/${empId}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                    }
                })
                this.employee = res.data.data
            }
        },
        methods: {
            async submitEmployee() {
                var empId = window.localStorage.getItem('empId')
                const requestOptions = {
                    data: {
                        Name: this.employee.name,
                        Email: this.employee.email,
                        Phone: this.employee.phone,
                        Address: this.employee.address,
                        Department: this.departments.find(department => 
                            department.attributes.Name === this.employee.department)
                    }
                }
                if (confirm("Are you sure?")) {
                    if(empId != -1) {
                        await window.axios({
                            method: 'PUT',
                            url: `employees/${this.employee.id}`,
                            data: JSON.stringify(requestOptions),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                            }
                        })
                    } else {
                        await window.axios({
                            method: 'POST',
                            url: 'employees',
                            data: JSON.stringify(requestOptions),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                            }
                        })
                    }
                }
                this.$router.push("/employee");
            }
        }
    }
</script>
<style scoped>
</style>