<template>
<div>
<span class="title">Popular Album</span>
<span class="bott" @click="GoSongGather">more</span>
    <div class="swiper" id="SlideSwiper">
    
        <div class="swiper-wrapper">
            <div class="swiper-slide" 
            v-for="(image,i) in images" :key="i" @click="GoSongSheet" >
            <img :src="image.picUrl" @click="playListId(image.id)">
            <div class="play-count">{{count(image.playCount)}}万</div>
            <div class="describe">
              {{image.name}}
              <!-- {{image.id}} -->
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
    // import axios from 'axios'
    import service from '@/request/index.js'
    
    export default {
      name: 'slide',
      components: {
      },
      data(){
      return{ images:[] }
      },
      created()
      {
this.personalized()
    },
    updated() {
                this.myswiper()
            },
      methods: {
          myswiper: function() {
          var SlideSwiper = new Swiper ('#SlideSwiper', {
        // slidesPerView : 3,  
        slidesPerView : 'auto',
        spaceBetween : 15,
          observer:true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
        })   
      },
      playListId(id){
        this.$store.commit("newListId",id);
      },
      personalized(){
        service({
        method: 'get',
        url: '/personalized',
        params: {
          limit:6,
        }
      }).then((response) => {
        console.log('!推荐歌单');
        console.log(response);
        this.images=response.data.result;
      })
        .catch(function (error) {
          console.log(error);
        });
      },
      GoSongSheet(){
        this.$router.push('/SongSheet');
      },
          GoSongGather(){
        this.$router.push('/SongGather');
      },
      count(n){
      if(n>10000)
      return parseInt(n/10000);
      },
    }
    }
        
    
    </script>
    
    <style lang="less" scoped >
.playing {
  color: #7151c7;
}
.swiper-slide {
  width:33%;
}
.title
{  display: inline-block;
}

   img{
    /* background-size: cover; */
    width:100%;
    height:auto;
    border-radius: 6px;
   }
   .describe
   {
    font-size:0.9rem;
    color:#362b54;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box; 
-webkit-box-orient:vertical;
-webkit-line-clamp:2; 
   }
    </style>
    