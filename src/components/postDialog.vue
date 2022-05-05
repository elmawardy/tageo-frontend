<template>
    <div>
        <v-dialog
            v-model="open"
            max-width="600px"
        >
            <v-slide-x-transition mode="out-in">
                <keep-alive>
                    <NewPostCard @articleChange="articleChange" :uploadingProgressText="uploadingProgressText" @closeDialog="$emit('closeDialog')" :isPosting="isPosting" @publish="publish" :media="media" @addMedia="addMedia" @removeMedia="removeMedia" :progresses="progresses" :polls="polls" :locations="locations" @showPanel="showPanel" v-if="panels.post" key="2"/>
                    <PostLocation @removeLocation="removeLocation" @returnLocation="addLocation" @showPanel="showPanel" v-if="panels.location" key="1" />
                    <Poll @returnPoll="addPoll" @showPanel="showPanel" v-if="panels.poll" key="3"/>
                    <PostProgress @returnProgress="addProgress" @showPanel="showPanel" v-if="panels.progress" key="4"/>
                </keep-alive>
            </v-slide-x-transition>
        </v-dialog>
    </div>
</template>

<script>
import NewPostCard from './NewPostCard'
import PostLocation from './PostLocation'
import Poll from './Poll'
import PostProgress from './PostProgress'
const axios = require('axios').default;

export default {
    props:['open'],
    components: {
        NewPostCard,
        PostLocation,
        Poll,
        PostProgress
    },
    data() {
        return {
            panels:{
                post: true,
                location: false,
                media:false,
                poll:false,
                progress:false
            },
            article:"",
            locations:[],
            polls:[],
            progresses:[],
            media:[],
            isPosting: false,
            uploadingProgressText:"Processing ..."
        }
    },
    methods: {
        publish(){
            this.isPosting = true;
            this.uploadingProgressText = `Processing ...`
            axios.post(`${this.$store.state.backendURL}/api/posts/add`,{
                article:this.article,
                locations:this.locations,
                hashtags:[],
                groups:[],
                polls:this.polls,
                progresses:this.progresses
            },{
                headers: {
                    'Authorization': 'Bearer '+localStorage.jwt
                },
            }).then((response) => {
                if (response.status == 200){
                    this.uploadMedia(response.data.data.post_id)
                    .then(() => {
                            this.$store.commit('snackbar',{
                            open:true,
                            text:'Post published successfully',
                            color: 'green'
                        })
                        this.isPosting = false
                        this.$emit('closeDialog')
                    })
                }
            }).catch((error) => {
                if (error.response){
                    this.$store.commit('snackbar',{open:true,text:error.response.data.message})
                }else{
                    this.$store.commit('snackbar',{open:true,text:"Error"})
                }
                this.isPosting = false
            })
        },
        articleChange(html){
            this.article = html
        },
        uploadMedia(post_id){
            return new Promise((resolve,reject) => {

                const asyncLoop = async () => {
                    for(var i=0;i<this.media.length;i++){
                    
                        this.uploadingProgressText = `Uploading media ${i+1}/${this.media.length} (0%)`

                        let formData = new FormData();
                        formData.append('photo', this.media[i].file);
                        formData.append('post_id',post_id)
                        formData.append('comment',"test comment")

                        var size = this.media[i].file.size


                        await axios.post(`${this.$store.state.backendURL}/api/media/upload/photo`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                "Authorization": 'Bearer '+localStorage.jwt
                            },
                            onUploadProgress: progressEvent => {
                                this.uploadingProgressText = `Uploading media ${i+1}/${this.media.length} (${Math.floor(progressEvent.loaded * 100 / size)}%)`
                            }
                        }
                        )
                        .catch(function(){
                            reject()
                        });
                    }

                    resolve();
                }

                asyncLoop();
            })
        },
        removeMedia(index){
            this.media.splice(index, 1)
        },
        addMedia:function(item){
            this.media.push(item)
        },
        showPanel:function(opened_panel){
            Object.keys(this.panels).forEach(k => {
                this.panels[k] = k == opened_panel ? true : false
            });
        },
        addLocation(location){
            this.locations.push(location);
            this.showPanel('post')
        },
        removeLocation(index){
            this.locations.removeAt(index);
            this.showPanel('post')
        },
        addPoll(poll){
            poll = JSON.parse(poll)
            this.polls.push(poll)
            this.showPanel('post')
        },
        addProgress(progress){
            progress = JSON.parse(progress)
            this.progresses.push(progress)
            this.showPanel('post')
        }
    },
}
</script>