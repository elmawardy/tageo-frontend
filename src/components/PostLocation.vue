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
            <v-card-text></v-card-text>
        </v-card>
    </div>
</template>