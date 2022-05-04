<template>
    <div>
        <NavComp />
        <section>
            <h1 class="mt-32 mb-4 ml-4 font-montserrat font-bold text-4xl">Department</h1>
            <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                @click="edit(-1)">Add department</button>
            <div v-if="departments.length > 0">
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
                                <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                                    @click="edit(item.id)">Edit</button>
                                <button class="flex-no-shrink p-2 mt-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                                    @click="remove(item.id)">Remove</button>
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
    import * as socketio from '../plugins/socketio';

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
        mounted() {
            socketio.addEventListener({
                type: 'departments',
                callback: () => {
                    console.log("mounted");
                    this.loadListItem()
                }
            });
        },
        methods: {
            async loadListItem() {
                const res = await this.axios.get(`http://localhost:1337/api/departments`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                    },
                })
                this.departments = res.data.data
            },
            remove(depId) {
                if(confirm("Do you really want to delete?")) {
                    this.axios.delete(`http://localhost:1337/api/departments/${depId}`, {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                        },
                    })
                    socketio.sendEvent({
                        type: 'departments'
                    });
                }
            },
            edit(depId) {
                window.localStorage.setItem('depId', depId)
                this.$router.push('/department-item')
            }
        },
        created() {
            console.log("created");
            this.loadListItem()
        }
    }
</script>
<style scoped>
</style>
