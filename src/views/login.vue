<template>
    <v-container fluid>
        <v-row style="min-height:100vh">
            <v-col style="background-image: url('https://img1.fonwall.ru/o/vf/lighthouse-artist-artwork-digital-art-yjsy.jpeg');background-position: center;background-repeat: no-repeat;background-size: cover; ">                   
            </v-col>
            <v-col>
                <v-row style="min-height:100vh" align-content="center" justify="center">
                    <v-col cols="8">
                        <v-col cols="12">
                            <h2 class="mb-5">Login</h2>
                            <v-text-field
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
                            <v-btn
                            elevation="5"
                            color="primary"
                            @click="login"
                            block
                            :loading="loading"
                            :disabled="loading"
                            >Login</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-divider></v-divider>
                            <v-btn
                            class="mt-3"
                            >Register</v-btn>
                            <a class="ma-5" href="https://google.com">Forgot Password ?</a>
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
    'name':'Login',
    data() {
        return {
            loading:false,
            email:null,
            password:null
        }
    },
    methods:{
        login: function(){
            this.loading = true;
            axios.post(`${this.$store.state.backendURL}/api/auth/signin`,{
                email:this.email,
                password:this.password
            }).then((response) => {
                this.$store.commit('snackbar',{open:true,text:`Welcome back ${response.data.user.name}`,color:'green lighten-1'})
                this.$router.push({path:'/home'})
                this.loading = false;
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