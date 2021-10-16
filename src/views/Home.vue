<template>
<div>
<v-card class="mb-5">
    <v-card-text>
        <v-row>
            <v-col @click="postdialog=!postdialog" cols="10" style="cursor: pointer">
                    <v-text-field
                    label="Create Post"
                    v-model="name"
                    background-color="grey lighten-4"
                    prepend-icon="mdi-pencil"
                    dense
                    filled
                    disabled
                    rounded
                    hide-details
                    type="text"
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-avatar
                    color="primary"
                    size="50"
                    style="color:white;"
                >
                    A
                </v-avatar>
            </v-col>
        </v-row>
    </v-card-text>
</v-card>
<v-row>
    <v-col>
        <v-skeleton-loader
        type="article, actions"
        ></v-skeleton-loader>
    </v-col>
</v-row>
<v-row>
    <v-col>
        <v-skeleton-loader
        type="article, actions"
        ></v-skeleton-loader>
    </v-col>
</v-row>
<v-dialog
    v-model="postdialog"
    max-width="600px"
>
    <v-card>
        <v-card-title>
            <v-btn
              icon
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <div>
                
            </div>
        </v-card-text>
    </v-card>
</v-dialog>
</div>
</template>

<script>
export default {
    name:'Home',
    data: () => ({
      selectedItem: 0,
      postdialog:false,
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