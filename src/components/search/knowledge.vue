<template>
  <div v-show="visible">
    <Row>
      <Col span="24">
      <Card>
        <p slot="title">
          相关基础
        </p>
        <a slot="extra" @click="showMore" v-show="total >= per && !isMore">
          查看更多
          <Icon type="chevron-right"></Icon>
        </a>
        <div>
          <Row type="flex" justify="start">
            <Col span="7" v-for="item in knowledges" :key="item.id" style="margin: 5px">
            <Card>
              <div style="text-align:center" class="topic">
                <a @click="show(item.id)">
                  <Row :gutter="16">
                    <Col span="6">
                    <Avatar :src="item.coverUrl ? item.coverUrl: '/static/img/knowledge.jpg'" size="default"/>
                    </Col>
                    <Col span="12">
                    <div v-html="item.name">
                    </div>
                    </Col>
                  </Row>
                </a>
              </div>
            </Card>
            </Col>
          </Row>
          <div style="text-align: center;margin-top: 60px;margin-bottom: 20px" v-show="total >= per && isMore">
            <Page :total="total" :current="page" :page-size="per" @on-change="listKnowledge" show-elevator></Page>
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
        knowledges: [
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
        this.listKnowledge(1)
      },
      listKnowledge (page) {
        this.page = page - 1
        this.loading = true
        this.$http.get('/api/knowledge/base/search', {
          params: {
            size: this.per,
            page: this.page,
            search: this.words
          }
        }).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.knowledges = res.data.content
            this.knowledges.forEach((item) => {
              item.name = reg.highLightForTitle(item.name, this.words)
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
      show (id) {
        window.open('/knowledge?kId=' + id)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
