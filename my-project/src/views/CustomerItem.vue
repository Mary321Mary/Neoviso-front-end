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
                                type="email" v-model="customer.Email" id="email" name="email" required > <br> <br>

                            <label for="phone">Phone </label>
                            <input class="bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight"
                                type="text" v-model="customer.Phone" id="phone" name="phone" required > <br> <br>
                            
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

    var temp = Object.freeze({
        id: '',
        name: '',
        Email: '',
        Phone: '',
        address: ''
    });

    export default {
        name: 'CustomerItem',
        components: {
            NavComp,
            FooterComp
        },
        data() {
            return {
                customer: Object.assign({}, temp)
            };
        },
        methods: {
            async submitCustomer() {
                var cusId = window.localStorage.getItem('cusId')
                const requestOptions = {
                    data: {
                        Name: this.customer.name,
                        Email: this.customer.Email,
                        Phone: this.customer.Phone,
                        Address: this.customer.address
                    }
                }
                if (cusId != -1) {
                    await this.axios({
                        method: 'PUT',
                        url: `http://localhost:1337/api/customers/${this.customer.id}`,
                        data: JSON.stringify(requestOptions),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                        }
                    })
                } else {
                    await this.axios({
                        method: 'POST',
                        url: 'http://localhost:1337/api/customers',
                        data: JSON.stringify(requestOptions),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                        }
                    })
                }
                this.$router.push("/customer");
            }
        },
        async created() {
            var cusId = window.localStorage.getItem('cusId')
            if (cusId != -1) {
                const res = await this.axios.get(`http://localhost:1337/api/customers/${cusId}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                    }
                })
                this.customer = res.data.data
            }
        }
    };
</script>
<style scoped>
</style>
