<template>
    <section>
        <p>{{curAction.at | setDateTimeFormat}} - {{curAction.name}}</p>
    </section>
</template>

<script>


export default {
    props:['action'],
    data(){
        return {
            curAction: this.action
        }
    }
}
</script>

<style>

</style>
