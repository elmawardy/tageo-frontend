<template>
    <v-card>
        <v-card-title>
            <v-btn
            icon
            @click="$emit('closeDialog')"
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-2" justify="center">
            <div class="pb-5">
                <editor
                v-model="article"
                api-key="vziuotwvmas2erqj49kvn9vfl7ta1msilvcrbansidlgrgdg"
                :init="{
                    height: '50vh',
                    menubar: false,
                    plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent lineheight | removeformat | help',
                    lineheight_formats: '0.5 1 1.1 1.2 1.3 1.4 1.5 2'
                }"
                />
            </div>
            <v-card class="mb-3" v-for="(poll,index) in polls" :key="'poll-'+index" style="position:relative;">
                <v-card-title>
                    Poll
                </v-card-title>
                <v-card-text>
                    <h3>{{poll.text}}</h3>
                    <ul>
                        <li v-for="item,index in poll.items" :key="index">{{item.text}}</li>
                    </ul>
                </v-card-text>
                 <v-btn
                    fab
                    small
                    color="white"
                    @click='polls.splice(index, 1)'
                    style="position:absolute;top:5px;right:5px;"
                    >
                    <v-icon color="secondary">mdi-close</v-icon>
                </v-btn>
            </v-card>
            <v-card class="mb-3" style="position:relative" v-for="(item,index) in progresses" :key="'progress-'+index" >
                <v-card-title>
                    Progress
                </v-card-title>
                <v-card-text>
                    <h3>{{item.title}}</h3>
                    <v-progress-linear
                        :value="item.percent"
                        height="25"
                        >
                        <strong style="color:white;">{{ item.current }}/{{ item.end }} ({{item.percent}}%)</strong>
                    </v-progress-linear>
                </v-card-text>
                <v-btn
                    fab
                    small
                    color="white"
                    @click='progresses.splice(index, 1)'
                    style="position:absolute;top:5px;right:5px;"
                    >
                    <v-icon color="secondary">mdi-close</v-icon>
                </v-btn>
            </v-card>
             <v-card class="mb-3" v-for="(location,index) in locations" :key="'location-'+index" style="position:relative;">
                <v-card-title>
                    Location
                </v-card-title>
                <v-card-text>
                    [{{location[0]}},{{location[1]}}]
                </v-card-text>
                 <v-btn
                    fab
                    small
                    color="white"
                    @click='locations.splice(index, 1)'
                    style="position:absolute;top:5px;right:5px;"
                    >
                    <v-icon color="secondary">mdi-close</v-icon>
                </v-btn>
            </v-card>
            <div style="position:relative" v-for="(item,index) in media" :key="index" >
                <v-btn
                    fab
                    small
                    color="white"
                    background-color="red"
                    @click="$emit('removeMedia',index)"
                    style="position:absolute;top:5px;right:5px;"
                    >
                    <v-icon color="secondary">mdi-close</v-icon>
                </v-btn>
                <img :src="item.url" style="width:100%;">
            </div>
            <v-card>
                <v-card-text>
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-badge
                                bordered
                                color="secondary"
                                :content="locations.length"
                                overlap
                                :value="locations.length>0"
                            >
                                <v-btn
                                color="primary"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                icon
                                @click="$emit('showPanel','location')"
                                >
                                    <v-icon>mdi-earth</v-icon>
                                </v-btn>
                            </v-badge>
                        </template>
                        <span>Location</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-badge
                                bordered
                                color="secondary"
                                :content="media.length"
                                :value="media.length"
                                overlap
                            >
                                <v-btn
                                color="primary"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                icon
                                @click="$refs.file_input.click()"
                                >
                                    <v-icon>mdi-image-multiple-outline</v-icon>
                                </v-btn>
                            </v-badge>
                        </template>
                        <span>Image/Video</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-badge
                                bordered
                                color="secondary"
                                :content="polls.length"
                                overlap
                                :value="polls.length>0"
                            >
                                <v-btn
                                color="primary"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                @click="$emit('showPanel','poll')"
                                icon
                                >
                                    <v-icon>mdi-poll</v-icon>
                                </v-btn>
                            </v-badge>
                        </template>
                        <span>Poll</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                             <v-badge
                                bordered
                                color="secondary"
                                :content="progresses.length"
                                :value="progresses.length"
                                overlap
                            >
                                <v-btn
                                color="primary"
                                dark
                                v-bind="attrs"
                                @click="$emit('showPanel','progress')"
                                v-on="on"
                                icon
                                >
                                    <v-icon>mdi-progress-check</v-icon>
                                </v-btn>
                             </v-badge>
                        </template>
                        <span>Progress</span>
                    </v-tooltip>
                </v-card-text>
            </v-card>
            <div class="mt-2">
                <v-btn
                color="primary"
                @click="$emit('publish')"
                depressed
                block
                >Publish</v-btn>
            </div>
            <v-overlay
            :absolute="false"
            :value="isPosting"
            :color="'#CCCCCC'"
            >
                <div style="min-width:20vw;text-align:center;background-color:white;padding:5px;border-radius:10px;">
                    <div style="display:flex;justify-content: center;padding-top:5px;">
                        <v-progress-circular
                        indeterminate
                        color="primary"
                        :size="15"
                        :width="2"
                        style="margin-top:3px;"
                        ></v-progress-circular>
                        <p style="margin-left:5px;font-size:12px;color:black">{{uploadingProgressText}}</p>
                    </div>
                    <v-btn
                    style="margin-bottom:5px;"
                    color="warning"
                    small
                    >
                        Cancel
                    </v-btn>
                </div>
            </v-overlay>
        </v-card-text>
        <input ref="file_input" type='file' @change="addFile();" style="display:none" />
    </v-card>
</template>

<script>
const axios = require('axios').default;
import Editor from '@tinymce/tinymce-vue'

export default {
    name: 'NewPostCard',
    components: {
        'editor': Editor
    },
    props:['polls','progresses','locations','media','isPosting','uploadingProgressText'],
    data() {
        return {
            article: ""
        }
    },
    methods:{
      addFile:function (){
          console.log(this.$refs.file_input.files[0])
          if (this.$refs.file_input.files[0].type.split('/')[0] == "image")
            this.$emit("addMedia",{type:'image',url:URL.createObjectURL(this.$refs.file_input.files[0]),file:this.$refs.file_input.files[0]})
          else
            this.$store.commit('snackbar',{open:true,text:`Unsupported media type`,color:'pink lighten-1'})
      },
      publish: function(){
          axios.post(`${this.$store.state.backendURL}/api/posts/add`,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.jwt
                },
                article: this.editor,
                locations: this.locations,
                polls: this.polls,
                progresses: this.progresses
          })
      }  
    },
    beforeDestroy() {
    
    },
    watch:{
        article(after){
            this.$emit('articleChange',after)
        }
    }
}
</script>