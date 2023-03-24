<template>
  <div>
    <van-nav-bar left-arrow @click-left="back" fixed placeholder>
      <template #title>
        <div class="title">Comment</div>
      </template>
    </van-nav-bar>
    <!-- {{ comments }} -->

    <div v-for="(comment, i) in comments" :key="i">

      <img :src="comment.user.avatarUrl">
      <span class="name">{{ comment.user.nickname }}</span>

      <span class="by">{{ comment.timeStr }}</span>
      <span class="bott right">赞<span v-show="comment.likedCount>0">{{ comment.likedCount }}</span></span>

      <div class="describe">{{ comment.content }}</div>

      <span class="by" v-show="comment.showFloorComment.replyCount>0">{{ comment.showFloorComment.replyCount }}条回复</span>
      <van-divider />
    </div>


  </div>
</template>
  
<script>
/* eslint-disable */
import Vue from 'vue';
import service from '@/request/index.js'

export default {
  name: 'comment',
  components: {
  },
  // props:['id'],
  data() {
    return {
      comments: [],
    }
  },
  created() {
    this.getComment()
  },
  methods:
  {
    getComment() {
      service({
        method: 'get',
        url: '/comment/new',
        params: {
          id: this.$route.query.id,
          type: this.$route.query.type,
          //  0歌曲 1mv 2歌单
        }
      }).then((response) => {
        console.log('评论');
        console.log(response.data.data.comments);
        this.comments = response.data.data.comments;
      })
        .catch(function (error) {
          console.log(error);
        });
      this.DetailDynamic(id)
    },
    back() {
      this.$router.back();
    },
  },
  computed:
  {
    playListId() {
      return this.$store.state.playListId
    },
  }
}
</script>
  
<style scoped>
.title {
  font-size: 1.15em;
}

img {
  border-radius: 50%;
  height: 2em;
  vertical-align: middle;
}

.describe {
  margin: 1em 0;
  line-height: 1.8em;
}

.name {
  margin: 0 0.8em;
  vertical-align: middle;
}

.by {
  vertical-align: middle;
}
</style>
