<template>
  <section class="user-preview">
        <router-link to="/user"><img class="small-img" :src="userImg" />{{userName}}</router-link>
    </section>
</template>

<script>
export default {
    created() {
        this.$store.dispatch({type: 'loadUser'});
    },
    computed:{
        userName(){
            return this.$store.state.user.userName;
        },
        userImg(){
            return this.$store.state.user.img;
        }
    }
}
</script>

<style>
    .user-preview {
        text-align: left;
    }

</style>
