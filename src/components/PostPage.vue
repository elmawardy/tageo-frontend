<template>
    <div>
        <div v-if="loading">
            <v-skeleton-loader
            type="article, actions"
            ></v-skeleton-loader>
        </div>
        <v-card v-if="!loading">
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <p style="font-size:0.8rem">Posted by <a @click.stop="" :href="'/u/'+post.author._id" style="text-decoration: none">{{post.author.name}}</a> {{post.publish_date}}</p>

                        <p style="color:#5D5D5E" v-html="post.article"></p>  
                    </v-col>
                </v-row>
                <v-row v-if="media.length > 0">
                    <v-col>
                        <div style="display:flex;cursor:pointer" @click="$refs.lightbox.showImage(0)" class="pa-1">
                            <light-box ref="lightbox" :showLightBox="false" :media="media"></light-box>
                            <div @click="$refs.lightbox.showImage(index)" v-for="(m,index) in media" :key="index" style="min-height:80px;display:flex;flex-direction: column-reverse;">
                                <img  :src="m.src" :alt="m.caption" style="width:120px;cursor:pointer;">
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn
                            icon
                            color="gray"
                            >
                            <v-icon>mdi-arrow-up-bold-outline</v-icon>
                        </v-btn>
                        <span class="ma-0" style="text-align:center">0</span>
                        <v-btn
                            icon
                            color="gray"
                            >
                            <v-icon>mdi-arrow-down-bold-outline</v-icon>
                        </v-btn>
                        <v-btn small depressed color="white" class="text-none" @click="showcomments=!showcomments">
                            <v-icon
                                left
                                dark
                            >
                                mdi-comment-outline
                            </v-icon>
                            {{post.comments ? post.comments.length : 0}} Comments
                        </v-btn>
                        <v-btn small depressed color="white" class="text-none">
                            <v-icon
                                left
                                dark
                            >
                                mdi-share-variant-outline
                            </v-icon>
                            Share
                        </v-btn><v-btn small depressed color="white" class="text-none">
                            <v-icon
                                left
                                dark
                            >
                                mdi-bookmark-outline
                            </v-icon>
                            Save
                        </v-btn>
                    </v-col>
                </v-row>
                <div v-if="showcomments">
                    <v-row>
                        <v-col>
                            <v-textarea
                                placeholder="Comment"
                                solo
                                hide-details
                                auto-grow
                                rows="1"
                                type="text"
                                v-model="comment"
                                @click:append="showcomments = !showcomments"
                            >
                                <template slot="append">
                                    <v-btn v-if="!sendingComment" @click="sendComment" small icon color="primary" class="text-none">
                                        <v-icon dark small>
                                            mdi-send
                                        </v-icon>
                                    </v-btn>
                                    <v-progress-circular
                                        v-else
                                        size="20"
                                        width="2"
                                        indeterminate
                                        color="green"
                                    ></v-progress-circular>
                                </template>
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <comment :comment="comment" v-for="(comment,index) in post.comments" :key="index" />
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import LightBox from 'vue-image-lightbox'
import comment  from './postComment'
import axios from 'axios'

require('vue-image-lightbox/dist/vue-image-lightbox.min.css')

export default {
    components: {
        LightBox,
        comment
    },
    data() {
        return {
            post:null,
            showcomments:true,
            comment:null,
            loading:true,
            sendingComment:false
        }
    },
    methods: {
        sendComment:function(){
            axios.post(`${this.$store.state.backendURL}/api/posts/comment`,{
                post_id: this.post._id,
                content: this.comment 
            },{
                headers: {
                    'Authorization': 'Bearer '+localStorage.jwt
                },
            })
            .then(() => {
                this.sendingComment =false;
                this.$store.commit('snackbar',{
                    open:true,
                    text:'Comment send successfully!',
                    color: 'green'
                })
            })
        }
    },
    mounted() {
        axios.post(`${this.$store.state.backendURL}/graphql`,{
            query:`
                {
                    posts (_id:"${this.$route.params.id}") {
                        _id
                        article
                        hashtags
                        locations {
                            coords
                        }
                        author {
                            name
                            _id
                        }
                        comments {
                            _id
                            user_id
                            content
                            author {
                                name
                            }
                            comments {
                                user_id
                                content
                                author {
                                    name
                                }
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
                    }
                }
            `
        })
        .then((response) => {
            this.loading = false
            this.post = response.data.data.posts[0]
        })
    },
    computed: {
        media: function(){
            if (!this.post.media || this.post.media.length == 0) return []
            var array = this.post.media.map((m) => {
                return {
                    src:this.$store.state.backendURL+m.url,
                    thumb: this.$store.state.backendURL+m.url,
                    caption: m.comment
                }
            });
            return array
        }
    }
}
</script>