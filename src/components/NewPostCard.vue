<template>
    <v-card>
        <v-card-title>
            <v-btn
            icon
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-2">
            <div>
                <editor-content :editor="editor" />
            </div>
            <div style="position:relative" v-for="(item,index) in media" :key="index" >
                <v-btn
                    fab
                    small
                    color="white"
                    background-color="red"
                    @click="media.splice(index, 1)"
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
                            <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            icon
                            >
                                <v-icon>mdi-poll</v-icon>
                            </v-btn>
                        </template>
                        <span>Poll</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            icon
                            >
                                <v-icon>mdi-progress-check</v-icon>
                            </v-btn>
                        </template>
                        <span>Progress</span>
                    </v-tooltip>
                </v-card-text>
            </v-card>
            <div class="mt-2">
                <v-btn
                color="primary"
                depressed
                block
                >Publish</v-btn>
            </div>
        </v-card-text>
        <input ref="file_input" type='file' @change="addFile();" style="display:none" />
    </v-card>
</template>

<script>
import {  Editor,EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
    name: 'NewPostCard',
    components: {
        EditorContent,
    },
    data() {
        return {
            editor:null,
            media:[]
        }
    },
    methods:{
      addFile:function (){
          console.log(this.$refs.file_input.files[0])
          if (this.$refs.file_input.files[0].type.split('/')[0] == "image")
            this.media.push({type:'image',url:URL.createObjectURL(this.$refs.file_input.files[0])})
          else
            this.$store.commit('snackbar',{open:true,text:`Unsupported media type`,color:'pink lighten-1'})
      }  
    },
    mounted() {
        this.editor = new Editor({
        content: '',
            extensions: [
                StarterKit,
            ],
            autofocus: true,
        })
    },
    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>


<style lang="scss">
.ProseMirror {
  min-height: 40vh;
  > * + * {
    margin-top: 0.75em;
  }
  p {
      margin:0px;
  }
}

.ProseMirror:focus {
    outline: none;
}
</style>