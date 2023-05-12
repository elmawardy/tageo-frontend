<template>
<div>
    <h2>Groups</h2>
    <div style="display:flex;flex-direction:column" class="mt-5">
        <v-text-field
            label="Search groups"
            prepend-inner-icon="mdi-magnify"
            solo
        ></v-text-field>
        <div style="display: flex;justify-content: flex-end;">
            <router-link
                style="text-decoration: none; color: inherit;"
                to="groupcreate"
                custom
            >
                <v-btn color="success">
                    Create group
                </v-btn>
            </router-link>
        </div>
    </div>
    <v-list
        dense
    >
        <v-list-item-group
        color="primary"
        >
        <v-list-item>
            <v-list-item-avatar>
                <v-avatar>
                <img
                    src="https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png"
                    alt="John"
                >
                </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>Food</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
                <v-btn
                icon
                >
                <v-icon>mdi-cog-outline</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-list-item>
             <v-list-item-avatar>
                <v-avatar>
                <img
                    src="https://png.pngtree.com/template/20190316/ourlarge/pngtree-water-logo-image_79160.jpg"
                    alt="John"
                >
                </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>Water</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
    </v-list>
    <v-divider></v-divider>
    <h3 style="color:gray" class="mt-2">Other groups</h3>
    <v-list
        dense
    >
        <v-list-item-group
        color="primary"
        >
        <v-list-item>
            <v-list-item-avatar>
                <v-avatar>
                <img
                    src="https://static.vecteezy.com/system/resources/previews/002/442/871/non_2x/love-heart-logo-and-symbol-free-vector.jpg"
                    alt="John"
                >
                </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>Health</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
                <v-btn
                icon
                >
                <v-icon>mdi-location-enter</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-list-item>
             <v-list-item-avatar>
                <v-avatar>
                <img
                    src="https://www.nicepng.com/png/detail/97-974604_house-outline-free-vectors-logos-icons-and-photos.png"
                    alt="John"
                >
                </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>Houses</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
                <v-btn
                icon
                >
                <v-icon>mdi-location-enter</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        </v-list-item-group>
    </v-list>
</div>
</template>

<script>
export default {
    name:'Groups'
}
</script>