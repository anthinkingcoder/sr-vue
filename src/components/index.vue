<style>
  .layout {
    background: #f5f7f9;
  }

  .layout-logo {
    height: 50px;
    margin-top: 15px;
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
    background: #fff;
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
      <Menu mode="horizontal" active-name="1" style="height: 80px;
    line-height: 80px;" @on-select="menuSelect">
        <div class="layout-logo">
          <img src="/static/img/java.jpg" height="50px"></Col>
        </div>
        <div class="layout-search">
          <Input v-model="search" placeholder="搜索你感兴趣的内容">
          </Input>
        </div>
        <div class="layout-avatar" v-show="isLogin">
          <Dropdown @on-click="logout">
            <a>
              <Avatar src="/static/img/avatar1.JPG"></Avatar>
              <Icon type="arrow-down-b" size="small"></Icon>
            </a>
            <Dropdown-menu slot="list">
              <Dropdown-item>Signed in as
                <span>{{username}}</span></Dropdown-item>
              <Dropdown-item>注销</Dropdown-item>
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
          <MenuItem name="4">
            <Icon type="ios-videocam"></Icon>
            <span class="layout-text">实例教程</span>
          </MenuItem>
          <MenuItem name="5">
            <Icon type="grid"></Icon>
            <span class="layout-text">学生作品</span>
          </MenuItem>

          <MenuItem name="6">
            <Icon type="battery-full"></Icon>
            <span class="layout-text">在线测试</span>
          </MenuItem>
          <MenuItem name="7">
            <Icon type="ios-cloud-download"></Icon>
            <span class="layout-text">相关资源</span>
          </MenuItem>
        </div>

      </Menu>
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
      this.menuSelect(1)
    },
    data () {
      return {
        isLogin: true,
        username: '',
        name: '',
        nav: {
          '1': {
            path: '/knowledge',
            title: '基础知识'
          },
          '2': {
            path: '/topic',
            title: '进阶专题'
          },
          '4': {
            path: '/example',
            title: '实例教程'
          },
          '5': {
            path: '/student_work',
            title: '学生作品'
          },
          '7': {
            path: '/resource',
            title: '相关资源'
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
        console.info(this.$route.query.title)
      },
      menuSelect (name) {
        this.$router.push({
          path: this.nav['' + name + ''].path,
          query: {
            title: this.nav['' + name + ''].title
          }
        })
        document.title = this.nav['' + name + ''].title
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
