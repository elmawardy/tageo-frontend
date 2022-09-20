<template>
    <v-container>
        <v-card class="mx-auto"  tile>
            <v-img height="100%" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>
            <v-col>
                <v-avatar size="100" style="position:absolute; top: 130px">
                    <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                </v-avatar>
            </v-col>
            <v-list-item color="rgba(0, 0, 0, .4)">
            <v-list-item-content>
                <v-list-item-title class="title">{{user_info ? user_info.name : ""}}</v-list-item-title>
                <v-list-item-subtitle v-if="user_info">Profile</v-list-item-subtitle>
                <v-list-item-subtitle v-else>
                    <v-skeleton-loader
                        type="list-item-avatar"
                    ></v-skeleton-loader>
                </v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
            <v-btn
              fab
              small
              color="white"
              depressed
              style="position:absolute;right:10px;top:10px;"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </v-card>
        <v-row class="mt-1">
            <v-col>
                <div v-if="loadingPosts">
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
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
const axios = require('axios').default;
import Post from '../components/Post.vue'


export default {
    components: {
        Post
    },
    data() {
        return {
            user_info: null,
            loadingPosts:true,
            posts:[]
        }
    },
    mounted() {
        this.user_info = JSON.parse(localStorage.userInfo);
        if (this.user_info)
            axios.post(`${this.$store.state.backendURL}/graphql`,{
                query : `
                {
                    posts (author_id:"${this.user_info.id}"){
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
                            author{
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
                this.loadingPosts = false
                this.posts = response.data.data.posts
            })
    },
}
</script>