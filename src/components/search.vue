<template>
  <div id="search" >
    <!-- {{ key }}{{ Searchkey }} -->
    <!-- <input @change="searchb" v-model="key" >
    <button @click="searcha">搜索</button> -->
    <div @click="back">←</div>
    <!-- 我是一个有粘性的搜索栏 -->
    <van-sticky>
      <van-search v-model="key" background="#fbf7ff" show-action 
      placeholder="请输入搜索关键词"  @input="prompt()"
        @search="Searchkey = key">
        <template #action>
          <div @click="Searchkey = key">搜索</div>
        </template>
      </van-search>
    </van-sticky>

      <!-- 历史记录 -->
      <div v-show="!key">
      <div class="white-card">
          <div class="title">History <span class="right" 
            @click=clearHis>clear</span> </div>
          <!-- {{ history }} -->
          <span v-for="(item, i) in history" :key="i + 1" 
          class="bott" @click="clickHis(i)">
            {{ item }}
          </span>
        </div>

         <!-- 热搜榜 -->
        <div class="white-card">
          <div class="title">Hot List <span class="right" 
            >play</span> </div>
          <div v-for="(hot, i) in hots" :key="i" class="asong"
           @click="key = hot.searchWord; Searchkey = key;">
            <span class="number">{{ i + 1 }}</span>
            <span class="name">{{ hot.searchWord }}</span>
            <!-- {{ hot.content }} -->
          </div>
        </div>
      </div>


    <!-- 搜索时-->
    <div  class="aprompt" v-for="(match) in allMatch" :key="match.id" v-show="key && key != Searchkey">
      <div @click="key = match.keyword; Searchkey = key;" v-html="lowlight(`${match.keyword}`)">
        <!-- {{match.keyword}} -->
      </div>
      <van-divider />
    </div>

    <SearchResult v-if="key==Searchkey&&key" :Searchkey="Searchkey"></SearchResult>

  </div>
</template>
    
<script>
/* eslint-disable */
import service from '@/request/index.js'
import SearchResult from '@/components/SearchResult.vue'

import Vue from 'vue';
import { Search } from 'vant';
import { Divider } from 'vant';
import { List } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Sticky } from 'vant';

Vue.use(Sticky);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(List);
Vue.use(Divider);
Vue.use(Search);

export default {
  name: 'search',
  components: {
    SearchResult,
  },
  data() {
    return {
      // music:[],
      key:'',
      Searchkey:'',
      history:[],
     allMatch:[],
hots:[],
    }
  },
  watch:{
    Searchkey(val)
    {this.addHis();}
  },
  mounted(){
    this.hotsearch();
    //读取历史搜索记录
    if(localStorage.history)
    {this.history=JSON.parse(localStorage.history);}
  },
  //保存历史搜索记录
    beforeDestroy(){
    localStorage.setItem('history',JSON.stringify(this.history)); 

  },
  methods:{
    prompt() {
      if(this.key){
      service({
        method: 'get',
        url: '/search/suggest',
        params: {
          keywords:this.key,
          type:'mobile',
        }
      }).then((response) => {
        console.log('prompt');
        console.log(response.data.result.allMatch);
        this.allMatch = response.data.result.allMatch;
      })
        .catch(function (error) {
          console.log("search出错啦"+error);
        });}
    },
    hotsearch() {
      service({
        method: 'get',
        url: '/search/hot/detail',
      }).then((response) => {
        console.log('hotSearch');
        console.log(response.data);
        this.hots = response.data.data;
      })
        .catch(function (error) {
          console.log("hotsearch出错啦"+error);
        });
    },
    back(){
      this.$router.back();
    },
    addHis()
    {
    //如果已在历史记录中则删除
    let k=this.history.indexOf(this.Searchkey);
    if(k!=-1){this.history.splice(k,1);}
    //添加历史记录
    this.history.unshift(this.key);
    },
    clickHis(i){
    //点击历史记录后搜索
    this.key=this.history[i];
    this.Searchkey=this.history[i];
    },
    clearHis(){
      //清除历史查询 
      this.history=[];
    },
    lowlight(k){
      //和key匹配的高亮显示
      return(k.replace(this.key,`<font color="#b1a8c6">${this.key}</font>`))
    },
  },
  computed:{
  },
}
</script>
    
<style lang="less" scoped>

#search{
  .aprompt {
  /* padding:3% 0; */
  /* border: 1px solid yellow; */
  color: #362b54;
  text-align: left;

  &:hover {
    background-color: white;
  }
}

.title {
  padding-bottom: 0.6em;
}

.bott {
  margin: 0.2em;
  line-height: 1.8em;
}

}
</style>