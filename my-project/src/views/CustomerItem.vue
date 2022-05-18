<template>
    <div class="overflow-x-hidden">
        <NavComp class="z-20" />
        <section>
            <div class=" mb-3">
                <div class="mt-32 mb-4 ml-4 font-montserrat font-bold text-4xl">
                    {{ customer.id != -1 ? 'Edit' : 'Add' }} Customer</div>
                <div class="ml-10">
                    <form class="w-full max-w-sm" @submit.prevent="submitCustomer">
                        <fieldset>
                            <legend class="font-montserrat font-bold text-2xl"> Form for customer: </legend> <br>

                            <label for="name">Name </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="text" v-model="customer.name" id="name" name="name" required > <br> <br>

                            <label for="email">Email </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="email" v-model="customer.email" id="email" name="email" required > <br> <br>

                            <label for="phone">Phone (+375(25|29|33|44)222-33-44) </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="tel" v-model="customer.phone" id="phone" name="phone"
                                pattern="^\+375\((?:25|29|33|44)\)\d{3}-\d{2}-\d{2}$" required > <br> <br>
                            
                            <label for="address">Address </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="text" v-model="customer.address" id="address" name="address" required > <br> <br>
                            
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
        name: 'CustomerItem',
        components: {
            NavComp,
            FooterComp
        },
        data() {
            return {
                customer: {
                    id: '',
                    name: '',
                    email: '',
                    phone: '',
                    address: ''
                }
            };
        },
        async mounted() {
            let cusId = window.localStorage.getItem('cusId')
            if (cusId != -1) {
                const res = await window.axios.get(`customers/${cusId}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                    }
                })
                this.customer = res.data.data
            }
        },
        methods: {
            async submitCustomer() {
                let cusId = window.localStorage.getItem('cusId')
                const requestOptions = {
                    data: {
                        Name: this.customer.name,
                        Email: this.customer.email,
                        Phone: this.customer.phone,
                        Address: this.customer.address
                    }
                }
                if (confirm("Are you sure?")) {
                    if(cusId != -1) {
                        await window.axios({
                            method: 'PUT',
                            url: `customers/${this.customer.id}`,
                            data: JSON.stringify(requestOptions),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                            }
                        })
                    } else {
                        await window.axios({
                            method: 'POST',
                            url: 'customers',
                            data: JSON.stringify(requestOptions),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                            }
                        })
                    }
                }
                this.$router.push("/customer");
            }
        }
    }
</script>
<style scoped>
</style>