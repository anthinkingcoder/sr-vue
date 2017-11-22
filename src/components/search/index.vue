<template>
  <div class="sr-search-layout-main">
    <div class="sr-search-layout-main-search">
      <Row type="flex" justify="center">
        <Col span="16">
          <Row type="flex" justify="center">
            <Col span="24">
            <Input  v-model="words" size="large" placeholder="请输入想搜索的内容"   @on-enter="menuSelect">
            <Button type="success" slot="append" @click="menuSelect">搜索</Button>
            </Input>
            </Col>
          </Row>
        <br>
        <Row type="flex" justify="center">
          <Col span="24">
          <ul class="hot-search-tag">
            <li>
              <a href="/search?words=java">java</a>
            </li>
            <li>
              <a href="/search?words=spring">spring</a>
            </li>
          </ul>
          </Col>
        </Row>
        </Col>
      </Row>

    </div>
    <div class="sr-search-layout-content">
      <Row type="flex" justify="center">
        <Col span="16">
          <Row type="flex" justify="center">
            <Col span="24">
            <div class="sr-search-layout-category">
              <Menu :active-name="activeNav" mode="horizontal" @on-select="menuSelect">
                <MenuItem :name="index" v-for="(item,index) in navs" :key="item.name">{{item.name}}</MenuItem>
              </Menu>
            </div>
            </Col>
          </Row>
        </Col>
        <Col span="16">
                <div class="sr-search-layout-content-main">
                  <Knowledge :visible="navs[1].visible" name="1" :isMore="navs[1].isMore" @more="menuSelect" ref="knowledge" @navVisible="navVisible"></Knowledge>
                  <Topic :visible="navs[2].visible" name="2" :isMore="navs[2].isMore" @more="menuSelect" ref="topic"  @navVisible="navVisible"></Topic>
                  <ExpandKnowledge :visible="navs[3].visible" :isMore="navs[3].isMore" name="3"  @more="menuSelect" ref="expandKnowledge"  @navVisible="navVisible"></ExpandKnowledge>
                  <Resource :visible="navs[5].visible" name="5" :isMore="navs[5].isMore" @more="menuSelect" ref="resource"  @navVisible="navVisible"></Resource>
                  <Work :visible="navs[4].visible" name="4"  :isMore="navs[4].isMore" @more="menuSelect" ref="studentWork"  @navVisible="navVisible"></Work>
                </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import ExpandKnowledge from './expand_knowledge.vue'
  import Knowledge from './knowledge.vue'
  import Topic from './topic.vue'
  import Resource from './resource.vue'
  import Work from './work.vue'
  export default {
    components: {
      ExpandKnowledge,
      Knowledge,
      Topic,
      Resource,
      Work

    },
    created () {
      this.words = this.$route.query.words
      this.menuSelect(this.activeNav)
    },
    watch: {
      '$route.query': 'wordsChange'
    },
    data () {
      return {
        words: '',
        activeNav: 0,
        isSearch: false,
        navs: [
          {
            name: '全部',
            visible: true,
            isMore: false
          },
          {
            name: '基础',
            visible: false,
            isMore: false
          },
          {
            name: '专题',
            visible: false,
            isMore: false
          },
          {
            name: '拓展',
            visible: false,
            isMore: false
          },
          {
            name: '作品',
            visible: false,
            isMore: false
          },
          {
            name: '资源',
            visible: false,
            isMore: false
          }
        ]
      }
    },
    methods: {
      wordsChange () {
        this.words = this.$route.query.words
        this.menuSelect(this.activeNav)
      },
      searchKeyUp () {
        console.info('keyup')
      },
      searchKeyDown () {
        console.info('keyDown')
      },
      refreshSearch () {
        this.$emit('words', this.words)
        history.pushState({}, '', window.location.pathname + '?' + 'words=' + this.words)
        if (!this.words) {
          this.$Message.error('查询内容不能为空')
          this.navs.forEach((item) => {
            item.visible = false
            item.isMore = false
          })
          return
        }
        if (this.activeNav === 1 || this.activeNav === 0) {
          this.$refs.knowledge.search(this.words)
        }
        if (this.activeNav === 2 || this.activeNav === 0) {
          this.$refs.topic.search(this.words)
        }
        if (this.activeNav === 3 || this.activeNav === 0) {
          this.$refs.expandKnowledge.search(this.words)
        }
        if (this.activeNav === 5 || this.activeNav === 0) {
          this.$refs.resource.search(this.words)
        }
        if (this.activeNav === 4 || this.activeNav === 0) {
          this.$refs.studentWork.search(this.words)
        }
      },
      menuSelect (index) {
        if (typeof index === 'number' || typeof index === 'string') {
          this.activeNav = parseInt(index)
        }
        this.navs.forEach((item, i) => {
          this.navs[i].visible = false
          if (this.navs[this.activeNav].name === item.name || this.activeNav === 0) {
            this.navs[i].isMore = this.activeNav !== 0
            this.navs[i].visible = true
          } else {
            this.navs[i].visible = false
            console.info(this.navs[i], item.name)
            this.navs[i].isMore = true
          }
        })
        this.refreshSearch()
      },
      navVisible (index) {
        console.info(index)
        this.navs.forEach((item, i) => {
          if (this.navs[index].name === item.name) {
            this.navs[i].visible = false
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .sr-search-layout-main {

  }

  .sr-search-layout-main-search {
    background-color: #D9DDE1;
    padding-top: 36px;
    height: 148px;
  }
  .sr-search-layout-content-main {
    padding-top: 30px;
  }

  .sr-search-layout-category {
  }

  .sr-search-layout-content {
    padding-top: 30px;

  }

  .ivu-input-group-prepend {
    padding: 4px 7px;
    font-size: inherit;
    font-weight: 400;
    line-height: 1;
    color: #495060;
    text-align: center;
    background-color: #fff;
    border-radius: 6px;
    width: 48px;
  }

  .ivu-input-group-large .ivu-input, .ivu-input-group-large > .ivu-input-group-append, .ivu-input-group-large > .ivu-input-group-prepend {
    font-size: 16px;
    padding: 6px 7px;
    height: 48px;
  }

  .ivu-input-group-append {
    padding: 4px 7px;
    font-size: inherit;
    font-weight: 400;
    line-height: 1;
    color: #fff;
    text-align: center;
    background-color: #2d8cf0;
    border-radius: 6px;
  }

  .hot-search-tag li {
    float: left;
    margin-right: 10px;
  }

  .hot-search-tag  a:link, a:visited {
    color: #14191e;
    font-size: 12px;
  }


  .border-bottom {
    border-bottom: 1px solid #EDEDED;
    padding: 15px;
  }

  .topic a {
    color: #666;
  }

  /*.ivu-input-group-append .ivu-btn {*/
  /*!* border-color: transparent; *!*/
  /*!* background-color: transparent; *!*/
  /*!* color: inherit; *!*/
  /*margin: -5px -7px;*/
  /*}*/
</style>
