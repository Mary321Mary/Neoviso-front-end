<template>
    <div class="overflow-x-hidden">
        <NavComp class="z-20" />
        <section>
            <div class=" mb-3">
                <div class="mt-32 mb-4 ml-4 font-montserrat font-bold text-4xl">
                    {{ appointment.id != -1 ? 'Edit' : 'Add' }} Appointment</div>
                <div class="ml-10">
                    <form class="w-full max-w-sm" @submit.prevent="submitAppointment">
                        <fieldset>
                            <legend class="font-montserrat font-bold text-2xl"> Form for Appointment: </legend> <br>

                            <label for="date">Date </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="date" v-model="appointment.date" id="date" name="date" required > <br> <br>
                            
                            <label for="start">Start </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="time" v-model="appointment.start" id="start" name="start" required > <br> <br>
                            
                            <label for="end">End </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="time" v-model="appointment.end" id="end" name="end" required > <br> <br>
                            
                            <label for="employee">Employee </label>
                            <select v-model="appointment.Employee" name="employee">
                                <option v-for="(item, i) in employees" :key="i" id="employee" name="employee">
                                    {{ item.attributes.Name }}
                                </option>
                            </select> <br> <br>

                            <label for="customer">Customer </label>
                            <select v-model="appointment.Customer" name="customer">
                                <option v-for="(item, i) in customers" :key="i" id="customer" name="customer">
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
        date: '',
        start: '',
        end: '',
        Employee: '',
        Customer: ''
    });

    export default {
        name: 'AppointmentItem',
        components: {
            NavComp,
            FooterComp
        },
        data() {
            return {
                appointment: Object.assign({}, temp),
                employees: [],
                customers: []
            };
        },
        methods: {
            async submitAppointment() {
                var appointId = window.localStorage.getItem('appointId')
                const requestOptions = {
                    data: {
                        date: this.appointment.date,
                        start: this.appointment.start + ":00.000",
                        end: this.appointment.end + ":00.000",
                        Employee: this.employees.find(employee => 
                            employee.attributes.Name === this.appointment.Employee),
                        Customer: this.customers.find(customer => 
                            customer.attributes.Name === this.appointment.Customer)
                    }
                }
                console.log(requestOptions)
                if (confirm("Are you sure?") && appointId != -1) {
                    await this.axios({
                        method: 'PUT',
                        url: `http://localhost:1337/api/appointments/${this.appointment.id}`,
                        data: JSON.stringify(requestOptions),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                        }
                    })
                } else {
                    await this.axios({
                        method: 'POST',
                        url: 'http://localhost:1337/api/appointments',
                        data: JSON.stringify(requestOptions),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                        }
                    })
                }
                this.$router.push("/");
            }
        },
        async created() {
            var res = await this.axios.get(`http://localhost:1337/api/customers`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                },
            })
            this.customers = res.data.data

            res = await this.axios.get(`http://localhost:1337/api/employees?populate[0]=Department`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                },
            })
            this.employees = res.data.data

            var appointId = window.localStorage.getItem('appointId')
            if (appointId != -1) {
                res = await this.axios.get(`http://localhost:1337/api/appointments/${appointId}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                    }
                })
                this.appointment = res.data.data
            }
        }
    };
</script>
<style scoped>
</style>
