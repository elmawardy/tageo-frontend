<template>
  <v-app>
    <router-view></router-view>
      <v-snackbar
      v-model="$store.state.snackbar.open"
      >
      {{ $store.state.snackbar.text }}

      <template v-slot:action="{ attrs }">
          <v-btn
          :color="$store.state.snackbar.color || 'pink'"
          text
          v-bind="attrs"
          @click="$store.commit('snackbar',{open:false,color:$store.state.snackbar.color || 'pink'})"
          >
          Close
          </v-btn>
      </template>
      </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
