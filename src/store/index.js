import Vue from 'vue'
import Vuex from 'vuex'
import VueLazyLoad from 'vue-lazyload'

Vue.use(Vuex)
Vue.use(VueLazyLoad)

export default new Vuex.Store({
  state: {
      snackbar:{
          open:false,
          text:'---',
          color:'green'
      },
      backendURL:'http://localhost:3030'
  },
  mutations: {
      snackbar(state,options){
          state.snackbar = {...state.snackbar,...options,color:options.color || 'pink'}
      }
  },
  actions: {
  },
  modules: {
  }
})