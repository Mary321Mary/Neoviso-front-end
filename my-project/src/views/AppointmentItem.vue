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
                            <select v-model="appointment.employee" name="employee">
                                <option v-for="(item, i) in employees" :key="i" id="employee" name="employee">
                                    {{ item.Name }}
                                </option>
                            </select> <br> <br>

                            <label for="customer">Customer </label>
                            <select v-model="appointment.customer" name="customer">
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

    export default {
        name: 'AppointmentItem',
        components: {
            NavComp,
            FooterComp
        },
        data() {
            return {
                appointment: {
                    id: '',
                    date: '',
                    start: '',
                    end: '',
                    employee: '',
                    customer: ''
                },
                employees: [],
                customers: []
            };
        },
        async mounted() {
            let res = await window.axios.get(`customers`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                },
            })
            this.customers = res.data.data

            res = await window.axios.get(`users?populate[0]=Department`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                },
            })
            this.employees = res.data

            let appointId = window.localStorage.getItem('appointId')
            if (appointId != -1) {
                res = await window.axios.get(`appointments/${appointId}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                    }
                })
                this.appointment = res.data.data
            }
        },
        methods: {
            async submitAppointment() {
                let appointId = window.localStorage.getItem('appointId')
                const requestOptions = {
                    data: {
                        date: this.appointment.date,
                        start: this.appointment.start + ":00.000",
                        end: this.appointment.end + ":00.000",
                        Employee: this.employees.find(employee => 
                            employee.attributes.Name === this.appointment.employee),
                        Customer: this.customers.find(customer => 
                            customer.attributes.Name === this.appointment.customer)
                    }
                }
                if (confirm("Are you sure?")) {
                    if(appointId != -1) {
                        await window.axios({
                            method: 'PUT',
                            url: `appointments/${this.appointment.id}`,
                            data: JSON.stringify(requestOptions),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                            }
                        })
                    } else {
                        await window.axios({
                            method: 'POST',
                            url: 'appointments',
                            data: JSON.stringify(requestOptions),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                            }
                        })
                    }
                }
                this.$router.push("/");
            }
        }
    }
</script>
<style scoped>
</style>
