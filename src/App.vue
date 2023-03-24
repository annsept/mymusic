<template>
  <div id="app">
    <!-- v-touch:right="back" -->
    <transition name="van-slide-left">
      <keep-alive include="HomePage"><router-view/></keep-alive> 
</transition>
<music id="music"></music>
    <!-- <keep-alive><router-view/></keep-alive>  -->
    <div class="fivepx"></div>
  </div>
</template>

<script>
/* eslint-disable */
import HomePage from './views/HomePage.vue'
import music from '@/components/music.vue'


export default {
  name: 'app',
  components: {
    HomePage,
    music,
  },
  data() {
    return { images: [] }
  },
  methods:{
    back(){
      this.$router.back();
    },
},
mounted(){
  console.log(this.$store.state.name)
  console.log(this.$store.state.playList[0].picUrl)
}
}
</script>

<style lang="less">
@white-purple: #fbf7ff; //背景颜色 浅紫
@deep-purple: #362b54; //深色小字 深紫
@gray-purple: #b1a8c6; //描述小字 灰紫 
@gray-purple2: #ede7f7; //按钮底色 灰紫
@purple: #735eac; //标题颜色 紫
@light-purple: #7151c7; //高亮紫

html
{
  height:100%;
  background-color: @white-purple;
}
#app {
  padding: 0 4%;
  color: @deep-purple;
  // width: 100%;
  /* background-image: linear-gradient(red, yellow); */
}

#music {
  margin-left:-4%;
  position: fixed;
  width: 100%;
  bottom: 2px;
  z-index: 10;
  // margin: 0 auto;
  
  // border:5px solid white;
  // background-color:#fbf7ff;
  // border-radius: 1em;
}

.bott {
  display: inline-block;
  font-size: 0.9em;
  color: @purple;
  background-color: @gray-purple2;
  border-radius: 10px;
  padding: 0.2em 0.5em;
  margin: 0 0.5em;
  text-align: center;

  &:active {
    color: @white-purple;
    background-color: @purple;
  }
}

.title {
  font-size: 1.25em;
  font-weight: bold;
  text-align: left;
  color: @purple;

  &:hover {
    color: @light-purple;
  }
}

img {
  object-fit: cover;
  opacity: 0.9;

  &:hover {
    opacity: 1;
  }
}

.white-card {
  background-color: white;
  margin: 1em 0;
  padding: 1em 1em;
  border-radius: 8px;
  user-select: none;
  border:@purple 2px solid;


  .asong {
    padding: 0.4em 0;

    &:hover {
      background-color: #ede7f7;
    }
  }

  .number {
    display: inline-block;
    text-align: center;
    width: 1.5em;
    height: 1.5em;
    color: #735eac;
    background-color: #ede7f7;
    border-radius: 50%;
    margin-right: 0.8em
  }

  .name {
    color: #362b54;
  }
}

.by {
  color: @gray-purple;
}

.play-count {
  font-size: 0.8rem;
  font-weight: bold;
  position: absolute;
  top: 0;
  right: 0;
  color: #fbf7ff;
}

.playing {
  color: @light-purple;
  font-weight: bold;
}

.right {
  float: right;
  margin-left:auto;
  text-align: right;
}
.fivepx {
  height: 100px;
}
.oneem {
  height: 1em;
}
</style> 