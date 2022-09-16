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
<div v-if="loading">
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
</div>
<div v-else>
    <v-row v-for="(post,key) in posts" :key="key">
        <v-col>
            <Post :post="post" />
        </v-col>
    </v-row>
</div>

<PostDialog @closeDialog="postdialog=false" :open="postdialog" />
</div>
</template>

<script>
const axios = require('axios').default;
import PostDialog from '../components/postDialog.vue'
import Post from '../components/Post.vue'


export default {
    name:'Home',
    components:{
        PostDialog,
        Post
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
    mounted() {
        axios.post(`${this.$store.state.backendURL}/graphql`,{
            query : `
            {
                posts {
                    _id
                    article
                    hashtags
                    publish_date
                    comments {
                        _id
                        user_id
                        content
                        comments {
                            user_id
                            content
                            author {
                                name
                            }
                        }
                        author {
                            name
                        }
                    }
                    media {
                        url
                        type
                        comment
                    }
                    locations {
                        coords
                    }
                    author {
                        name
                    }
                }
            }`
        })
        .then((response) => {
            this.loading = false
            this.posts = response.data.data.posts
        })
    },
    data: () => ({
      selectedItem: 0,
      postdialog:false,
      name:null,
      loading:true,
      posts:[],
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