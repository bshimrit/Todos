<template>
  <section class="container">
        <label>
            User name
            <form @submit.prevent="saveUser">
                <input class="input is-primary" type="text" v-model="userToEdit.userName" >
                <img class="margin-top20" :src="userToEdit.img" />
                <div class="add-img">
                    <input class="input is-primary" type="url" placeholder="change image from url..." ref="imgFiles" />
                    <button class="fa button is-primary pointer" type="button" @click.stop="updateImg"></button>
                </div>
                <div class="user-btns">
                    <button class="button is-primary" type="submit">Save</button>
                    <button class="button is-primary" type="button" @click.stop="$router.go(-1)">Cancel</button>
                </div>
                <div class="action-log">
                    <h1 class="font-bold">User actions log</h1>
                    <ul>
                        <li v-for="action in userToEdit.actions" :key="action.at">
                            <action-preview :action="action"></action-preview>
                        </li>
                    </ul>
                </div>  
            </form>
            
        </label>
    </section>
</template>

<script>

import ActionPreview from '../components/ActionPreview.vue' 

export default {
    name:'userEdit',
    created() {
        this.$store.dispatch({type: 'loadUser'})
        .then(() => {
            this.userToEdit = JSON.parse(JSON.stringify(this.$store.state.user));
        });
    },
    data() {
        return {
            userToEdit: {userName:'', img: '',actions:[]}
        }
    },
    methods:{
        saveUser(){
            this.$store.dispatch({type: 'saveUser', user: this.userToEdit})
            this.$router.go(-1);
        },
        updateImg(){
            this.userToEdit.img = this.$refs.imgFiles.value;
        }
    },
    components:{
        ActionPreview
    }
}
</script>

<style>
    .add-img input{
        width: 50%;
    }
</style>
