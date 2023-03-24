<template>
<div id="music">
  <!-- 歌词页 抽屉 -->
<div id="musicbody" @click="showPopup">
<audio ref="audio" :src="MusicUrl" type="audio/mpeg" :loop="isloop()" 
@ended="PlayEnd()"  @timeupdate="getcurTime()" @durationchange="getduration()">
  <!-- ！！！！！！！！！！！！！！！播放！！！！！！！！！！！！！ -->
</audio>

<img :src="picUrl" :class="{rotate:isplay}">
<div class="name">{{name}}<span class="by"> - {{arname}}</span>
</div>
<!-- <div class="icon"><img src="../.././public/next-purple.png"></div> -->
  <div class="bott" @click.stop="Play()">P</div>
  <div class="bott" @click.stop="ShowPlayList()">=</div>
</div>

<!-- 播放列表 抽屉-->
<van-popup class="white-card" v-model="showlist"
  closeable
  position="bottom"
  :style="{ height: '50%',width:'66%'}">

  <div class="title">Current List </div>
    <div v-for="(image, i) in $store.state.playList" :key="i"
    :class="{playing:$store.state.playListIndex==i}"
    @click="UpdateListIndex(i)"> 
      <div class="number">{{i+1}}</div>
    <!-- <div v-if="$store.state.playListIndex==i" style="color:red"> -->
      {{$store.state.playList[i].name}}
    <!-- </div> -->
  </div>
</van-popup>

<van-popup v-model="show"
  closeable
  position="bottom"
  :style="{ height: '100%'}"
  >
  <div class="LineFeed">
    <!-- linefeed是换行 -->
   <MusicPlay :isplay="isplay" :duration="duration" :currTime="currTime" 
   :updTime="updTime" @getlooptype="getlooptype"></MusicPlay>
  </div>
</van-popup>

</div>

</template>
    
<script>
/* eslint-disable */
import MusicPlay from '@/components/MusicPlay.vue'
import service from '@/request/index.js'
import Vue from 'vue';
import { Popup } from 'vant';
import { Cell, CellGroup } from 'vant';
import {mapState} from "vuex";

Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Popup);


export default {
  name: 'music',
  components: {
    MusicPlay,
  },
  data() {
    return {
      show: false,
      showlist:false,
      MusicUrl:'',
      MusicLyric:[],
      isplay:false,
      looptype:1,
      // 1单曲循环 2列表循环
      currTime:0,
      duration:0,
    }
    
  },
  watch: {
      id(val) {
        this.searchmusic(this.id);
        setTimeout(()=>{this.Play();},2000);
        // setTimeout("this.Play",2000);
    },
},
mounted() {
  console.log("refs")
    console.log(this.$refs)
    // this.$refs.audio.src=this.MusicUrl;
  },
  updated(){
  },
  // beforeDestroy(){
  //   sessionStorage.setItem("key",); 
  // },
  methods: {
    showPopup() {
      this.show = true; 
    },
    ShowPlayList(){
      this.showlist = true; 
    },
    searchmusic(id) {
      console.log("歌曲id");
      console.log(id);
      service({
        method: 'get',
        url: '/song/url',
        params: {
          id:id,
        }
      }).then((response) => {
        console.log('music--searchmusic:');
        console.log(response.data.data[0]);
        this.music=response.data;
        this.MusicUrl = response.data.data[0].url;
      })
        .catch(function (error) {
          console.log(error);
        });
    },
    AddPlayListIndex(){
      this.$store.state.playListIndex++;
    },
    SubPlayListIndex(){
      this.$store.state.playListIndex--;
    },
    UpdateListIndex(i){
      this.$store.state.playListIndex=i;
    },
    Play(){
    // console.log(this.$refs.audio.currentTime)
    if(this.$refs.audio.paused==true)
    {this.$refs.audio.play();
      // window.setInterval(()=>{this.updTime();},5000);
  }//播放
    else
    {this.$refs.audio.pause();}//停止
    this.isplay=!this.$refs.audio.paused;
    // clearInterval()
    },
    PlayEnd()
    {
      if(this.looptype==2)
      {this.AddPlayListIndex();}
    },
    isloop()
    {
      if(this.looptype==1)
     {return 'loop';}
      // if(this.looptype==1)
    },
    getcurTime(){
    this.currTime=this.$refs.audio.currentTime;
   //好像会触发loop判断
      },
    getduration(){
      this.duration=this.$refs.audio.duration;
    } ,
    updTime(t)
    {
      this.$refs.audio.currentTime=t;
    },
    GoSongcomment() {
      this.$router.push
      ({ path: '/comment',
       query: {type:0,id:this.id}
      })
      this.show=false;
    },
    getlooptype(value){
      console.info(value);
      this.looptype=value;
    },
},
computed:{
  // ...mapState(["playlist","playListIndex"]),
  

  List(){
    return this.$store.state.playList;
  },
  I(){
    return this.$store.state.playListIndex;
  },
id()
{
return this.List[this.I].id;
},
  // id(){
  //   return this.$store.state.playList[this.$store.state.playListIndex].id},
    name(){
    return this.List[this.I].name},
    picUrl(){
    return this.List[this.I].picUrl?this.List[this.I].picUrl:this.List[this.I].al.picUrl},
    arname(){
 return (this.List[this.I].song?this.List[this.I].song.artists[0].name:this.List[this.I].ar[0].name)
  },
}
}
</script>
    
<style lang="less" scoped>

#musicbody{
  display: absolute;
  height:66px;
  background-color:#fbf7ff;
  border: 2px solid #735eac;
  border-radius: 1em;
  vertical-align:middle;


  img{
  display:inline-block;
  object-fit:cover;
    width:15%;
    margin:auto 0;
    border-radius: 50%;
    vertical-align:middle;
  animation:rotate 4s linear infinite;
  animation-fill-mode:both;
  animation-play-state:paused;
}
.rotate
{
  animation-play-state:running;
}
@keyframes rotate {
  from {transform:rotate(0deg)}
  to {transform:rotate(360deg)}
}
.name{
  display:inline-block;
  width:55%;
  line-height: 66px;
  // background-color:red;
  vertical-align:middle;
  margin-left:1em;
  
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
}
.icon{
  display:inline-block;

  width:2em;
  height:2em;
  opacity:1;
  background-color: red;
  vertical-align: middle;
}

.LineFeed
{
  white-space: pre-line;
 text-align: center;
}
.playing {
  color: #7151c7;
}
MusicPlay{
z-index:100;
}
.white-card{
  .number {
  margin-right: 0.3em;
margin-top:1em;
  }
}
</style>