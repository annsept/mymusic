<template>

    <div>
      <van-nav-bar
    left-arrow @click-left="back" fixed placeholder>
      <template #title>
        <div class="title">can't login</div>
      </template>
    </van-nav-bar>

      <div class=title>请输入手机号</div>
      <input  type="text" v-model=number />
      {{number}}
      <div class="bott"  @click="sentcap()">
        发送验证码</div>
        <div class=title>请输入验证码</div>
  <input  type="text" v-model=captcha />
      <div class="bott"  @click="vericap()">验证</div>
      <div class="bott" @click="login()">登录</div>
      <div class="bott"  @click="anonimous()">游客登录</div>
    </div>
    
</template>

    <script>
    /* eslint-disable */
    import service from '@/request/index.js'
 
    export default {
      name: 'login',
      components: {
      },
      data(){
      return{ 
        number:'',
        captcha:'',
        // cookie:"NMTID=00ORWxJZl4gx8atG0yXp0pkW2pfduMAAAGG-5WN8w",
       }
      },
      created()
      {

    },
    methods:{
      sentcap(){
        service({
        method: 'get',
        url: '/captcha/sent',
        params: {
          phone:this.number,
        }
      }).then((response) => {
        console.log(this.number);
        console.log("验证码发送!");
      })
        .catch(function (error) {
          console.log(error);
        });
      },
      vericap(){
        service({
        method: 'get',
        url: '/captcha/verify',
        params: {
          phone:this.number,
          captcha:this.captcha,
        }
      }).then((response) => {
        console.log("检验回来啦");
        console.log(response);
      })
        .catch(function (error) {
          console.log(error);
        });
      },
      login(){
        service({
        method: 'get',
        url: '/login/cellphone',
        params: {
          phone:this.number,
          // cookie:this.cookie,
          captcha:this.captcha,
          // timestamp: new Date().getTime()
        }
      }).then((response) => {
        console.log("登录");
        console.log(response);
      })
        .catch(function (error) {
          console.log(error);
        });
      },
      anonimous(){
        service({
        method: 'get',
        url: '/register/anonimous',
      }).then((response) => {
        console.log(response);
        document.cookie =encodeURIComponent(response.data.cookie);
        
        // `name=${encodeURIComponent(name)}; max-age=1000;`;
        // sessionStorage.setItem("cookie", response.data.cookie)
      })
        .catch(function (error) {
          console.log(error);
        });
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
    </style>
    