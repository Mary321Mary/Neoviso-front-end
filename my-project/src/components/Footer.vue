<template>
    <footer>
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
    footer {
        background-position: center center;
        background-repeat: repeat;
        clear: both;
        position: relative;
        padding: 5px;
        width: 100%;
        bottom: 0;
    }
</style>
