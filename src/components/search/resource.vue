<template>
  <div v-show="visible" style="margin-top: 30px">
    <Row>
      <Col span="24">
      <Card>
        <p slot="title">
          相关资源
        </p>
        <a slot="extra" @click="showMore" v-show="total >= per && !isMore">
          查看更多
          <Icon type="chevron-right"></Icon>
        </a>
        <div>
          <Row type="flex" justify="start">
              <Col span="6" v-for="item in resources" :key="item.id"  :gutter="16" >
              <a>
                <Card style="height: 300px;margin: 10px">
                    <Row type="flex" justify="end">
                      <Col span="24">
                      <img :src="item.coverUrl ? item.coverUrl: '/static/img/avatar2.jpg'" style="max-width: 100%;max-height: 150px">
                      </Col>
                      <Col span="24" style="margin-top: 5px">
                        <p class="work-title" v-html="item.name"></p>
                      </Col>
                      <Col span="24" style="margin-top: 5px">
                      <p class="work-summary" v-html="item.summary"></p>
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
          <div style="text-align: center;margin-top: 60px;margin-bottom: 20px" v-show="total >= per && isMore">
            <Page :total="total" :current="page" :page-size="per" @on-change="listResource" show-elevator></Page>
          </div>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import reg from '../util/reg'
  export default {
    created () {
      this.words = this.$route.query.words
      this.search(this.words)
    },
    props: {
      visible: {
        default: true
      },
      name: {
        default: -1
      },
      isMore: {
        default: false
      }
    },
    data () {
      return {
        words: '',
        total: 0,
        page: 0,
        per: 10,
        resources: [
          {
            id: 1,
            name: 'java从入门到进阶',
            summary: '你懂的资源'
          }
        ]
      }
    },
    methods: {
      showMore () {
        console.info('showMore', this.name)
        this.$emit('more', this.name)
      },
      search (words) {
        if (!words) {
          return
        }
        this.words = words
        this.listResource(1)
      },
      listResource (page) {
        this.page = page - 1
        this.loading = true
        this.$http.get('/api/resource/search', {
          params: {
            size: this.per,
            page: this.page,
            search: this.words
          }
        }).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.resources = res.data.content
            this.resources.forEach((item) => {
              item.name = reg.highLightForTitle(item.name, this.words)
              item.summary = reg.highLightForSummary(item.summary, this.words)
            })
            this.total = res.data.totalElements
            this.page = res.data.number + 1
            if (this.total <= 0) {
              this.$emit('navVisible', this.name)
            }
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
<style scoped>
  .work-summary {
    color: #93999f;
    font-weight: 200;
    max-height: 48px;
    line-height: 24px;
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
  }
</style>
