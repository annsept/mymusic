<template>
  <div id="artist">
    <van-nav-bar left-arrow @click-left="back" fixed placeholder>
      <template #title>
        <div class="title">Singer</div>
      </template>
    </van-nav-bar>

    <img :src="infors.artist.cover">
    <!-- 名字与简介 -->
    <div class="white-card">
      <div class="title">{{ infors.artist.name }}</div>
      {{ infors.identify.imageDesc }}
    </div>
    <!-- 描述 -->
    <div class="by">{{ infors.artist.briefDesc }}</div>

    <!-- 歌手的歌曲 -->
    <div class="songs white-card">
      <div class="title">Play All {{ songs.length }}</div>
      <van-cell center class="asong" v-for="(song, i) in songs" :key="i" @click="newPlaylist(i)">
        <template #right-icon>
          <span class="number">{{ i + 1 }}</span>
        </template>
        <template #title>
          <div class="name" :class="{ playing: song.id == id }">
            {{ song.name }}</div>
        </template>
        <template #label>
          <div>{{ song.ar[0].name }}-{{ song.al.name }}</div>
        </template>
      </van-cell>
    </div>

  {{ simis }}
  </div>
</template>

        
<script>
/* eslint-disable */
import service from '@/request/index.js'
import Vue from 'vue';
import { mapState } from "vuex";



export default {
  name: 'artist',
  components: {
  },
  data() {
    return {
      infors: [],
      songs: [],
      simis:[],
    }

  },

  mounted() {
    this.getartist();
    this.getSongs();
    // this.simiArtist();未登录
  },
  updated() {
  },

  methods: {
    getartist() {
      // 获取歌手的图片、名字、简介
      service({
        method: 'get',
        url: '/artist/detail',
        params: {
          id: this.$route.query.id,
          limit: 1,
        }
      }).then((response) => {
        console.log(response.data);
        this.infors = response.data.data;
      })
        .catch(function (error) {
          console.log(error);
        });
    },
    getSongs() {
      // 获取歌手的全部歌曲
      service({
        method: 'get',
        url: '/artist/songs',
        params: {
          id: this.$route.query.id,
          // limit:1,
        }
      }).then((response) => {
        console.log(response.data);
        this.songs = response.data.songs;
      })
        .catch(function (error) {
          console.log(error);
        });
    },
    simiArtist() {
      // 获取相似歌手
      service({
        method: 'get',
        url: '/simi/artist',
        params: {
          id: this.$route.query.id,
          // limit:1,
        }
      }).then((response) => {
        console.log(response.data);
        this.simis = response.data;
      })
        .catch(function (error) {
          console.log(error);
        });
    },
    newPlaylist(i) {
      this.$store.commit("newIndex", i);
      this.$store.commit("newList", this.songs);
    },
    back() {
      this.$router.back();
    },

  },
  computed: {
    playListId() {
      return this.$store.state.playListId
    },
    id() {
      return this.$store.state.playList[this.$store.state.playListIndex].id
    },
  }
}
</script>
        
<style lang="less" scoped>
.playing {
  color: #7151c7;
}

// #artist {
// }

.white-card {
  padding: 0.8em;
  margin: 0.8em;
  transform: translateY(-3em);
}

.title {
  font-size: 1.15em;
}

img {
  width: 100%;
  // opacity: 0.8;
}

.by {
  font-size: 0.9em;
  line-height: 1.5em;
  transform: translateY(-3em);

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical
}
.songs {
  // width:100%;
height:40em;
overflow: scroll;
line-height:2em;
}
</style>