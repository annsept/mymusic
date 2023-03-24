<template>
  <div>
    <!-- 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音 -->
    <van-tabs v-model="type" sticky swipeable animated lazy-render
    color="#735eac" background="#fbf7ff" line-height="0.5em">
      <van-tab title="单曲" name="1" replace="true">
        <div class="white-card">
          <van-cell  class="asong" v-for="(song, i) in songs" :key="song.id" @click="newPlaylist(i)">
            <template #title>
              <div class="songname" v-html="highlight(song.name)"></div>
            </template>
            <template #label>
              <div class="songby" v-html="highlight(`${song.ar[0].name}-${song.al.name}`)"></div>
            </template>
          </van-cell>
        </div>
      </van-tab>
      <van-tab  title="歌单"  name="1000">
        <!-- <div class="white-card"> -->
       <div class="alist" v-for="(playlist) in playlists" :key="playlist.id"
       @click="playListId(playlist.id);GoSongSheet()">
        <div class="pic"><img :src="playlist.coverImgUrl"></div>
        <div class="infor">
        <div class="name" v-html="highlight(`${playlist.name}`)"></div>
       <div class="by">{{ playlist.trackCount}}首歌    
        by{{ playlist.creator.nickname}} 
        {{ count(playlist.playCount)}}次播放</div>
      </div>
      <!-- </div> -->
    </div>
      </van-tab>
      <van-tab  title="歌手" name="100">
        <div class="artist" v-for="(artist) in artists" :key="artist.id" @click="GoArtist(artist.id)">
        <!-- {{ artists }} -->
        <div class="pic"><img :src="artist.picUrl"></div>
        <span class="name">{{ artist.name }}</span>
        <span class="bott">关注</span>  
      </div>
      </van-tab>
      <van-tab  title="专辑" name="10">{{type}}</van-tab>
      <van-tab  title="歌词" name="1009">{{type}}</van-tab>
    </van-tabs>

    <!-- 搜索后出来的歌曲 -->
  </div>
</template>
      
  <script>
  /* eslint-disable */
import service from '@/request/index.js'
import Vue from 'vue';
import { Divider } from 'vant';
import { List } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(List);
Vue.use(Divider);
  
  export default {
    name: 'SearchReasult',
    components: {
    },
    props:['Searchkey'],
    data() {
      return {
      active: 0,
      type:1,
      songs:[],
      artists:[],
      playlists:[],
      }
    },
    watch:{
      type(val)
    {this.search();}
    },

    created(){
      console.log("我是result")
      this.search()
    },
    methods:{
    search() {
      service({
        method: 'get',
        url: '/search',
        params: {
          keywords:this.Searchkey,
          limit:20,
          type:this.type,
          // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
        }
      }).then((response) => {
        console.log('search：',response.data);
        if(this.type==1)
        {this.songs = response.data.result.songs;}
        else if(this.type==100)
        {this.artists = response.data.result.artists;}
        else if(this.type==1000)
        {this.playlists = response.data.result.playlists;}
        else
        { console.log('还没写!');}
      })
        .catch(function (error) {
          console.log(error);
        });
        // this.key='';
    },
    highlight(k){
      //和key匹配的高亮显示
      return(k.replace(this.Searchkey,`<font color="#7151c7">${this.Searchkey}</font>`))
    },
    newPlaylist(i){
      //存入新播放列表
      this.$store.commit("newIndex",i);
      this.$store.commit("newList",this.songs);
    },
    count(n){
      if(n>100000)
      {return (n/100000).toFixed(2)+'万';}
      else
      {return n}
    },
    playListId(id){
        this.$store.commit("newListId",id);
      },
    GoSongSheet(){
        this.$router.push('/SongSheet');
      },
      GoArtist(id) {
      this.$router.push
      ({ path: '/artist',
       query: {id:id}
      })
    },
    },
    computed:{

    },

    }
  </script>
      
  <style  lang="less">
.songname {
  font-size:1.1em;
}
.alist {
  margin: 2% 0;
  text-align: left;

  &:hover {
    background-color: white;
    border-radius: 8px;
  }
 .pic {
  display: inline-block;
  width:18%;
  vertical-align: middle;
}
  img{
  width: 100%;
  height: auto;
  vertical-align: sub;
  border-radius: 6%;
}
  .infor {
    width:70%;
    display: inline-block;
    vertical-align: middle;
    margin: 1em;
    max-width: 100%;
    white-space: nowrap;
  }
  .name {
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #554580;
  }
  .by {
    font-size: 0.8em;
    text-overflow: ellipsis;
  }
}
.artist{
  margin: 2% 0;
  text-align: left;
  .pic {
  display: inline-block;
  width:3em;
  height:3em;
  vertical-align: middle;
  margin: 0.5em;
}
  img{
  background-size: cover;
  width: 100%;
  height:100%;
  vertical-align: sub;
  border-radius: 50%;
}
.name {
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #362b54;
  }
}
  </style>
  
  
      