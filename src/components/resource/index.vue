<template>
  <div style="background: #fff;">
    <div class="resource-layout-category">
      <Row type="flex">
        <Col span="1">
        <h3 style="margin-top: 17px">类型:</h3>
        </Col>
        <Col span="20">
        <Menu  active-name="0" mode="horizontal" @on-select="menuSelect">
          <MenuItem name="0">全部</MenuItem>
          <MenuItem name="1">电子书</MenuItem>
          <MenuItem name="3">优秀网站</MenuItem>
          <MenuItem name="2">软件资源</MenuItem>
        </Menu>
        </Col>
      </Row>
    </div>

    <div class="resource-layout-content">
      <div class="resource-layout-content-main">
        <Row>
          <Col span="4" v-for="item in resources" :key="item.id"  style="margin: 10px">
          <a>
            <Card>
              <div  style="width:200px;height: 300px">
                <div class="work-cover">
                  <img :src="item.coverUrl ? item.coverUrl: '/static/img/avatar2.jpg'" style="max-width: 200px;max-height: 180px">
                </div>
                <p class="work-title">{{item.name}}</p>
                <p class="work-summary">{{item.summary}}</p>
                <div style="float:right;margin-top: 5px">
                  <Button :href="item.url" type="success" icon="ios-cloud-download" @click="go(item.url)">
                    {{item.category === 3 ? '立即前往':'立即下载'}}
                  </Button>
                </div>
              </div>
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
        resources: [],
        loading: true,
        page: 0,
        per: 10,
        total: 0
      }
    },
    methods: {
      menuSelect (category) {
        this.category = category
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
    padding-left: 50px;
    padding-top: 50px;
  }
  .resource-layout-content {
    margin-top: 10px;
    padding-bottom: 30px;
    background: #f3f5f7;
  }
  .resource-layout-content-main {
    min-height: 600px;
    padding-left: 50px;
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

</style>
