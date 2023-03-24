<template>

<div>
  <span class="title">New Songs</span>
  <span class="bott" @click="newPlaylist(0)">play</span>
  <!-- <music id="music" v-bind:musicid=musicid></music> -->
<div class="swiper" id="SingSwiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide" v-for="j in [0,3,6]" :key="j" >
      <div class="asong" v-for="(image, i) in images.slice(j, j + 3)" :key="i"
      @click="newPlaylist(j+i)">
      <!-- musicid=image.id; -->
      <!-- @click="musicid=image.id"> -->
      <!-- @click="searchmusic(image.id)"> -->
        <!-- <div class="swiper-slide" v-for="(image, i) in images" :key="i">
        <div class="asing">{{i}} -->
        <div class="pic">
          <img :src="image.picUrl">
          <!-- <img :src="picUrl"> -->
        </div>
        <div class="song-infor">
        <div class="song-name" :class="{playing:image.id==id}">{{image.name}}</div>
        <div class="by">-{{ image.song.artists[0].name }}</div>
        <!-- <hr> -->
      </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
/* eslint-disable */
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import service from '@/request/index.js'

export default {
  name: 'sing',
  components: {
  },
  data() {
    return { images: [],
      music:[],
}
  },
  computed:{
  picUrl(){
    return this.$store.state.playList[this.$store.state.playListIndex].picUrl}
  },
  created() {

      service({
        method: 'get',
        url: '/personalized/newsong',
        params: {
        }
      }).then((response) => {
        console.log(response);
        this.images = response.data.result;
      })
        .catch(function (error) {
          console.log(error);
        });

        
    },


  updated() {
    this.myswiper()
  },
  methods: {
    myswiper: function () {
      var SingSwiper = new Swiper('#SingSwiper', {
        slidesPerView : 'auto',
        grid: {
        fill: 'column',
  },
        spaceBetween:'5%',
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper

      })
    },
    newPlaylist(i){

      this.$store.commit("newIndex",i);
      this.$store.commit("newList",this.images);
    }
  },
  computed: {

    id() {
      return this.$store.state.playList[this.$store.state.playListIndex].id
    },
  }
}


</script>
    
<style lang="less" scoped>

.swiper-wrapper {
  height: auto;
}

.swiper {
  width: auto;
}
.swiper-slide {
  width: 82%;
}

.asong {
  margin: 2% 0;
  text-align: left;

  &:hover {
    background-color: white;
    border-radius: 8px;
  }

  .song-infor {
    display: inline-block;
    vertical-align: middle;
    margin: 1rem;
    width: 66%;
    white-space: nowrap;
    // background-color: #554580;
    .song-name {
    font-size: 1.15em;
    font-weight: bold;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #554580;
  }
  .playing {
    color: #7151c7;
}
  .by {
    /* color: gray; */
    font-size: 0.9em;
  }
  }
}

.pic {
  display: inline-block;
  width: 20%;
  vertical-align: middle;
}

img {
  width: 100%;
  height: auto;
  vertical-align: sub;
  border-radius: 6%;
}
</style>
    