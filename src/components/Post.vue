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
                        0 Comments
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
            <v-row v-if="showcomments">
                <v-col>
                    <v-textarea
                        label="Comment"
                        append-icon="mdi-send"
                        solo
                        hide-details
                        rows="3"
                        type="text"
                        @click:append="showcomments = !showcomments"
                    ></v-textarea>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import LightBox from 'vue-image-lightbox'

require('vue-image-lightbox/dist/vue-image-lightbox.min.css')

export default {
    props: ['post'],
    components: {
        LightBox,
    },
    data() {
        return {
            showcomments:false
        }
    },
    methods: {
        sendComment:function(){
            
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