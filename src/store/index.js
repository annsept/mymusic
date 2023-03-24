import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name:"昭昭",
    playListId:"12345",
    playList:[
    {
      // id:2022595735,
      // name:"名字1",
      // picUrl:"https://p1.music.126.net/JZguHNVDUvmo0rjhQVYjiA==/3405187517388215.jpg",
    },{
      // id:504686859,
      // name:"名字2",
      // picUrl:"https://p1.music.126.net/zpmOTZw533nltCQJtXC8Rg==/109951168215962168.jpg",
    }
  ],
    playListIndex:1,
  },
  getters: {
  },
  mutations: {

    newIndex(state,i){
      state.playListIndex=i;
    },
    newList(state,list){
      state.playList=list;
      console.info(state.playList);
    },
    newListId(state,id){
      state.playListId=id;
    },
  },
  actions: {
  },
  modules: {
  }
})
