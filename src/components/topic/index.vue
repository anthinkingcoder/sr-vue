<template>
  <div style="padding: 20px;">
    <Row type="flex" justify="center">
      <Col span="4">
      <Row  type="flex" justify="center" >
          <Col span="24">
          <Card style="min-height: 200px">
            <p slot="title">
              全部专题
            </p>
            <ul class="topic-category-ul">
              <li v-for="item in topicCategories">
                <div class="border">
                      <Row>
                        <Col span="22">
                        <a @click="showTopic(item.id, item.name)">{{ item.name }}</a>
                        </Col>
                        <Col span="2">
                        <Icon type="chevron-right" color="#333"></Icon>
                        </Col>
                      </Row>
                </div>
              </li>
            </ul>
          </Card>
          </Col>
      </Row>
      </Col>
      <Col span="16"  offset="1">
      <Row  type="flex" justify="center" >
          <Col span="24" >
          <Card style="min-height: 500px">
            <p slot="title">
              {{currentTopicCateogry}}
            </p>
            <Row  type="flex" justify="start">
              <Col span="7"  v-for="item in topics" :key="item.id"   style="margin: 5px" >
              <Card>
                <div style="text-align:center" class="topic">
                  <a @click="show(item.id,item.name)">
                    <Row :gutter="16">
                      <Col span="6">
                      <Avatar :src="item.coverUrl ? item.coverUrl: '/static/img/java.jpg'" size="default"/>
                      </Col>
                      <Col span="12">
                      <div >
                        {{item.name}}
                      </div>
                      </Col>
                    </Row>
                  </a>
                </div>
              </Card>
              </Col>
            </Row>
          </Card>

        </Col>
      </Row>

      </Col>
    </Row>



  </div>
</template>

<script>
  export default {
    created () {
      this.listTopicCategory()
    },
    data () {
      return {
        topics: [],
        topicCategories: [],
        currentTopicCateogry: ''

      }
    },
    methods: {
      listTopic (categoryId, categoryName) {
        this.currentTopicCateogry = categoryName
        this.$http.get('/api/topic', {
          params: {
            categoryId: categoryId
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.topics = res.data
          }
        }).catch(() => {
        })
      },
      show (id, title) {
        this.$router.push({
          path: '/knowledge',
          query: {
            topicId: id,
            title: title
          }
        })
      },
      showTopic (cateogryId, categoryName) {
        this.listTopic(cateogryId, categoryName)
      },
      listTopicCategory: function () {
        this.$http.get('/api/topic/category/list', {
          params: {
          }
        }).then((response) => {
          this.loading = false
          let result = response.data
          let data = result.data
          if (result.code === 666) {
            this.topicCategories = data
            this.listTopic(this.topicCategories[0].id, this.topicCategories[0].name)
          } else {
            this.$Message.error('服务器错误,请重试')
          }
        }).catch(() => {
          this.loading = false
          this.$Message.error('服务器错误,请重试')
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .topic {
    margin: 0 auto;
  }

  .topic a {
    color: #666;
  }
  .topic-category-ul a {
    color: #333;
    font-size: 14px;
    font-weight: 400;
  }

  .border {
    border-bottom: 1px solid #EDEDED;
    padding-top: 10px;
    padding-bottom: 10px;
  }



</style>
