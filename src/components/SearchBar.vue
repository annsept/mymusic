<template>
    <div>

  <!-- 我是一个有粘性的搜索栏 -->
  <van-sticky :z-index="10">
      <van-search class="search"
      v-model="key"
      background="#fbf7ff"
      placeholder="enters a search keyword"
      shape="round"
      @click="GoSearch"
    >
    <template #left>
    <div @click="showPopup">三</div>
  </template>
  </van-search>
  </van-sticky>

  <van-popup v-model="show"
  position="left" :style="{ height: '100%',width:'85%' }">
  <van-cell-group inset>
  <van-cell @click="Gologin" title="登录" is-link />
  <van-cell @click="GoMine" title="我的" is-link />
  <van-cell title="我的消息" is-link />
  <van-cell title="单元格" value="内容" label="描述信息" />
</van-cell-group>
<van-cell-group inset>
  <van-cell title="设置" is-link />
  <van-cell title="定时关闭" is-link />
  <van-cell title="青少年模式" is-link value="未开启"/>
</van-cell-group>
</van-popup>
  
    </div>
  </template>
      
  <script>
  /* eslint-disable */
  import Vue from 'vue';
  import { Search,Sticky } from 'vant';
  import { Popup } from 'vant';
  import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Popup);
  Vue.use(Search);
Vue.use(Sticky);
  
  export default {
    name: 'SearchBar',
    components: {
    },
    data() {
      return {
        key:'',
        show: false,
      }
    },
    methods:{
      GoSearch(){
        this.$router.push('/search');
      },
      Gologin(){
        this.$router.push('/login');
      },
      GoMine(){
        this.$router.push('/mine');
      },
      showPopup() {
      this.show = true;
    },
    },
    computed:{
    },
    created() {
    },
  }
  </script>
  <style scoped>
  </style>
  
  
      