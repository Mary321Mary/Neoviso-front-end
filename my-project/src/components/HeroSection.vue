<template>
    <div>
        <section>
            <div class=" h-screen bg-cover">
                <div class="bg-blue-800 bg-opacity-50">
                    <div class="mx-auto h-screen flex text-white justify-left sm:w-4/5 items-center">
                        <div class="text-left font-montserrat mx-5 z-10">
                            <h1 class="text-6xl font-black my-10 z-10">
                                FIND THE
                                <br>
                                WORLD'S BEST
                                <br> 
                                RECIPES ONLINE 
                            </h1>
                            <router-link to='/explore' class="py-5 px-10 text-xl bg-green-600 z-10">
                                Search Recipes
                            </router-link>                       
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    export default {
        name: 'HeroSection'
    }
</script>
<style scoped>
</style>