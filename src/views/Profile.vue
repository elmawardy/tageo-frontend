<template>
    <v-container>
        <v-card class="mx-auto"  tile>
            <v-img height="195px" :src="backgroundImage"></v-img>
            <v-col>
                <v-avatar @click="profilepic_dialog=true" size="100" style="position:absolute; top: 130px;cursor:pointer;">
                    <v-img :src="avatar"></v-img>
                </v-avatar>
            </v-col>
            <v-list-item class="mt-3">
                <v-list-item-content>
                    <v-list-item-title class="title">{{user_info ? user_info.name : ""}}</v-list-item-title>
                    <v-list-item-subtitle v-if="user_info">
                        Profile
                        <v-btn
                            fab
                            x-small
                            color="white"
                            depressed
                            @click="edit_basic_info_dialog=true"
                            >
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-list-item-subtitle>
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
              @click="background_dialog = true"
            >
              <v-icon>mdi-camera</v-icon>
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
        <v-dialog
            v-model="profilepic_dialog"
            width="500"
            >
            <v-card>


                <v-card-title>
                    Profile photo
                </v-card-title>

                <v-card-text class="d-flex justify-center">
                    <v-avatar size="200">
                        <v-img  :src="placeholder_pic? placeholder_pic.url  :avatar"></v-img>
                    </v-avatar>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    v-if="placeholder_pic"
                    color="secondary"
                    text
                    @click="changeProfilePicture()"
                >
                    <v-icon class="mr-2">mdi-content-save</v-icon>
                    Save
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="$refs.file_input.click()"
                >
                    <v-icon class="mr-2">mdi-pencil</v-icon>
                    Edit
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            <v-dialog
            v-model="background_dialog"
            width="500"
            >
            <v-card>


                <v-card-title>
                    Background image
                </v-card-title>

                <v-card-text class="d-flex justify-center">
                        <v-img height="195" :src="background_placeholder? background_placeholder.url  : backgroundImage"></v-img>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    v-if="background_placeholder"
                    color="secondary"
                    text
                    @click="changeBackgroundImage()"
                >
                    <v-icon class="mr-2">mdi-content-save</v-icon>
                    Save
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="$refs.background_input.click()"
                >
                    <v-icon class="mr-2">mdi-pencil</v-icon>
                    Edit
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            <v-dialog
            v-model="edit_basic_info_dialog"
            width="500"
            >
            <v-card>


                <v-card-title>
                    Basic info
                </v-card-title>

                <v-card-text class="d-flex justify-center">
                        <v-text-field
                            v-model="displayname_placeholder"
                            counter="25"
                            label="Display name"
                        ></v-text-field>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="secondary"
                    text
                    @click="changeBasicInfo()"
                >
                    <v-icon class="mr-2">mdi-content-save</v-icon>
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            <input ref="file_input" type='file' @change="changePicplaceholder();" style="display:none" />
            <input ref="background_input" type='file' @change="changeBackgroundPlaceholder();" style="display:none" />
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
            posts:[],
            profilepic_dialog:false,
            placeholder_pic: null,
            background_placeholder: null,
            background_dialog: false,
            edit_basic_info_dialog:false,
            displayname_placeholder: null
        }
    },
    computed:{
        avatar: function(){
            var avatar = "";
            if (this.user_info){
                if (this.user_info.avatar)
                    avatar = this.$store.state.backendURL+this.user_info.avatar
            }

            if (avatar == "")
                avatar = "https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png";
            
            return avatar;
        },
        backgroundImage: function(){
            var background = "";
            if (this.user_info){
                if (this.user_info.background)
                    background = this.$store.state.backendURL+this.user_info.background
            }

            if (background == "")
                background = "https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png";
            
            return background;
        },
    },
    methods: {
        changeBasicInfo:function(){

            var user_id = JSON.parse(localStorage.userInfo).id

            axios.post(`${this.$store.state.backendURL}/api/auth/changeinfo`,{
                name: this.displayname_placeholder,
                id: user_id,
            },
            {
                headers: {
                    'Authorization': 'Bearer '+localStorage.jwt
                },
            })
            .then(()=>{
                this.$store.commit('snackbar',{open:true,text:`Successfully changed display name`,color:'green lighten-1'})
                this.edit_basic_info_dialog = false;
            })
            .catch(err=>{
                this.$store.commit('snackbar',{open:true,text:err,color:'pink lighten-1'})
            })
        },
        changeBackgroundPlaceholder: function (){
            console.log(this.$refs.background_input.files[0])
            if (this.$refs.background_input.files[0].type.split('/')[0] == "image")
                this.background_placeholder = {type:'image',url:URL.createObjectURL(this.$refs.background_input.files[0]),file:this.$refs.background_input.files[0]};
            else
                this.$store.commit('snackbar',{open:true,text:`Unsupported media type`,color:'pink lighten-1'})
        },
        changeBackgroundImage: function(){
            var user_info = JSON.parse(localStorage.userInfo)
            let formData = new FormData();
            formData.append('photo', this.background_placeholder.file);
            formData.append('user_id',user_info.id)


            axios.post(`${this.$store.state.backendURL}/api/media/changeuserbackeground`,
             formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": 'Bearer '+localStorage.jwt
                    },
                    onUploadProgress: progressEvent => {
                        this.uploadingProgressText = `(${Math.floor(progressEvent.loaded * 100 / this.background_placeholder.file.size)}%)`
                    }
                }
            ).then(() => {
                this.$store.commit('snackbar',{open:true,text:`Successfully changed background image!`,color:'green lighten-1'})
                this.background_dialog = false
            })
        },
        changePicplaceholder: function (){
            console.log(this.$refs.file_input.files[0])
            if (this.$refs.file_input.files[0].type.split('/')[0] == "image")
                this.placeholder_pic = {type:'image',url:URL.createObjectURL(this.$refs.file_input.files[0]),file:this.$refs.file_input.files[0]};
            else
                this.$store.commit('snackbar',{open:true,text:`Unsupported media type`,color:'pink lighten-1'})
        },
        changeProfilePicture: function(){
            
            var user_info = JSON.parse(localStorage.userInfo)
            let formData = new FormData();
            formData.append('photo', this.placeholder_pic.file);
            formData.append('user_id',user_info.id)


            axios.post(`${this.$store.state.backendURL}/api/media/changeprofilepicture`,
             formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": 'Bearer '+localStorage.jwt
                    },
                    onUploadProgress: progressEvent => {
                        this.uploadingProgressText = `(${Math.floor(progressEvent.loaded * 100 / this.placeholder_pic.file.size)}%)`
                    }
                }
            ).then(() => {
                this.$store.commit('snackbar',{open:true,text:`Successfully changed profile picture!`,color:'green lighten-1'})
                this.profilepic_dialog = false;
            })
        }
    },
    mounted() {
        var user_id  = JSON.parse(localStorage.userInfo).id;
        if (user_id)
            axios.post(`${this.$store.state.backendURL}/graphql`,{
                query : `
                {
                    users (_id:"${user_id}"){
                        name
                        email
                        avatar
                        background
                    }
                    posts (author_id:"${user_id}"){
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
                this.user_info = response.data.data.users[0]
                this.displayname_placeholder = this.user_info.name
                console.log(response.data.data.users[0])
            })
    },
}
</script>