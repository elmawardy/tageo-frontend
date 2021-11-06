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
                    Poll
                </p>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col>
                        <v-textarea
                            name="poll-text"
                            label="Text"
                            v-model="text"
                            rows="2"
                            prepend-icon="mdi-comment"
                        ></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            label="Option text"
                            v-model="new_item_text"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn color="primary" @click="addItem">
                            Add
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card v-for="item,index in items" :key="index" class="mb-3">
                            <v-card-title>
                                {{item.text}}
                                <v-spacer></v-spacer>
                                <v-btn icon @click="removeItem(index)">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col style="display:flex;justify-content:flex-end">
                        <v-btn @click="$emit('showPanel','post')">Cancel</v-btn>
                        <v-btn class="ml-2" color="primary" @click="returnPoll">Add</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
         </v-card>
    </div>
</template>

<script>
export default {
    name:'Poll',
    data() {
        return {
            items:[],
            text:null,
            new_item_text:null
        }
    },
    methods: {
        addItem(){
            this.items.push({text:this.new_item_text})
        },
        removeItem(index){
            this.items.splice(index,1)
        },
        returnPoll(){
            this.$emit('returnPoll',JSON.stringify({items:this.items,text:this.text}))
        }
    },
}
</script>