<template>
    <v-container fluid class="pa-0">
        <div style="background-image: url('https://img1.fonwall.ru/o/vf/lighthouse-artist-artwork-digital-art-yjsy.jpeg');background-position: center;background-repeat: no-repeat;background-size: cover;width:100vw;height:100vh;opacity:0.1;position:absolute;">

        </div>
        <v-row style="min-height:100vh;opacity:1" align-content="center" justify="center">
            <v-col cols="4">
                <h2 class="mb-5">Verify Account</h2>
                <h6 class="mb-5">using email {{$route.query.email}}</h6>
                <v-row>
                    <v-col cols="8">
                        <v-text-field
                            label="Verification Code"
                            v-model="code"
                            solo
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn
                            color="primary"
                            @click="verify"
                            depressed
                            :loading="loading"
                            :disabled="loading"
                            >Verify</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
const axios = require('axios').default;

export default {
    'name':'VerifyUser',
    data() {
        return {
            loading:false,
            code:null
        }
    },
    methods:{
        verify:function(){
            axios.post(`${this.$store.state.backendURL}/api/auth/confirmuser`,{
                email:this.$route.query.email,
                code:this.code
            })
            .then(()=>{
                this.$store.commit('snackbar',{open:true,text:`Welcome to the neighborhood`,color:'green lighten-1'})
                this.loading = false;
            })
            .catch(()=>{
                this.$store.commit('snackbar',{open:true,text:"Error"})
                this.loading = false;
            })
        },
    }
}
</script>