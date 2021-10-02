<template>
    <v-container fluid>
        <v-row style="min-height:100vh">
            <v-col style="background-image: url('https://img1.fonwall.ru/o/vf/lighthouse-artist-artwork-digital-art-yjsy.jpeg');background-position: center;background-repeat: no-repeat;background-size: cover; ">                   
            </v-col>
            <v-col>
                <v-row style="min-height:100vh" align-content="center" justify="center">
                    <v-col cols="8">
                        <v-col cols="12">
                            <h2 class="mb-5">Register</h2>
                            <v-text-field
                                label="Name"
                                v-model="name"
                                type="name"
                                solo
                            ></v-text-field>
                            <v-text-field
                                style="margin-top:-12px !important"
                                label="Email"
                                v-model="email"
                                solo
                            ></v-text-field>
                            <v-text-field
                                style="margin-top:-12px !important"
                                label="Password"
                                v-model="password"
                                type="password"
                                solo
                            ></v-text-field>
                            <v-text-field
                                style="margin-top:-12px !important"
                                label="Retype Password"
                                v-model="retype_password"
                                type="password"
                                solo
                            ></v-text-field>
                            <v-btn
                            elevation="5"
                            color="primary"
                            @click="register"
                            block
                            :loading="loading"
                            :disabled="loading"
                            >Register</v-btn>
                        </v-col>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
const axios = require('axios').default;

export default {
    'name':'Register',
    data() {
        return {
            loading:false,
            email:null,
            password:null,
            retype_password:null,
            name:null
        }
    },
    methods:{
        register: function(){
            this.loading = true;
            axios.post(`${this.$store.state.backendURL}/api/auth/register`,{
                name:this.name,
                email:this.email,
                password:this.password
            }).then(() => {
                this.$store.commit('snackbar',{open:true,text:`Almost done ! check your email`,color:'green lighten-1'})
                this.loading = false;
                this.$router.push({ path: '/verify_user?email='+this.email})
            }).catch((error) => {
                if (error.response){
                    this.$store.commit('snackbar',{open:true,text:error.response.data.message})
                    this.loading = false;
                }else{
                    this.$store.commit('snackbar',{open:true,text:"Error"})
                    this.loading = false;
                }
            })
        }
    }
}
</script>