<template>
    <v-alert
            v-model="data.open"
            dismissible
            :color="borderColor"
            border="right"
            elevation="2"
            colored-border
            :icon="icon"
    >
        <v-card
            elevation="0"
        >
            {{data.content}}
            <v-card-actions>
                <v-btn outlined :color="borderColor" @click="$router.push({path:data.link})">
                    Check
                    <v-icon
                        right
                        dark
                    >
                        mdi-open-in-new
                    </v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-alert>
</template>

<script>
export default {
    props:['data'],
    computed: {
        borderColor: function(){
            if (this.data.level == "success")
                return "teal"
            if (this.data.level == "error")
                return "error"
                
            return "silver"
        },
        icon: function(){
            if (this.data.level == "success")
                return "mdi-check"
            if (this.data.level == "error")
                return "mdi-alert-circle"
            
            return "mdi-info"
        }
    },
}
</script>