<template>
  <div id="artistGather">
    <van-nav-bar
    left-arrow @click-left="back" fixed placeholder>
      <template #title>
        <div class="title">Category of singers</div>
      </template>
    </van-nav-bar>

    <div class="artist" v-for="(artist) in artists" :key="artist.id" @click="GoArtist(artist.id)">
      <div class="pic"><img :src="artist.picUrl"></div>
      <span class="name">{{ artist.name }}</span>
    <span class="bott">关注</span>  
    </div>
  </div>
</template>
            
<script>
/* eslint-disable */
import service from '@/request/index.js'
import Vue from 'vue';
import { NavBar } from 'vant';
Vue.use(NavBar);

export default {
  name: 'artist',
  components: {
  },
  data() {
    return {
      artists: [],
    }

  },

  mounted() {
    this.getartist();
  },
  updated() {
  },

  methods: {
    getartist() {
      service({
        method: 'get',
        url: '/artist/list',
        params: {
          limit: 30,
          type: -1,
          // -1:全部1:男歌手2:女歌手3:乐队
          area: -1,
          // -1:全部7华语96欧美8:日本16韩国0:其他
        }
      }).then((response) => {
        console.log(response.data);
        this.artists = response.data.artists;
      })
        .catch(function (error) {
          console.log(error);
        });
    },
    GoArtist(id) {
      this.$router.push
        ({
          path: '/artist',
          query: { id: id }
        })
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

// #artistGather
// {
// margin:0 4%;
// }
.title {
  font-size: 1.15em;
}
.artist {
  margin: 2% 0;
  text-align: left;
  .pic {
    display: inline-block;
    width: 3em;
    height: 3em;
    vertical-align: middle;
    margin: 0.5em;
  }

  img {
    background-size: cover;
    width: 100%;
    height: 100%;
    vertical-align: sub;
    border-radius: 50%;
  }

  .name {
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #362b54;
  }
  .bott
{
  vertical-align: middle;
}
}
</style>