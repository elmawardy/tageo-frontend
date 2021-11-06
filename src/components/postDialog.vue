<template>
    <div>
        <v-dialog
            v-model="open"
            max-width="600px"
        >
            <v-slide-x-transition mode="out-in">
                <keep-alive>
                    <NewPostCard :progresses="progresses" :polls="polls" :locations="locations" @showPanel="showPanel" v-if="panels.post" key="2"/>
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
            locations:[],
            polls:[],
            progresses:[]
        }
    },
    methods: {
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