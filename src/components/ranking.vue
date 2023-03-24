<template>
  <div id="ranking">
    <van-nav-bar
    left-arrow @click-left="back" fixed placeholder>
      <template #title>
        <div class="title">Ranking List</div>
      </template>
    </van-nav-bar>

    <div class="arank white-card" v-for="(rank) in ranksd.slice(0, 4)" :key="rank.id" @click="playListId(rank.id); GoSongSheet()">
      <img :src="rank.coverImgUrl">
      <div class="detail">
       <div class="title"> {{ rank.name }}</div>
        <div class="asong" v-for="(song, i) in rank.tracks" :key="i">
         <div class="number"> {{ i+1 }}</div>
           {{ song.first }}
          <span class="by">-{{ song.second }}</span>
        </div>
      </div>
      <!-- {{rank.description}} -->
    </div>

<div class="othor-rank">
    <div v-for="(rank) in ranksd.slice(4)" :key="rank.id" @click="playListId(rank.id); GoSongSheet()">
      <img :src="rank.coverImgUrl">
    </div>
  </div>

  </div>
</template>
      <!-- <div class="detail">
        {{ rank.name }}
      </div> -->
      <!-- {{rank.description}} -->
        
<script>
/* eslint-disable */
import Vue from 'vue';
import service from '@/request/index.js'
import { Cell, CellGroup } from 'vant';
Vue.use(Cell);
Vue.use(CellGroup);

export default {
  name: 'ranking',
  components: {
  },
  data() {
    return {
      ranks: [],
      ranksd: [],
    }
  },

  created() {
    this.toplist();
    this.topDetail();
  },

  methods: {
    toplist() {
      service({
        method: 'get',
        url: '/toplist',
        params: {

        }
      }).then((response) => {
        console.log(response.data.list);
        this.ranks = response.data.list;
      })
        .catch(function (error) {
          console.log(error);
        });
    },
    topDetail() {
      service({
        method: 'get',
        url: '/toplist/detail',
      }).then((response) => {
        console.log(response.data);
        this.ranksd = response.data.list;
      })
        .catch(function (error) {
          console.log(error);
        });
    },
    playListId(id) {
      this.$store.commit("newListId", id);
    },
    GoSongSheet() {
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
// #ranking{
// }
.white-card
{
  // padding:0.8em;
  margin:0.8em;
}
.title {
  font-size: 1.15em;
}
.arank {
margin:5% 0;

img {
  // left
  width: 30%;
  vertical-align: middle;
  border-radius: 50%;
}
.detail {
  // right
  display: inline-block;
  width: 66%;
  // background-color: bisque;
  vertical-align: middle;
  margin-left: 4%;
}
.title {
  font-size: 1.25em;
  margin-bottom: 0.3em;
}
.asong {
    padding: 1% 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.number{
  font-size: 0.8em;
  margin-right: 0.2em
}
}
// .white-card:last-child
// 为啥没有用
// {
// margin-bottom:10%;
// }
.othor-rank{
  margin-top: 8%;
  width:100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em; 
  grid-template-columns: auto auto auto;

  img{
    width:100%;
    border-radius: 6px;
  }
}
</style>