<template>
    <v-container fluid>
        <v-row>
            <v-col class="pa-0">
                <v-toolbar dense class="elevation-3" flat>

                    <v-toolbar-title>Tageo</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-col>
        </v-row>
        <v-row class="mt-6">
            <v-col cols="3">
                <v-card
                    color="#EEEEEE"
                    elevation="0"
                >
                    <v-card-title class="text-h6 font-weight-bold">
                    Trending <span><v-icon size="20">mdi-trending-up</v-icon></span>
                    </v-card-title>

                    <v-spacer></v-spacer>
                    <v-skeleton-loader
                    class="trending-skeleton"
                    type="heading"
                    ></v-skeleton-loader>
                    <v-skeleton-loader
                    class="trending-skeleton"                    
                    type="heading"
                    ></v-skeleton-loader>
                    <v-skeleton-loader
                    class="trending-skeleton"
                    type="heading"
                    ></v-skeleton-loader>
                    <v-skeleton-loader
                    class="trending-skeleton"
                    type="heading"
                    ></v-skeleton-loader>
                    <v-skeleton-loader
                    class="trending-skeleton"
                    type="heading"
                    ></v-skeleton-loader>

                    <v-card-actions>
                 
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="6">
                <router-view></router-view>
            </v-col>
            <v-col cols="3">
                <v-list>
                    <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title class="text-h6">
                        John Leider
                        </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-list-item-action>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list
                    nav
                    dense
                >
                    <v-list-item-group
                    color="primary"
                    >
                    <v-list-item>
                        <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                        <v-icon>mdi-pencil</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                        <v-list-item-title>My Posts</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                        <v-icon>mdi-account-group</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                        <v-list-item-title>My Groups</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                        <v-icon>mdi-content-save</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                        <v-list-item-title>Saved Posts</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                        <v-list-item-title>My Profile</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name:'Main',
    data: () => ({     
    }),
}
</script>

<style scoped>
.trending-skeleton{
    padding:5px;
}
</style>