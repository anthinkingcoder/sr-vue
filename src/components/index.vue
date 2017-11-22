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


  .layout-assistant {
    margin: 0px auto;
    height: inherit;
    float: right;
  }
  .layout-avatar {
    float: right;
    margin-right: 60px;
    margin-left: 30px;
    padding-top: 10px;
    vertical-align: middle;
    height: 100%;
  }


  .layout-nav {
    height: 64px;
    margin: 0 auto;
  }
  .layout-content {
    min-height: 640px;
    overflow: hidden;
    background: #f3f5f7 ;
    border-radius: 4px;
    width: 100%;
  }

  input {
    outline:none;
  }

  .layout-content-main {
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-search {
    float: left;
    width: 300px;
    margin-left: 40px;
    border-bottom: 1px solid #dddee1;
    vertical-align: middle;
    height: 48px;

  }
  .search-input {
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    color: #495060;
    border-radius: 4px;
    border: none;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
    display: inline-block;
    outline:none;
    position: relative;
    cursor: text;
  }
  .ivu-input {
  }
</style>
<template>
  <div class="layout">
    <BackTop></BackTop>
    <div class="layout-nav">
      <Affix>
        <Menu mode="horizontal" :active-name="activeNav" style="height: 64px;
    line-height: 60px;" @on-select="menuSelect">
          <div class="layout-logo">
            <a  @click="goToIndex">
              <img src="/static/img/java.jpg" height="50px"></Col>
            </a>
          </div>
          <div class="layout-search">
              <Row>
                <Col span="21">
                 <input v-model="search" placeholder="搜索你感兴趣的内容"  v-on:keyup.enter="goToSearch" class="search-input" />
                </Col>
                <Col span="2">
                  <Button @click="goToSearch" type="text"><Icon type="ios-search"></Icon></Button>
                </Col>
              </Row>
          </div>
          <div class="layout-avatar" v-show="isLogin">
            <Dropdown >
              <a>
                <Avatar :src="headImg ? headImg : '/static/img/avatar1.JPG'"></Avatar>
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
            <MenuItem :name="index" v-for="(item,index) in navs" :key="item.title" v-if="item.menu">
              <Icon :type="item.type"></Icon>
              <span class="layout-text">{{item.title}}</span>
            </MenuItem>
          </div>
        </Menu>
      </Affix>
    </div>

    <div class="layout-content">
      <Row>
        <Col span="24">
        <div class="layout-content-main">
          <router-view @words="onWordsChange"></router-view>
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
      this.search = this.$route.query.words
      if (this.$route.path === '/') {
        this.menuSelect(0)
      } else {
        this.navs.forEach((item, index) => {
          if (this.$route.path === item.path) {
            this.menuSelect(index)
          }
        })
      }
    },
    data () {
      return {
        isLogin: true,
        username: '',
        headImg: '',
        name: '',
        activeNav: 0,
        navs: [
          {
            path: '/knowledge',
            title: '基础知识',
            type: 'ionic',
            menu: true
          },
          {
            path: '/topic',
            title: '进阶专题',
            type: 'happy',
            menu: true
          },
          {
            path: '/expand_knowledge',
            title: '拓展知识',
            type: 'bowtie',
            menu: true
          },
          {
            path: '/student_work',
            title: '学生作品',
            type: 'grid',
            menu: true
          },
          {
            path: '/question/test_select',
            title: '在线测试',
            type: 'battery-full',
            menu: true
          },
          {
            path: '/resource',
            title: '相关资源',
            type: 'ios-cloud-download',
            menu: true
          },
          {
            path: '/user/test_history',
            title: '历史测试',
            menu: false
          },
          {
            path: '/question/test',
            title: '在线测试',
            menu: false
          },
          {
            path: '/question/evaluate_result',
            title: '在线测试',
            menu: false
          },
          {
            path: '/index',
            title: 'java学习网',
            menu: false
          }
        ],
        search: ''
      }
    },
    methods: {
      onWordsChange (words) {
        this.search = words
      },
      cryptoMenuId (name) {
        const crypto = require('crypto')
        const secret = '837769723'
        const hash = crypto.createHmac('sha256', secret)
          .update(name)
          .digest('hex')
        return hash
      },
      menuSelect (index) {
        this.activeNav = parseInt(index)
        this.search = ''
        this.$router.push({
          path: this.navs[this.activeNav].path,
          query: this.$route.query
        })
        document.title = this.navs[this.activeNav].title
      },
      goToTestHistory () {
        this.$router.push({
          path: '/user/test_history',
          query: {
          }
        })
      },
      goToIndex () {
        this.$router.push({
          path: '/index'
        })
      },
      goToSearch () {
        console.info('goToSearch')
        this.activeNav = -1
        this.$router.push({
          path: '/search',
          query: {
            words: this.search
          },
          replace: true
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
            this.username = res.data.username
            this.name = res.data.name
            this.headImg = res.data.headImg
          }
        }).catch(() => {
        })
      }
    }
  }
</script>
