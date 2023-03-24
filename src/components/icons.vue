<template>
        <div class="swiper" id="IconSwiper">
  <ul class="swiper-wrapper" id="icons"  >
  <li class="swiper-slide">
  <van-icon name="notes-o" size="40"/>
  <span class="text">每日推荐</span>
  </li>
  <li class="swiper-slide">
  <van-icon name="notes-o" size="40"/>
  <span class="text">私人FM</span>
  </li>
  <li class="swiper-slide" @click="GoSongGather">
  <van-icon name="notes-o" size="40"/>
  <span class="text">歌单</span>
  </li>
  <li class="swiper-slide" @click="GoRanking">
  <van-icon name="notes-o" size="40"/>
  <span class="text">排行榜</span>
  </li>
  <li class="swiper-slide">
  <van-icon name="notes-o" size="40" @click="GoartistGather"/>
  <span class="text">歌手</span>
  </li>
  </ul>
</div>
  </template>
  
  <script>
  /* eslint-disable */ 
  import Vue from 'vue';
  import { Icon } from 'vant';
  import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

  Vue.use(Icon);
  
  export default {
  name: 'icons',
  components: {
  },
  data(){
  return{
  }
  },
 mounted() {
    this.myswiper()
  },
  methods:
  {
    myswiper: function () {
      var IconSwiper = new Swiper('#IconSwiper', {
        slidesPerView : 'auto',
        grid: {
        fill: 'column',
  },
        spaceBetween:'5%',
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
      })
    },
    GoSongGather(){
        this.$router.push('/SongGather');
      },
    GoRanking(){
        this.$router.push('/ranking');
      },
      GoartistGather(){
        this.$router.push('/artistGather');
      },
  }
  }
  </script>
  
  <style scoped>
  .swiper-slide
  { 
    vertical-align: top;
    text-align: center;
    display:inline-block;
    /* border:1px solid rgb(224, 204, 255); */
    width:60px;
}

  .van-icon
  {
    width:50px;
    height:50px;
    background-color: rgb(224, 204, 255);
    background-position:center;
    border-radius: 50%;
    text-align: center;
  }
  </style>