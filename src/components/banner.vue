<template>
  <div id="banner">
    <div class="swiper" id="BannerSwiper">

      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(image, i) in images" :key="i">
          <a :href="image.url">
            <img :src="image.pic"></a>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
    
    <script>
    import service from '@/request/index.js'
    import Vue from 'vue';
    /* eslint-disable */
    import Swiper from 'swiper/bundle';
    import 'swiper/swiper-bundle.css';
    import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
    
    export default {
      name: 'HomeView',
      components: {
      },
      data(){
      return{ images:[] }
      },
      created()
      {
        service({
        method: 'get',
        url: '/banner',
        params: {
          type:1,
        }
      }).then((response) => {
        console.log(response);
        this.images=response.data.banners;
      })
        .catch(function (error) {
          console.log(error);
        });

    },
    updated() {
                this.myswiper()
            },
      methods: {
                myswiper: function() {
          var BannerSwiper = new Swiper ('#BannerSwiper', {
          spaceBetween : 20,
          loop:true, // 循环
          slidesPerView : '1',
          // effect: 'coverflow',
          observer:true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          autoplay: {
          disableOnInteraction: false,//用户点击后自动播放不停止
          },
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            grabCursor : true,
            clickable :true,
          },
          
        })   
      },
    }
    }
        
    
    </script>
    
<style scoped>
#BannerSwiper {
  border-radius: 9px;
}

img {
  width: 100%;
  border-radius: 9px;
  opacity: 0.9;
}

img:hover {
  opacity: 1;
}

.swiper {
  --swiper-pagination-color: #fbf7ff;
  /* 两种都可以 */
}

.swiper-pagination {
  opacity: 0.5;
}
</style>
    