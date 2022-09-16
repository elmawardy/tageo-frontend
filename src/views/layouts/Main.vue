<template>
    <v-container fluid>
        <v-row>
            <v-col class="pa-0">
                <v-app-bar dense elevate-on-scroll fixed>

                    <v-toolbar-title>Tageo</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-text-field
                        style="margin-top:25px;"
                        label="Search (Press /)"
                        prepend-inner-icon="mdi-magnify"
                        solo
                        dense
                        flat
                    ></v-text-field>

                    <v-spacer></v-spacer>
                    
                    <v-menu
                        v-model="open_notifications"
                        :close-on-content-click="false"
                        :nudge-width="200"
                        offset-x
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-badge
                                :content="$store.state.notifications.length"
                                :value="$store.state.notifications.length>0"
                                color="red"
                                overlap
                                bordered
                                offset-x="20"
                                offset-y="22"
                            >
                                <v-btn 
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon>mdi-bell</v-icon>
                                </v-btn>
                            </v-badge>
                        </template>

                        <v-card>
                            <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Notifications</v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-btn
                                        icon
                                    >
                                        <v-icon>mdi-bell-off-outline</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                            </v-list>

                            <v-divider></v-divider>

                            <v-list>
                                <v-list-item v-for="(n,key) in $store.state.notifications" :key="key">
                                    <v-list-item-avatar>
                                        <v-icon>mdi-check</v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        {{n.content}}
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>

                            <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                                text
                                @click="menu = false"
                            >
                                Close
                            </v-btn>
                            <v-btn
                                color="primary"
                                text
                                @click="menu = false"
                            >
                                Clear
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>

                    <Notifications />

                    <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </v-app-bar>
            </v-col>
        </v-row>
        <v-row class="mt-10 pt-6">
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
                    <router-link style="text-decoration: none;" :to="`/u/${user_info.id}`">
                        <v-list-item link>
                            <v-list-item-content>
                                    <v-list-item-title class="text-h6">
                                            {{user_info ? user_info.name : "..."}}
                                    </v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-icon>mdi-arrow-right</v-icon>
                            </v-list-item-action>
                        </v-list-item>
                    </router-link>
                </v-list>
                <v-divider></v-divider>
                <v-list
                    nav
                    dense
                >
                    <v-list-item-group
                    color="primary"
                    >
                    <router-link
                        to="/"
                        style="text-decoration: none; color: inherit;"
                        custom
                    >
                        <v-list-item>
                            <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                            <v-list-item-title>Home</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </router-link>
                    <router-link
                        style="text-decoration: none; color: inherit;"
                        to="groups"
                        custom
                    >
                        <v-list-item>
                            <v-list-item-icon>
                            <v-icon>mdi-account-group</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                            <v-list-item-title>Groups</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </router-link>
                    <v-list-item>
                        <v-list-item-icon>
                        <v-icon>mdi-bookmark-outline</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                        <v-list-item-title>Saved</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Notifications from '@/components/Notifications.vue';


export default {
    name:'Main',
    components: {
        Notifications
    },
    data: () => ({    
        open_notifications:false,
        user_info:null
    }),
    mounted() {
        this.user_info = JSON.parse(localStorage.userInfo)
    },
}
</script>

<style scoped>
.trending-skeleton{
    padding:5px;
}
</style>