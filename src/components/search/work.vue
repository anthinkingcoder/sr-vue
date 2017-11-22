<template>
  <div v-show="visible" style="margin-top: 30px">
    <Row>
      <Col span="24">
      <Card>
        <p slot="title">
          相关作品
        </p>
        <a slot="extra"  @click="showMore" v-show="total >= per && !isMore">
          查看更多
          <Icon type="chevron-right"></Icon>
        </a>
        <div>
          <Row>
            <Col span="6" v-for="item in studentWorks" :key="item.id">
            <a @click="show(item.id)">
              <Card>
                <div>
                  <div class="work-cover">
                    <img :src="item.coverUrl ? item.coverUrl: '/static/img/avatar2.jpg'" style="max-width: 100%">
                  </div>
                  <p class="work-title"  v-html="item.title"></p>
                  <div>
                    <Icon type="ios-person-outline" color="#93999f"></Icon>
                    <span class="work-summary" >{{item.author}}</span>
                  </div>
                  <p class="work-summary">{{item.summary}}</p>
                </div>
              </Card>
            </a>
            </Col>
          </Row>
          <div style="text-align: center;margin-top: 60px;margin-bottom: 20px" v-show="total >= per && isMore">
            <Page :total="total" :current="page" :page-size="per" @on-change="listWork" show-elevator></Page>
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
        type: Boolean,
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
        per: 10,
        page: 0,
        words: '',
        studentWorks: [
          {
            id: 1,
            title: 'java从入门到进阶',
            author: '刘德华',
            summary: '你懂的资源'
          }
        ]
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
        this.listWork(1)
      },
      show (id) {
        window.open('student_work/detail?id=' + id)
      },
      listWork (page) {
        this.page = page - 1
        this.loading = true
        this.$http.get('/api/student_work/search', {
          params: {
            size: this.per,
            page: this.page,
            search: this.words
          }
        }).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.studentWorks = res.data.content
            this.studentWorks.forEach((item) => {
              item.title = reg.highLightForTitle(item.title, this.words)
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
  .work-cover {
    max-height: 200px;
  }
</style>
