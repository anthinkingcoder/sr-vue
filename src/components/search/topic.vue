<template>
  <div v-show="visible" style="margin-top: 30px">
    <Row>
      <Col span="24">
      <Card>
        <p slot="title">
          相关专题
        </p>
        <a slot="extra" @click="showMore" v-show="total >= per && !isMore">
          查看更多
          <Icon type="chevron-right"></Icon>
        </a>
        <div>
          <Row type="flex" justify="start">
            <Col span="7" v-for="(item,index) in topics" :key="item.id" style="margin: 5px">
            <Card>
              <div style="text-align:center" class="topic">
                <a @click="show(item.id,item.name)">
                  <Row :gutter="16">
                    <Col span="6">
                    <Avatar :src="item.coverUrl ? item.coverUrl: '/static/img/java.jpg'" size="default"/>
                    </Col>
                    <Col span="12">
                    <div v-html="names[index]">
                    </div>
                    </Col>
                  </Row>
                </a>
              </div>
            </Card>
            </Col>
          </Row>
          <div style="text-align: center;margin-top: 60px;margin-bottom: 20px" v-show="total >= per && isMore">
            <Page :total="total" :current="page" :page-size="per" @on-change="listTopic" show-elevator></Page>
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
        total: 0,
        per: 1,
        page: 0,
        words: '',
        topics: [],
        names: []
      }
    },
    methods: {
      showMore () {
        this.$emit('more', this.name)
      },
      search (words) {
        if (!words) {
          return
        }
        this.words = words
        this.listTopic(1)
      },
      listTopic (page) {
        this.page = page - 1
        this.loading = true
        this.$http.get('/api/topic/search', {
          params: {
            size: this.per,
            page: this.page,
            search: this.words
          }
        }).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.topics = res.data.content
            this.topics.forEach((item, index) => {
              this.names[index] = reg.highLightForTitle(item.name, this.words)
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
      show (id, title) {
        window.open('/knowledge?topicId=' + id + '&title=' + title)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .topic a {
    color: #666;
  }
</style>
