<template>
<div>
<v-card class="mb-5">
    <v-card-text>
        <v-row>
            <v-col @click="postdialog=!postdialog" cols="10" style="cursor: pointer">
                    <v-text-field
                    label="Create Post"
                    v-model="name"
                    background-color="grey lighten-4"
                    prepend-icon="mdi-pencil"
                    dense
                    filled
                    disabled
                    rounded
                    hide-details
                    type="text"
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-avatar
                    color="primary"
                    size="50"
                    style="color:white;"
                >
                    A
                </v-avatar>
            </v-col>
        </v-row>
    </v-card-text>
</v-card>
<v-row>
    <v-col>
        <v-skeleton-loader
        type="article, actions"
        ></v-skeleton-loader>
    </v-col>
</v-row>
<v-row>
    <v-col>
        <v-skeleton-loader
        type="article, actions"
        ></v-skeleton-loader>
    </v-col>
</v-row>
<PostDialog :open="postdialog" />
</div>
</template>

<script>
const axios = require('axios').default;
import PostDialog from '../components/postDialog.vue'


export default {
    name:'Home',
    components:{
        PostDialog
    },
    methods:{
        post:function(){
            this.loading = true;
            axios.post(`${this.$store.state.backendURL}/api/posts/add`,{
                
            })
        },
        TogglePostDialog:function (){
            this.postdialog = !this.postdialog
        }
    },
    data: () => ({
      selectedItem: 0,
      postdialog:false,
      name:null,
      loading:false,
      items: [
        { text: 'My Files', icon: 'mdi-folder' },
        { text: 'Shared with me', icon: 'mdi-account-multiple' },
        { text: 'Starred', icon: 'mdi-star' },
        { text: 'Recent', icon: 'mdi-history' },
        { text: 'Offline', icon: 'mdi-check-circle' },
        { text: 'Uploads', icon: 'mdi-upload' },
        { text: 'Backups', icon: 'mdi-cloud-upload' },
      ],
    }),
}
</script>