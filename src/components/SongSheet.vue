<template>
  <div id="SongSheet">
    <van-nav-bar left-arrow @click-left="back" fixed placeholder>
      <template #title>
        <div class="title">PlayList</div>
      </template>
    </van-nav-bar>

    <!-- 歌单id{{playListId }} -->
    <div id="infor">
      <div class="pic">
        <img :src="detail.coverImgUrl">
        <div class="play-count">{{ count(detail.playCount) }}</div>
      </div>
      <div class="r-infor">
        <div class="title"> {{ detail.name }}</div>
        <span class="bott" v-for="(tag, i) in detail.tags" :key="i">
          {{ tag }}</span>
        <div>
          <img class="profile" :src="detail.creator.avatarUrl">
          <span class="nickname">{{ detail.creator.nickname }}</span>
        </div>
      </div>
    </div>
    <div class="describe">{{ detail.description }}</div>
    <div class="dynamic">
      <div class="bott">分享{{ DynamicDetail.shareCount }}</div>
      <div class="bott" @click="GoSongcomment()">评论{{ DynamicDetail.commentCount }}</div>
      <div class="bott" :class="{ red: DynamicDetail.subscribed == false }" @click="subscribe()">
        订阅{{ DynamicDetail.bookedCount }}
      </div>
    </div>

    <div class="white-card">
      <div class="title" @click="newPlaylist(0)">Play All {{ detail.trackCount }}</div>
      <van-cell center class="asong" v-for="(song, i) in detail.tracks" :key="i" @click="newPlaylist(i)">

        <!-- <template #icon>
          <span class="number">{{ i+1 }}</span>
        </template> -->
        <template #right-icon>
          <span class="number">{{ i + 1 }}</span>
        </template>
        <!-- <span class="number">{{ i+1 }}</span> -->
        <template #title>
          <div class="name" :class="{ playing: song.id == id }">
            {{ song.name }}</div>
        </template>
        <template #label>
          <div>{{ song.ar[0].name }}-{{ song.al.name }}</div>
        </template>
      </van-cell>
    </div>

  </div>
</template>
        
<script>
/* eslint-disable */
import Vue from 'vue';
import service from '@/request/index.js'
import { Cell, CellGroup } from 'vant';
Vue.use(Cell);
Vue.use(CellGroup);

export default {
  name: 'SongSheet',
  components: {
  },
  data() {
    return {
      songs: [],
      detail: [],
      DynamicDetail: [],
    }
  },

  mounted() {
    this.SheetDetail(this.playListId)
    // this.trackall(this.playListId)
    console.log("我要找歌单" + this.playListId)
  },

  methods: {
    SheetDetail(id) {
      service({
        method: 'get',
        url: '/playlist/detail',
        params: {
          id: id,
        }
      }).then((response) => {
        console.log('##歌单');
        console.log(response);
        this.detail = response.data.playlist;
      })
        .catch(function (error) {
          console.log(error);
        });
      this.DetailDynamic(id)
    },
    DetailDynamic(id) {
      // SheetDetail里调用的
      service({
        method: 'get',
        url: '/playlist/detail/dynamic',
        params: {
          id: id,
        }
      }).then((response) => {
        console.log(response);
        this.DynamicDetail = response.data;
      })
        .catch(function (error) {
          console.log(error);
        });
    },
    newPlaylist(i) {
      this.$store.commit("newIndex", i);
      this.$store.commit("newList", this.detail.tracks);
    },
    subscribe() {
      // 调用订阅接口
      this.DynamicDetail.subscribed = !this.DynamicDetail.subscribed;
    },
    back() {
      this.$router.back();
    },
    GoSongcomment() {
      this.$router.push
        ({
          path: '/comment',
          query: { type: 2, id: this.playListId }
        })
    },
    count(n) {
      if (n > 100000) { return parseInt(n / 100000) + '万'; }
      else { return n }
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

#SongSheet {
  // padding: 0 4%;

  .title {
    font-size: 1.1em;
    margin-bottom: 3%;
  }
}

.dynamic {
  .bott {
    border-radius: 5px;
    width: 25%;
    margin: auto 5px;
    text-align: center;
  }
}

.red {
  color: #fbf7ff;
  background-color: #7151c7;
}

#infor {
  height: 120px;

  .pic {
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 30%;

    img {
      width: 100%;
      border-radius: 8px;
    }
  }

  .r-infor {
    display: inline-block;
    vertical-align: top;

    width: 65%;
    height: 100%;
    margin-left: 5%;

    .profile {
      border-radius: 50%;
      height: 1.5em;
      vertical-align: middle;
      margin-right: 2%;
    }

    .nickname {
      font-size: 0.9rem;
      color: #b1a8c6;
      vertical-align: middle;
    }

    .bott {
      font-size: 0.8em;
      border-radius: 1px;
      margin: 0 0;
      margin-bottom: 3%;
      // padding:0.2em 0.5em;
    }
  }
}

.describe {
  font-size: 0.9rem;
  color: #b1a8c6;
  overflow: hidden;
  text-overflow: clip;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  margin-bottom: 2%;
}</style>