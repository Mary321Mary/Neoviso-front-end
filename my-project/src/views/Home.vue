<template>
    <div class="overflow-x-hidden">
        <NavComp class="z-20" />
        
    </div>
</template>
<script>
// @ is an alias to /src
    import NavComp from '@/components/Nav.vue'
    export default {
        name: 'HomePage',
        components: {
            NavComp,
        }
    }
</script>