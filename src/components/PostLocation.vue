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
                    Pick Location
                </p>
            </v-card-title>
            <v-card-text>
                <v-container fluid>
                    <v-row>
                        <v-col class="pa-0" style="min-height:50vh;width:100%;position:relative;">
                             <l-map @update:center="updateCenter" :zoom="zoom" :center="mapCenter" ref="myMap" :options="mapOptions">
                                <l-tile-layer :url="'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'"></l-tile-layer>
                             </l-map>
                             <v-icon size="35" style="position: absolute;color: blue;inset:50%;z-index: 999;">mdi-map-marker</v-icon>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="text-center">
                            <v-btn depressed style="width:calc(50% - 4px);margin-right:2px;">
                                Cancel
                            </v-btn>
                            <v-btn @click="returnLocation" depressed color="primary" style="width:calc(50% - 4px);margin-left:2px">
                                Pick Location
                                <span class="pl-3">
                                    <v-icon>mdi-check</v-icon>
                                </span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mapCenter: [30.033333,31.233334],
            mapOptions:{
                zoomControl:false,
            },
            zoom:16,
        }
    },
    methods:{
        updateCenter(bounds){
            this.mapCenter= [bounds.lat,bounds.lng]
        },
        returnLocation(){
            this.$emit('returnLocation',this.mapCenter)
        }
    }
}
</script>