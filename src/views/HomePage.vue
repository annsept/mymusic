<template>
  <div id="HomePage">
    <van-pull-refresh v-model="isLoading"  @refresh="onRefresh">

    <!-- <div class="card"> -->
<SearchBar></SearchBar>
<banner id="banner"></banner>
<icons></icons>
<slide class="card"></slide>
<!-- </div> -->
<!-- <van-divider /> -->
<sing class="card"></sing>

<!-- <music id="music"></music> -->

<!-- <router-link to="/about/oo">别点我</router-link>
<keep-alive><router-view/></keep-alive> -->
</van-pull-refresh>
</div>

</template>

<script>
/* eslint-disable */
import banner from '@/components/banner.vue'
import slide from '@/components/slide.vue'
import sing from '@/components/sing.vue'
import SearchBar from '@/components/SearchBar.vue'
import icons from '@/components/icons.vue'
import music from '@/components/music.vue'

import Vue from 'vue';
import { Divider } from 'vant';
import { PullRefresh } from 'vant';
import { Icon } from 'vant';

Vue.use(Icon);
Vue.use(PullRefresh);
Vue.use(Divider);

export default {
name: 'HomePage',
components: {
  SearchBar,
  banner,
  slide,
sing,
icons,
music,
},
data(){
return{
  isLoading: false,
}
},
created()
{
},
methods:
{
  onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
}
}
</script>

<style lang="less" >
#HomePage {
  margin-right: -4%;
// 消除父元素的padding
    .title
    {
      margin:0.6em auto;
    }
}

.card {
  padding-bottom: 4%;
  margin-bottom: 2%;
}

#banner {
  padding-right: 4%;
  margin-bottom: 1%;
}

</style>
