<template>
    <div style="display:flex;flex-direction:column;width:30vw;position:absolute;right:50px;top:10px;">
        <v-slide-y-transition
            hide-on-leave
            class="py-0"
            group
        >
            <template v-for="(notification,key) in $store.state.notifications">
                <MessageWithLink :data="notification" :key="key" />
            </template>
        </v-slide-y-transition>
    </div>
</template>

<script>
import MessageWithLink from './Notifications/MessageWithLink.vue'

export default {
    components:{
        MessageWithLink
    }
}
</script>
