<template>
   <v-app>
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
                                    solo
                                ></v-text-field>
                                <v-text-field
                                    style="margin-top:-12px !important"
                                    label="Password"
                                    solo
                                ></v-text-field>
                                <v-btn
                                elevation="5"
                                color="primary"
                                block
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
   </v-app>
</template>

<script>
export default {
    'name':'Login'
}
</script>