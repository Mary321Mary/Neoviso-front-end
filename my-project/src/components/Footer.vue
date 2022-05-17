<template>
    <footer class="pb-6 pl-4 pt-4 w-full bg-black fixed bottom-0 z-20 text-white">
        Copyright © {{date}}
    </footer>
</template>
<script>
    export default {
        name: 'FooterComp',
        data() {
            return {
                date: new Date().getFullYear()
            }
        }
    }
</script>
<style scoped>
</style>
