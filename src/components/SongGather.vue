<template>
  <div id="SongGather">
    <van-nav-bar left-arrow @click-left="back" fixed placeholder>
      <template #title>
        <div class="title">List Square</div>
      </template>
    </van-nav-bar>

    <van-tabs v-model="cat" sticky swipeable animated lazy-render
    color="#735eac" background="#fbf7ff" line-height="0.5em">

  <van-tab v-for="(gather) in gathers" :key="gather.id" :title="gather.name" :name="gather.name" replace=true>
    
    <div class="sheets">
 <div class="asheet" v-for="(sheet) in sheets" :key="sheet.id"
        @click="playListId(sheet.id); GoSongSheet()">
        <img :src="sheet.coverImgUrl">
        <span class="describe">{{ sheet.name }}</span>
      </div>
    </div>

  </van-tab>

    <!-- <span v-for="(gather) in gathers" :key="gather.id" 
    class="bott" @click="cat=gather.name">
      {{ gather.name }} -->
      <!-- {{ gather.category }} -->
      <!-- 0: "语种" 1: "风格" 2: "场景 "3: "情感 4: "主题" -->
  <!-- </span> -->
  </van-tabs>


    </div>

</template>
        
<script>
/* eslint-disable */
import Vue from 'vue';
import service from '@/request/index.js'
import { Cell, CellGroup } from 'vant';
import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Cell);
Vue.use(CellGroup);

export default {
  name: 'SongGather',
  components: {
  },
  data() {
    return {
      gathers: [],
      sheets: [],
      cat:'',
    }
  },
  watch:{
      cat(val)
    {this.toplist();}
    },
  created() {
    this.catlist();
    this.toplist();
  },

  methods: {
    // catlist歌单分类/hot热门歌单分类
    catlist() {
      service({
        method: 'get',
        url: '/playlist/catlist',
        // 歌单分类/playlist/catlist
        params: {
        }
      }).then((response) => {
        console.log(response.data);
        // this.gathers = response.data.tags;
        this.gathers = response.data.sub;
      })
        .catch(function (error) {
          console.log(error);
        });
    },
    toplist() {
      service({
        method: 'get',
        url: '/top/playlist',
        params: {
          cat:this.cat,
          limit: 27,
        }
      }).then((response) => {
        console.log(response.data);
        this.sheets = response.data.playlists;
      })
        .catch(function (error) {
          console.log(error);
        });
    },

    playListId(id) {
      this.$store.commit("newListId", id);
    },
    GoSongSheet(){
        this.$router.push('/SongSheet');
      },
    back() {
      this.$router.back();
    },
  },
  computed: {

  }
} 
</script>

<style lang="less" scoped>
// #SongGather{
//   padding:0 4%;
// }
.title {
  font-size: 1.15em;
}

.describe {
  font-size: 0.95rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.sheets{
  margin-top: 8%;
  width:100%;
  display: grid;
  grid-gap: 1em;
  row-gap: 1em;
  grid-template-columns:1fr 1fr 1fr;
    //比例1:1:1
  overflow: hidden;
  .asheet{
    width:100%;
    height:100%;
  }
  .asheet:hover{
    background-color: white;
    border-radius: 6px;
  }
  img{
    width:100%;
    border-radius: 6px;
  }
}
.bott {
  width:4.5em;
  margin: 0.2em;
  line-height: 1.8em;
  white-space: nowrap;
}
</style>