<template>
    <div id="MinePage">
      <van-nav-bar
    left-arrow @click-left="back" fixed placeholder>
      <template #title>
        <div class="title">Personal</div>
      </template>
    </van-nav-bar>
    <div class="oneem"></div>

    <div class="detail" v-if="!show">
  <div class=title>请输入id</div>
  <input type="text" v-model="uid"/>
  <div class="bott"  @click="show=true">确认</div>
</div>

<div class="detail" v-if="show">

<div class="icon">
<img :src="details.profile.avatarUrl">
</div>
<table>
  <tr>
    <td ><span class="bott">name</span></td>
    <td class="title">{{ details.profile.nickname}}</td>
  </tr>
  <tr>
    <td><span class="bott">sign</span></td>
    <td class="by">{{ details.profile.signature }}</td>
  </tr>
  <tr>
    <td ><span class="bott">gender</span></td>
    <td class="by">{{ gender[details.profile.gender] }}</td>
  </tr>
</table>
<div class="blocks">
<div class="ablock">
<div class="by">关注</div>
<div class="title">{{ details.profile.followeds }}</div>
</div>
<div class="ablock">
  <div class="by">粉丝</div>
<div class="title">{{ details.profile.follows }}</div>
</div>
<div class="ablock">
  <div class="by">听歌</div>
<div class="title">{{ details.listenSongs }}</div>
</div>
<div class="ablock">
  <div class="by">天数</div>
<div class="title">{{ details.createDays }}</div>
</div>

<!-- </div> -->
<!-- 时间{{ details.profile.createTime}} -->

<!-- {{ details.bindings[0].userId }}
{{ details.bindings[0].id }} -->
<!-- {{ details.createTime }} -->
<!-- birthday{{ details.profile.birthday}} -->
</div>


<div class="white-card" @click="playListId(lists[0].id);GoSongSheet()">
<img :src="lists[0].coverImgUrl ">
<div class="info">
<div class="title" >Favourate Music</div>
<span class="by">共{{ lists[0].trackCount }}首</span>
</div>
</div>

<div class="white-card" v-for="(list) in lists.slice(1)" :key="list.id"
@click="playListId(list.id);GoSongSheet()">
<img :src="list.coverImgUrl ">
<div class="info">
<div class="title" >{{ list.name }}</div>
<span class="by">共{{ list.trackCount }}首</span>
</div>
</div>

</div>

    </div>
  </template>
  
  <script>
import service from '@/request/index.js'
  
  export default {
  name: 'MinePage',
  components: {

  },
  data(){
  return{
    details:[],
    lists:[],
    lists2:[],
    gender:['？','男','女'],
    uid:'',
    show:false,
  }
  },
  created()
  {
  },
  watch:{
    show(val)
    {
      this.UserDetail();
    this.UserList();}
  },
  methods:
  {
    // 用户播放记录 user/record?uid=8420352921
    UserDetail() {
      service({
        method: 'get',
        url: '/user/detail',
        params:{
          uid:this.uid,
        }
      }).then((response) => {
        console.log('用户详情',response.data);
        this.details = response.data;
      })
        .catch(function (error) {
          alert(error);
          console.log("UserDetail出错啦"+error);
        });
    },
    UserList() {
      service({
        method: 'get',
        url: '/user/playlist',
        params:{
          uid:this.uid,
        }
      }).then((response) => {
        console.log('用户歌单',response.data);
        this.lists = response.data.playlist;
        this.lists2 = response.data.playlist[1];
      })
        .catch(function (error) {
          console.log("UserList出错啦"+error);
        });
    },

    playListId(id) {
      this.$store.commit("newListId", id);
    },
    GoSongSheet(){
        this.$router.push('/SongSheet');
      },
      back(){
      this.$router.back();
    },
  }
  }
  </script>
  
  <style lang="less" scoped>
.title {
  font-size: 1.15em;
}
#MinePage
{
  background-color:#fbf7ff;
  height:100%;
  width:100%;
}
.icon{
  img{
    width:40%;
    border-radius: 50%;
    display:block;
    margin:0 auto;
  }
}

  .white-card{
    margin-top:1.5em;
    border:0px;
    padding:0.7em;
    img{
    width:20%;
    vertical-align: middle;
    border-radius: 6px;
  }
  }
.info
{
  display:inline-block;
  vertical-align: middle;
  margin-left:1em;
}

.blocks{
  margin: 1em 0;
  width:100%;
  height:5em;
  display: grid;
  grid-gap: 1em;
  grid-template-columns:1fr 1fr 1fr 1fr;
.ablock{
  border-radius: 8px;
  background-color: white;
padding-top:1em;
text-align: center;
&:active
{
  background-color: #fbf7ff;
}
}
.title{
  text-align: center;
}
}
table
{
  margin: 1em 0;
  td
  {
    text-align: left;
    height:2em;
    width:50%;
    // border: 1px solid red;
  }
  .bott{
    width:3em;
  }
}
  </style>