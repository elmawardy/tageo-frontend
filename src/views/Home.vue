<template>
<div>
<v-card>
    <v-card-text>
        <v-row>
            <v-col cols="10">
                    <v-text-field
                    label="Create Post"
                    v-model="name"
                    background-color="grey lighten-4"
                    prepend-icon="mdi-pencil"
                    dense
                    filled
                    rounded
                    hide-details
                    type="text"
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-avatar
                    color="primary"
                    size="50"
                >
                    <img
                        src="https://cdn.vuetifyjs.com/images/john.png"
                        alt="John"
                    >
                </v-avatar>
            </v-col>
        </v-row>
    </v-card-text>
</v-card>
</div>
</template>

<script>
export default {
    name:'Home',
    data: () => ({
      selectedItem: 0,
      name:null,
      items: [
        { text: 'My Files', icon: 'mdi-folder' },
        { text: 'Shared with me', icon: 'mdi-account-multiple' },
        { text: 'Starred', icon: 'mdi-star' },
        { text: 'Recent', icon: 'mdi-history' },
        { text: 'Offline', icon: 'mdi-check-circle' },
        { text: 'Uploads', icon: 'mdi-upload' },
        { text: 'Backups', icon: 'mdi-cloud-upload' },
      ],
    }),
}
</script>