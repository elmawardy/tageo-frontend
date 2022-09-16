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
      notifications:[],
      backendURL:'http://localhost:3030'
  },
  mutations: {
      snackbar(state,options){
          state.snackbar = {...state.snackbar,...options,color:options.color || 'pink'}
      },
      add_notification(state,data){
        if (state.notifications.length >= 3){          
          state.notifications.splice(0,1)
          setTimeout(() => {
            state.notifications.push(data)
            setTimeout(() => {
              state.notifications.splice(0,1)
            }, 3000); // dismiss after specific time
          }, 500);
          return
        }

        state.notifications.push(data)
        setTimeout(() => {
          state.notifications.splice(0,1)
        }, 3000); // dismiss after specific time
      }
  },
  actions: {
  },
  modules: {
  }
})