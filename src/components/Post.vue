<template>
    <v-card>
        <v-card-text>
            <v-row>
                <v-col cols="1" class="pa-0">
                    <div style="display:flex;flex-direction:column;align-content:center;flex-wrap:wrap">
                        <v-btn
                            icon
                            color="gray"
                            >
                            <v-icon>mdi-arrow-up-bold-outline</v-icon>
                        </v-btn>
                        <p class="ma-0" style="text-align:center">0</p>
                        <v-btn
                            icon
                            color="gray"
                            >
                            <v-icon>mdi-arrow-down-bold-outline</v-icon>
                        </v-btn>
                    </div>
                </v-col>
                <v-col @click="postdialog=!postdialog" cols="11">
                    <p style="font-size:0.8rem">Posted by <a href="http://google.com" style="text-decoration: none">{{post.author.name}}</a> {{post.publish_date}}</p>

                    <p style="color:#5D5D5E">{{post.article}}</p>  
                </v-col>
            </v-row>
            <v-row v-if="media.length > 0">
                <v-col>
                    <div style="display:flex;cursor:pointer" class="pa-1">
                        <light-box ref="lightbox" :showLightBox="false" :media="media"></light-box>
                        <div @click="$refs.lightbox.showImage(index)" v-for="(m,index) in media" :key="index" style="min-height:80px;display:flex;flex-direction: column-reverse;">
                            <img  :src="m.src" :alt="m.caption" style="width:120px;cursor:pointer;">
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
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
                                    <v-btn @click="sendComment" small icon color="primary" class="text-none">
                                        <v-icon dark small>
                                            mdi-send
                                        </v-icon>
                                    </v-btn>
                                    <v-btn icon small>
                                        <v-icon small dark>
                                            mdi-image
                                        </v-icon>
                                    </v-btn>
                                </template>
                        </v-textarea>
                    </v-col>
                </v-row>
                <v-row v-for="(comment,index) in post.comments" :key="index">
                    <v-col class="pa-1">
                        <div class="px-3 pt-2" style="display:flex;flex-direction:column;">
                            <div style="display:flex">
                                 <v-icon
                                    left
                                >
                                    mdi-twitter
                                </v-icon>
                                <span>{{comment.user_id}}</span>
                            </div>
                            <div class="px-2 py-2" style="font-size:1rem;display:flex;flex-direction:row">
                                <div :style="{'width':'2px','background-color':'silver'}">
                                    &nbsp;
                                </div>
                                <div style="margin-left:5px;">
                                    <strong class="mt-2 ml-2 mb-2" style="color:black;">{{comment.content}}</strong>
                                    <div style="display:flex;align-items:center;">
                                        <v-btn icon class="text-none">
                                            <v-icon dark>
                                                mdi-arrow-up-bold-outline
                                            </v-icon>
                                        </v-btn>
                                        0
                                        <v-btn icon class="text-none">
                                            <v-icon dark>
                                                mdi-arrow-down-bold-outline
                                            </v-icon>
                                        </v-btn>
                                        <v-btn icon class="text-none">
                                            <v-icon dark>
                                                mdi-reply
                                            </v-icon>
                                        </v-btn>
                                    </div>
                                    <v-row v-for="(subcomment,index) in comment.comments" :key="index">
                                        <v-col class="pa-1 ml-4">
                                            <div class="px-3 pt-2" style="display:flex;flex-direction:column;">
                                                <div style="display:flex">
                                                    <v-icon
                                                        left
                                                    >
                                                        mdi-twitter
                                                    </v-icon>
                                                    <span>{{subcomment.user_id}}</span>
                                                </div>
                                                <div class="px-2 py-2" style="font-size:1rem;display:flex;flex-direction:row">
                                                    <div :style="{'width':'2px','background-color':'silver'}">
                                                        &nbsp;
                                                    </div>
                                                    <div style="margin-left:5px;">
                                                        <strong class="mt-2 ml-2 mb-2" style="color:black;">{{subcomment.content}}</strong>
                                                        <div style="display:flex;align-items:center;">
                                                            <v-btn icon class="text-none">
                                                                <v-icon dark>
                                                                    mdi-arrow-up-bold-outline
                                                                </v-icon>
                                                            </v-btn>
                                                            0
                                                            <v-btn icon class="text-none">
                                                                <v-icon dark>
                                                                    mdi-arrow-down-bold-outline
                                                                </v-icon>
                                                            </v-btn>
                                                            <v-btn icon class="text-none">
                                                                <v-icon dark>
                                                                    mdi-reply
                                                                </v-icon>
                                                            </v-btn>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </div>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
import LightBox from 'vue-image-lightbox'
import axios from 'axios'

require('vue-image-lightbox/dist/vue-image-lightbox.min.css')

export default {
    props: ['post'],
    components: {
        LightBox,
    },
    data() {
        return {
            showcomments:false,
            comment:null
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
        }
    },
    computed: {
        media: function(){
            if (this.post.media.length == 0) return []
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