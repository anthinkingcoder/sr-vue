<style>
  .layout {
    /*background: #f5f7f9;*/
    background: #f3f5f7;
  }

  .layout-logo {
    height: 40px;
    margin-top: 5px;
    margin-left: 15px;
    float: left;
  }
  .layout-search {
    float: left;
    width: 300px;
    margin-left: 40px;
  }

  .layout-assistant {
    margin: 0px auto;
    height: inherit;
    float: right;

  }
  .layout-avatar {
    float: right;
    margin-right: 60px;
    margin-left: 30px;
    margin-top: 15px;
  }


  .layout-nav {
    height: 80px;
    margin: 0 auto;
  }
  .layout-content {
    min-height: 640px;
    overflow: hidden;
    background: #f3f5f7 ;
    border-radius: 4px;
    width: 100%;
  }
  .ivu-input {
    border: none
  }

  .layout-content-main {
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>
<template>
  <div class="layout">
    <BackTop></BackTop>
    <div class="layout-nav">

      <Affix>
        <Menu mode="horizontal" :active-name="activeNav" style="height: 60px;
    line-height: 60px;" @on-select="menuSelect">
          <div class="layout-logo">
            <img src="/static/img/java.jpg" height="50px"></Col>
          </div>
          <!--<div class="layout-search">-->
            <!--<Input v-model="search" placeholder="搜索你感兴趣的内容">-->
            <!--</Input>-->
          <!--</div>-->
          <div class="layout-avatar" v-show="isLogin">
            <Dropdown >
              <a>
                <Avatar src="/static/img/avatar1.JPG"></Avatar>
                <Icon type="arrow-down-b" size="small"></Icon>
              </a>
              <Dropdown-menu slot="list" >
                <Dropdown-item>Signed in as
                  <span>{{username}}</span></Dropdown-item>
                <Dropdown-item><Button @click="goToTestHistory" type="text">历史测试</Button></Dropdown-item>
                <Dropdown-item ><Button @click="logout" type="text">注销</Button></Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </div>

          <!--<div class="layout-sign" v-show="!isLogin">-->
          <!--<a>Sign up</a>-->
          <!--<span class="sign-span">Or</span>-->
          <!--<a>Sign in</a>-->
          <!--</div>-->
          <div class="layout-assistant">
            <MenuItem name="1">
              <Icon type="ionic"></Icon>
              <span class="layout-text">基础知识</span>
            </MenuItem>
            <MenuItem name="2">
              <Icon type="happy"></Icon>
              <span class="layout-text">进阶专题</span>
            </MenuItem>
            <MenuItem name="3">
              <Icon type="bowtie"></Icon>
              <span class="layout-text">拓展知识</span>
            </MenuItem>
            <MenuItem name="5">
              <Icon type="grid"></Icon>
              <span class="layout-text">学生作品</span>
            </MenuItem>

            <MenuItem name="7">
              <Icon type="ios-cloud-download"></Icon>
              <span class="layout-text">相关资源</span>
            </MenuItem>

            <MenuItem name="6">
              <Icon type="battery-full"></Icon>
              <span class="layout-text">在线测试</span>
            </MenuItem>
          </div>

        </Menu>
      </Affix>
    </div>

    <div class="layout-content">
      <Row>
        <Col span="24">
        <div class="layout-content-main">
          <router-view></router-view>
        </div>
        </Col>
      </Row>
    </div>
    <div class="layout-copy">
      2017 &copy; 长沙学院
    </div>
  </div>
</template>
<script>
  export default {
    created () {
      this.getUser()
      this.menuSelect(this.$route.query.mId)
    },
    data () {
      return {
        isLogin: true,
        username: '',
        name: '',
        activeNav: 1,
        nav: {
          '1': {
            mId: '1',
            path: '/knowledge',
            title: '基础知识',
            menuId: this.cryptoMenuId('基础知识' + '1')
          },
          '2': {
            mId: '2',
            path: '/topic',
            title: '进阶专题',
            menuId: this.cryptoMenuId('进阶专题' + '2')
          },
          '3': {
            mId: '3',
            path: '/expand_knowledge',
            title: '拓展知识',
            menuId: this.cryptoMenuId('进阶专题' + '3')
          },
          '5': {
            mId: '5',
            path: '/student_work',
            title: '学生作品',
            menuId: this.cryptoMenuId('学生作品' + '5')
          },
          '6': {
            mId: '6',
            path: '/question/test_select',
            title: '在线测试',
            menuId: this.cryptoMenuId('在线测试' + '6')
          },
          '7': {
            mId: '7',
            path: '/resource',
            title: '相关资源',
            menuId: this.cryptoMenuId('相关资源' + '7')
          }
        },
        search: ''
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'onMenuTitle'
    },
    methods: {
      onMenuTitle () {
//        var title = this.$route.query.title
//        if (this.cryptoMenuId(title) !== this.$route.query.menuId) {
//          console.info('error')
//        }
      },
      cryptoMenuId (name) {
        const crypto = require('crypto')
        const secret = '837769723'
        const hash = crypto.createHmac('sha256', secret)
          .update(name)
          .digest('hex')
        return hash
      },
      menuSelect (name) {
        if (!name) {
          return
        }
        this.activeNav = name
        this.$router.push({
          path: this.nav['' + name + ''].path,
          query: {
            menuId: this.nav['' + name + ''].menuId,
            mId: this.nav['' + name + ''].mId
          }
        })
        document.title = this.nav['' + name + ''].title
      },
      goToTestHistory () {
        this.$router.push({
          path: '/user/test_history'
        })
      },
      logout () {
        this.$Modal.confirm({
          title: '提示',
          content: '确认注销？',
          onOk: () => {
            this.loading = true
            this.$http.get('/api/user/logout').then(() => {
              this.loading = false
              this.$Message.success('注销成功')
              this.$router.push({
                path: '/login'
              })
            }).catch(() => {
              this.loading = false
              this.$Message.error('通讯错误，请重试')
            })
          }
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
              this.systemVisible = true
            }
          }
        }).catch(() => {
        })
      }
    }
  }
</script>
