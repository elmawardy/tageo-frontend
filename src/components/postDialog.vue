<template>
    <div>
        <v-dialog
            v-model="open"
            max-width="600px"
        >
            <v-slide-x-transition mode="out-in">
                <keep-alive>
                    <NewPostCard @showPanel="showPanel" v-if="panels.post" key="2"/>
                    <PostLocation @showPanel="showPanel" v-if="panels.location" key="1" />
                </keep-alive>
            </v-slide-x-transition>
        </v-dialog>
    </div>
</template>

<script>
import NewPostCard from './NewPostCard'
import PostLocation from './PostLocation'

export default {
    props:['open'],
    components: {
        NewPostCard,
        PostLocation,
    },
    data() {
        return {
            panels:{
                post: true,
                location: false,
                media:false
            }
        }
    },
    methods: {
        showPanel:function(opened_panel){
            Object.keys(this.panels).forEach(k => {
                this.panels[k] = k == opened_panel ? true : false
            });
        }
    },
}
</script>