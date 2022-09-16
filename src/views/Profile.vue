<template>
    <v-container>
        <v-row>
            <v-col>
                <div style="display:flex;direction:row">
                    <v-avatar
                    color="primary"
                    size="56"
                    style="color:white;"
                    >{{user_info ? user_info.name[0] : ""}}</v-avatar>
                    <div style="position:relative">
                        <div class="font-weight-medium px-2" style="bottom:5px;position:absolute;">{{user_info ? user_info.name : ""}}</div>
                    </div>
                    <v-skeleton-loader
                        v-if="!user_info"
                        type="list-item-avatar"
                    ></v-skeleton-loader>
                </div>
            </v-col>
        </v-row>
        <v-row>
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