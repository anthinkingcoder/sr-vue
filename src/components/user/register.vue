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
      <Input v-model="name" placeholder="姓名" style="width: 400px;margin-left: 23px" size="large">
      </Input>
      <Input v-model="username" placeholder="用户名" style="width: 400px;margin-top:20px;margin-left: 23px" size="large">
      </Input>
      <Input type="password" v-model="password" placeholder="密码"
                        style="margin-top: 20px;width: 400px;margin-left: 23px" size="large">
      </Input>
      <Input type="password" v-model="repeatPassword" placeholder="确认密码"
             style="margin-top: 20px;width: 400px;margin-left: 22px" size="large">
      </Input>
      <div style="margin-top: 20px;padding-left: 5px">
          <Row type="flex" justify="center">
            <Col span="4"  v-for="(item,index) in headImgs" :key="item.src">
            <div class="register-avatar-select">
              <Button :type="item.select?'dashed':'text'" @click="headImgSelect(index)">
                <Avatar  :src="item.src" size="default"></Avatar>
              </Button>
            </div>
            </Col>
          </Row>
      </div>

      <Button class="loginBtn" type="primary" :loading="loading" shape="circle" size="large" @click="register"
              style="width: 400px;height: 48px;margin-top: 30px;margin-left: 23px;background-color: #495060;border-color:#495060">
        <span v-if="!loading">注册</span>
      </Button>
      <div class="register">
        <a href="/login">已有账号,马上登录</a>
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
        repeatPassword: '',
        name: '',
        loading: false,
        visible: true,
        headImg: '/static/img/avatar1.png',
        headImgs: [
          {
            src: '/static/img/avatar1.png',
            select: true
          },
          {
            src: '/static/img/avatar2.png',
            select: false
          },
          {
            src: '/static/img/avatar3.png',
            select: false
          },
          {
            src: '/static/img/avatar4.png',
            select: false
          }
        ]
      }
    },
    methods: {
      headImgSelect (index) {
        this.headImg = this.headImgs[index].src
        this.headImgs.forEach((item, i) => {
          if (i === index) {
            item.select = true
          } else {
            item.select = false
          }
        })
      },
      register () {
        if (!this.username || !this.password || !this.name || !this.repeatPassword) {
          this.$Message.error('请输入账号和密码')
          return
        }
        if (this.password !== this.repeatPassword) {
          this.$Message.error('两次输入的密码不一致')
          return
        }
        this.loading = true
        this.$http.post('/api/user/register', qs.stringify({
          password: this.password,
          username: this.username,
          name: this.name,
          headImg: this.headImg
        })).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.$Message.success('注册成功')
            this.$router.push({
              path: '/login'
            })
          } else {
            this.$Message.error('用户名已经被注册')
          }
        }).catch(() => {
          this.loading = false
          this.$Message.error('注册失败，请稍候再试')
        })
      }
    }
  }
</script>

<style>
  .register-avatar-select img{
    max-height: 100%;
    max-width: 100%;
    display: inline-block;
  }
  .register-avatar-select {
    width: 80px;
    padding: 2px;
  }
</style>
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
    width 100%
    a
      font-size 16px
      color #495060



</style>
