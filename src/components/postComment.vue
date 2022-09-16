<template>
    <v-row class="ml-2" ref="comment_header">
        <v-col class="pa-0">
            <div class="pt-2" style="display:flex;flex-direction:column;">
                <div style="display:flex">
                        <v-icon
                        left
                    >
                        mdi-twitter
                    </v-icon>
                    <span>{{comment.author.name}}</span>
                </div>
                <div class="px-2 py-2" style="font-size:1rem;display:flex;flex-direction:row">
                    <div class="commandLine" @click="$vuetify.goTo($refs.comment_header,{offset:50})">
                        &nbsp;
                    </div>
                    <div style="margin-left:5px;">
                        <strong class="mt-2 ml-2 mb-2" @mouseover="hoverCommentLine = true">{{comment.content}}</strong>
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
                        <comment :comment="comment" v-for="(comment,index) in comment.comments" :key="index" />
                    </div>
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import axios from 'axios'

export default {
    name:'comment',
    props : ['comment'],
    data() {
        return {
        }
    },
    methods: {
        sendComment:function(){
            axios.post(`${this.$store.state.backendURL}/api/posts/comment`,{
                post_id: this.post._id,
            },{
                headers: {
                    'Authorization': 'Bearer '+localStorage.jwt
                },
            })
        }
    },
}
</script>


<style lang="scss">
.commandLine {
    cursor: pointer;
    background-color: silver;
    width:2px;

    &:hover {
        background-color: green;
    }
}
</style>