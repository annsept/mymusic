<template>
  <div id="MusicPlay" >
    <div class="fivepx"></div>
    <div class="head">
   <div  class="title">{{name}}</div>
   <div class="by">{{arname}}</div>
  </div>
  
    <div class="main" >
      <div @click="ShowLyric" v-show="!isLyric">
        <img :src="picUrl" :class="{ rotate: isplay }">
      </div>
        <div class="lyric" @click="ShowLyric" v-show="isLyric">
          <div v-for="(row, i) in MusicLyric" :key="i" :class="{ playing: row.time < currTime && currTime<row.next}">
            {{ row.lyric }}
          </div>
        </div>
    </div>

    <div class="bott" @click="GoSongcomment()">评论</div>
    <div class="bott" @click.stop="looptype++">
      <div v-show="looptype == 1">单曲循环</div>
      <div v-show="looptype == 2">列表循环</div>
    </div>
    <div class="bott" @click="SubPlayListIndex()">-</div>
    <div class="bott" @click="Play()">Play</div>
    <div class="bott" @click="AddPlayListIndex()">+</div>
    <div class="bott" @click="ShowPlayList()">=</div>
    <br/><br/>

   <!-- 进度条 progress -->
   <div class="by">{{ tranTime(currTime) }}</div>
    <div id="progress">
    <van-slider v-model="currT" bar-height="4px" active-color="#735eac" inactive-color="#ede7f7" button-size="10"
    @change="cupdTime()" :min="0" :max="duration" />
    <!-- <template #button>
    <div class="custom-button">{{ value }}</div>
    </template>
    </van-slider> -->
  </div>
  <div class="by">{{ tranTime(duration) }}</div>
  
  </div>
</template>
        
    <script>
        /* eslint-disable */
    import Vue from 'vue';
    import service from '@/request/index.js'
    import { Slider } from 'vant';
    import { Sticky } from 'vant';
     Vue.use(Slider);
     Vue.use(Sticky);

    export default {
      name: 'MusicPlay',
      components: {
      },
      props:['isplay','duration','currTime','updTime'],
      data() {
        return {
          MusicLyric:[],
          isLyric:false,
          currT:this.currTime,
          looptype:1,
      // 1单曲循环 2列表循环
        }
      },
        watch: {
      id(val) {
        this.searchlyric(this.id)
    },
    currTime(val){
      this.currT=this.currTime;
    },
    looptype(val){
      if (this.looptype>2) {this.looptype=1}
      this.updLoopType();
  },
  },
      created(){
        this.searchlyric(this.id)
      },
      mounted() {
  },
      methods: {
    searchlyric(id) {
      service({
        method: 'get',
        url: '/lyric',
        params: {
          id:id,
        }
      }).then((response) => {
        console.log('歌词：');
        console.log(response.data.lrc);
        // this.MusicLyric = response.data.lrc.lyric;
        this.cut(response.data.lrc.lyric);
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
    Play(){
this.$parent.$parent.Play();
// 使用music组件的方法play(musicplay在music的van-popup里)
},
ShowPlayList(){
  this.$parent.$parent.ShowPlayList();
},
ShowLyric(){
  this.isLyric=!this.isLyric;
},
GoSongcomment() {
  this.$parent.$parent.GoSongcomment();
    },
cut(lyric)
{
  lyric=lyric.split('\n');
  let haha=[];
for (let i = 0; i < lyric.length; i++) {
    // lrcData[i] = lyric[i].split(']')[0].substring(1);
    // [00:01.01]我是歌词
    var lrcData = lyric[i].split(']'); //[00:01.01
    var lrcTime = lrcData[0].substring(1).split(':'); //00:01.01->00，01.01
    var obj = {
        time: +lrcTime[0]*60+ +lrcTime[1],
        lyric: lrcData[1],
    }
    haha.push(obj)
}
for (let i = 0; i < lyric.length-1; i++) {
 haha[i].next=haha[i+1].time;
}
this.MusicLyric=haha;
},
tranTime(t){
let m=parseInt(t/60);
let s=parseInt(t%60);
if(s<10) s='0'+s;
return m+':'+s;
},
cupdTime()
{
  // this.$parent.$parent.updTime(this.currT);
  this.updTime(this.currT);
},
updLoopType(){
  console.log(this.looptype);
this.$emit('getlooptype',this.looptype);
}
      },
      computed:{

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
    }

},
    }
    </script>

    <style lang="less" scoped>
    #MusicPlay {
  // padding: 0 4%;
  position: absolute;
  background-color:#fbf7ff;
  height:100%;
  width:100%;
  /* background-image: linear-gradient(red, yellow); */
  .title
  {
  text-align: center;
  margin:0 auto;
  padding-bottom:0.4em;
  }
}
.main
{
  height:50%;
  width:100%;
  margin:2em 0;
  // background-color: antiquewhite;
}
    img {
  width: 50%;
  border-radius: 50%;
  margin:0 auto;
  display:block;
  border: solid 10px white;
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
.lyric
{
width:100%;
height:100%;
overflow: scroll;
line-height:2em;
// color:#b1a8c6;
// background-color: white;
}
.lyric::-webkit-scrollbar {
  /* 滚动条不显示 */
  display: none;
}
.playing
{
  display: inline-block;
  transform: scale(1.15);
  background-color: #735eac;
  color:#fbf7ff;
  line-height:1.5em;
  padding:0 1em;
  border-radius: 0.5em;
}
#progress{
  display: inline-block;
  width:70%;
  margin:0 auto;
  padding:0 4%;
  vertical-align: middle;
}
.bott{
  display: inline-block;
  margin: 0.2em;
}
.by{
  display: inline-block;
  vertical-align: middle;
  font-size:0.8em;
}
    </style>