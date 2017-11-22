<template>
  <div style="background: #fff;">
    <div class="resource-layout-category">
      <Row type="flex">
        <Col span="1">
        <h3 style="margin-top: 17px">类型:</h3>
        </Col>
        <Col span="20">
        <ul class="answer-sheet-num">
          <li v-for="(category,index) in categories" :key="category.name">
            <Button :type="category.active ? 'primary' : 'text'" @click="menuSelect(index)">{{category.name}}</Button>
          </li>
        </ul>
        <!--<Menu  active-name="0" mode="horizontal" @on-select="menuSelect">-->
          <!--<MenuItem name="0">全部</MenuItem>-->
          <!--<MenuItem name="1">电子书</MenuItem>-->
          <!--<MenuItem name="3">优秀网站</MenuItem>-->
          <!--<MenuItem name="2">软件资源</MenuItem>-->
        <!--</Menu>-->
        </Col>
      </Row>
    </div>

    <div class="resource-layout-content">
      <div class="resource-layout-content-main">
        <Row>
          <Col span="4" v-for="item in resources" :key="item.id"  style="margin: 20px">
          <a>
            <Card>
              <Row type="flex" justify="end">
                <Col span="24">
                <img :src="item.coverUrl ? item.coverUrl: '/static/img/avatar2.jpg'" style="max-width: 100%;max-height: 100px">
                </Col>
                <Col span="24" style="margin-top: 5px">
                <p class="work-title">{{item.name}}</p>
                </Col>
                <Col span="24" style="margin-top: 5px">
                <p class="work-summary">{{item.summary}}</p>
                </Col>
                <Col span="12" style="margin-top: 5px">
                <Button type="success" icon="ios-cloud-download" @click="go(item.url)">
                  {{item.category === 3 ? '立即前往':'立即下载'}}
                </Button>
                </Col>
              </Row>
            </Card>
          </a>
          </Col>
        </Row>
      </div>
      <div class="layout-page">
        <Page :total="total" :current="page" :page-size="per" @on-change="listResource"></Page>
      </div>
      <Modal v-model="loading" width="200" :closable="false" :footerHide="true" :mask-closable="false">
        <Spin size="large">
          <Icon type="load-c" :size="36" class="spin-icon-load"></Icon>
          <div style="margin-top: 10px">加载中</div>
        </Spin>
      </Modal>
    </div>

  </div>
</template>

<script>
  export default {
    created () {
      this.listResource(1)
    },
    data () {
      return {
        category: 0,
        categories: [
          {
            id: 0,
            name: '全部',
            active: true
          },
          {
            id: 1,
            name: '电子书',
            active: false
          },
          {
            id: 3,
            name: '优秀网站',
            active: false
          },
          {
            id: 2,
            name: '软件资源',
            active: false
          }
        ],
        resources: [],
        loading: true,
        page: 0,
        per: 10,
        total: 0
      }
    },
    methods: {
      menuSelect (index) {
        this.category = this.categories[index].id
        this.categories.forEach((item) => {
          item.active = false
        })
        this.categories[index].active = true
        this.listResource(1)
      },
      show (id) {
        this.$router.push({
          path: '/resource/detail',
          query: {
            id: id
          }
        })
      },
      listResource (page) {
        this.page = page - 1
        this.loading = true
        this.$http.get('/api/resource', {
          params: {
            category: this.category,
            size: this.per,
            page: this.page
          }
        }).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.resources = res.data.content
            this.total = res.data.totalElements
            this.page = res.data.number + 1
          }
        }).catch(() => {
        })
      },
      go (url) {
        window.open(url, '_blank')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .resource-layout-category {
    background: #fff;
    padding-top: 50px;
    padding-left: 100px;
  }
  .resource-layout-content {
    margin-top: 10px;
    padding-bottom: 30px;
    background: #f3f5f7;
  }
  .resource-layout-content-main {
    min-height: 600px;
    padding-left: 100px;
    padding-top: 50px;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
  }


  .layout-page {
    text-align: center;
  }

  .work-summary {
    color: #93999f;
    font-weight: 200;
    max-height: 48px;
    height: 48px;
    overflow: hidden;
    font-size: 12px;
    transition: .3s all linear;
  }

  .work-title {
    font-size: 16px;
    line-height: 24px;
    font-weight: 200;
    max-height: 48px;
    transition: .3s all linear;
    word-break: break-all;
    word-wrap: break-word;
    overflow: hidden;
    display: -webkit-box;
    padding-top: 5px;
    color: #14191e;
    width:60em;
    white-space:nowrap;
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
  }
  .work-cover {
    max-height: 200px;
    width: 200px
  }

  .answer-sheet-num {
    display: block;
    margin-top: 15px;
  }

  .answer-sheet-num li {
    float: left;
    margin-right: 10px;
  }
  .answer-sheet-num a {
    display: block;
    color: #dce4ec;
    font-size: 16px;
    width: 40px;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

</style>
