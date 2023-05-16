<template>
    <div>
        <h2>Create Group</h2>
        <v-text-field
            label="Group name"
        ></v-text-field>
        <v-text-field
            label="Description"
        ></v-text-field>

        <h5>Group Image</h5>
        <v-container>
            <v-card class="mx-auto"  tile>
                <v-img height="195px" :src=" background_placeholder ? background_placeholder.url : default_group_background_img"></v-img>
                <v-btn
                    fab
                    small
                    color="white"
                    depressed
                    style="position:absolute;right:10px;top:10px;"
                    @click="$refs.background_input.click()"
                    >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-avatar @click="$refs.mainpic_input.click()" tile size="100" class="mx-auto" style="position:absolute; top: 130px;cursor:pointer;left:0px;right:0px;">
                    <v-img :src="placeholder_pic ? placeholder_pic.url:default_group_image"></v-img>
                </v-avatar>
            </v-card>
        </v-container>
        <input ref="mainpic_input" type='file' @change="changeMainPicPlaceholder();" style="display:none" />
        <input ref="background_input" type='file' @change="changeBackgroundPlaceholder();" style="display:none" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            gtroup_img_dialog:false,
            placeholder_pic: null,
            background_placeholder: null,
            default_group_background_img: "https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg",
            default_group_image: "https://media.istockphoto.com/id/901337994/vector/bulb-icon-stock-vector-illustration-flat-design.jpg?s=612x612&w=0&k=20&c=XxSvBJeH49A1TKNv-Vn46F2B7hx6RFOO_v5jtcHuDKs=",
        }
    },
    methods: {
        changeBackgroundPlaceholder: function (){
            console.log(this.$refs.background_input.files[0])
            if (this.$refs.background_input.files[0].type.split('/')[0] == "image")
                this.background_placeholder = {type:'image',url:URL.createObjectURL(this.$refs.background_input.files[0]),file:this.$refs.background_input.files[0]};
            else
                this.$store.commit('snackbar',{open:true,text:`Unsupported media type`,color:'pink lighten-1'})
        },
        changeMainPicPlaceholder: function (){
            console.log(this.$refs.mainpic_input.files[0])
            if (this.$refs.mainpic_input.files[0].type.split('/')[0] == "image")
                this.placeholder_pic = {type:'image',url:URL.createObjectURL(this.$refs.mainpic_input.files[0]),file:this.$refs.mainpic_input.files[0]};
            else
                this.$store.commit('snackbar',{open:true,text:`Unsupported media type`,color:'pink lighten-1'})
        },
    },
}
</script>