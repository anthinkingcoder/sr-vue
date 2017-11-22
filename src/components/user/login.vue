<template>

  <div class="login">
    <Modal
      v-model="visible"
      :footerHide="true"
      :mask-closable="false"
      :closable="false"
      width="480"
    >
     <div style="text-align: center">
       <Avatar src="/static/img/java.jpg" size="large" />
     </div>
      <Input v-model="username" placeholder="用户名" style="width: 400px;margin-top:20px;margin-left: 23px" size="large" @on-enter="login">
      </Input>
      <Input type="password" v-model="password" placeholder="密码"
                        style="margin-top: 20px;width: 400px;margin-left: 23px" size="large" @on-enter="login">
      </Input>
      <Button class="loginBtn" type="primary" :loading="loading" shape="circle" size="large" @click="login"
              style="width: 400px;height: 48px;margin-top: 30px;margin-left: 23px;background-color: #495060;border-color:#495060 ">
        <span v-if="!loading">登录</span>
      </Button>
      <div class="register">
        <a href="/register">已有账号,马上注册</a>
      </div>
    </Modal>

  </div>
</template>

<script>
  import qs from 'qs'
  export default{
    created () {
      this.getUser()
    },
    data () {
      return {
        username: '',
        password: '',
        loading: false,
        visible: true
      }
    },
    methods: {
      login () {
        if (!this.username || !this.password) {
          this.$Message.error('请输入账号和密码')
          return
        }
        this.loading = true
        this.$http.post('/api/login', qs.stringify({
          password: this.password,
          username: this.username
        })).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.$router.push({
              path: '/'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$Message.error('登陆失败，请稍候再试')
        })
      },
      getUser () {
        this.$http.get('/api/user/info').then((response) => {
          let res = response.data
          if (res.code === 666) {
            console.info(res.data)
            this.username = res.data.username
            this.name = res.data.name
            if (res.data.level === 1) {
              this.$router.push({
                path: '/admin/main'
              })
            }
          }
        }).catch(() => {
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ivu-input-large
    font-size 14px;
    padding 6px 7px;
    height 48px;

  .ivu-avatar-large
    width 80px
    height 80px
    line-height 30px
    border-radius 40px
  .login
    display flex
    flex-direction column
    justify-content center
    align-items center
    background-size cover
    height 100%
    background-image url("/static/img/background4.jpg")
  h2
    margin-top 30px
    margin-bottom 20px
    font-size 25px
    font-weight 400
    color: #323a45
  .loginBtn
    font-size 24px
    font-weight 400
    color: #ffffff
  img
      background rgba(255, 255, 255, 0)
  .register
    margin-top 15px
    text-align center
    margin-bottom 15px
    a
      font-size 16px
      color #495060



</style>
