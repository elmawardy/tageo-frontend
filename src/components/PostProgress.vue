<template>
    <div>
         <v-card style="min-height:300px;">
            <v-card-title>
                <p class="text-h6 text--primary">
                    <v-btn
                    icon
                    @click="$emit('showPanel','post')"
                    >
                    <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    Add Progress
                </p>
            </v-card-title>
            <v-card-text>
                <v-text-field
                    label="Title"
                    v-model="title"
                ></v-text-field>
                 <v-text-field
                    label="Start"
                    v-model="start"
                ></v-text-field>
                <v-text-field
                    label="End"
                    v-model="end"
                ></v-text-field>
                <v-text-field
                    label="Current"
                    v-model="current"
                ></v-text-field>
                 <v-progress-linear
                    v-if="end!=null"
                    :value="percent"
                    height="25"
                    >
                    <strong style="color:white;">{{ current }}/{{ end }} ({{percent}}%)</strong>
                </v-progress-linear>
                <v-row class="mt-3">
                    <v-col style="display:flex;justify-content:flex-end">
                        <v-btn @click="$emit('showPanel','post')">Cancel</v-btn>
                        <v-btn @click="returnProgress" class="ml-2" color="primary">Add</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
         </v-card>
    </div>
</template>

<script>
export default {
    name:'PostProgress',
    data() {
        return {
            title:null,
            start:1,
            end:null,
            current:0
        }
    },
    methods: {
        returnProgress(){
            this.$emit('returnProgress',JSON.stringify({title:this.title,start:this.start,end:this.end,current:this.current,percent:this.percent}))
        }
    },
    computed:{
        percent:{
            get() {
                return this.end == null ? 0 : this.current * 100 / this.end;
            }
        }
    }
}
</script>