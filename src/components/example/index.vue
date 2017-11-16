<template>
  <div>

    <div class="example-layout-category">
      <!--<Row type="flex">-->
        <!--<Col span="1" style="text-align: center;margin-top: 15px" >-->
        <!--<span class="h-l">级别:</span>-->
        <!--</Col>-->
        <!--<Col span="20">-->
        <!--<Menu  active-name="0" mode="horizontal" @on-select="menuSelect">-->
          <!--<MenuItem name="0">全部</MenuItem>-->
          <!--<MenuItem name="1">基础</MenuItem>-->
          <!--<MenuItem name="2">进阶</MenuItem>-->
        <!--</Menu>-->
        <!--</Col>-->
      <!--</Row>-->
      <!--<Row type="flex" v-show="topicCategoryVisible">-->
        <!--<Col span="1" style="text-align: center;margin-top: 15px">-->
        <!--<span class="h-l"  >专题:</span>-->
        <!--</Col>-->
        <!--<Col span="20">-->
        <!--<Menu  active-name="0" mode="horizontal" @on-select="topicCategorySelect">-->
          <!--<MenuItem name="0">全部</MenuItem>-->
          <!--<MenuItem v-for="item in topicCategories" :key="item.name" :name="item.id">{{item.name}}</MenuItem>-->
        <!--</Menu>-->
        <!--</Col>-->
      <!--</Row>-->
      <!--<Row>-->
        <!--<Col span="21">-->

        <!--<div class="resource-layout-sort">-->
          <!--<RadioGroup v-model="sort" type="button">-->
            <!--<Radio label="最难"></Radio>-->
            <!--<Radio label="最易"></Radio>-->
          <!--</RadioGroup>-->
        <!--</div>-->
        <!--</Col>-->
      <!--</Row>-->
    </div>
    <div class="example-layout-content">
      <div class="example-layout-content-main">
        <Button icon="ios-arrow-back" type="primary" @click="hideExampleDetail" v-show="backVisible">返回</Button>
        <div v-show="exampleListVisible">
          <Row >
            <Col span="4"  style="margin-top: 10px;margin-right: 10px" v-for="item in examples" :key="item.id">
            <a @click="showExampleDetail(item.id)">
              <Card style="width:300px">
                <p slot="title">
                  {{item.title}}
                </p>

                <p style="text-align: right">
                  <Rate v-model="item.level" disabled>
                  </Rate>
                </p>
              </Card>
            </a>
            </Col>
          </Row >
        </div>
        <ExampleDetail ref="exampleDetail"></ExampleDetail>
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
  import ExampleDetail from './detail.vue'
  export default {
    components: {
      ExampleDetail
    },
    created () {
    },
    data () {
      return {
        examples: 0,
        resources: [],
        loading: false,
        topicCategories: [],
        topicCategoryVisible: false,
        category: 0,
        knowledgeId: 0,
        exampleListVisible: true,
        backVisible: false
      }
    },
    methods: {
      topicCategorySelect (topicCategoryId) {
        console.info(topicCategoryId)
      },
      menuSelect (category) {
        if (category === '2') {
          this.topicCategoryVisible = true
        } else {
          this.topicCategoryVisible = false
        }
      },
      loadData (knowledgeId, isLoad) {
        if (isLoad) {
          this.loading = true
          this.knowledgeId = knowledgeId
          this.hideExampleDetail()
          this.listExample()
        }
      },
      show (id) {
        this.$router.push({
          path: '/resource/detail',
          query: {
            id: id
          }
        })
      },
      listExample () {
        this.loading = true
        this.$http.get('/api/example/list', {
          params: {
            knowledgeId: this.knowledgeId
          }
        }).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.examples = res.data
          }
        }).catch(() => {
        })
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
      },
      showExampleDetail (id) {
        this.backVisible = true
        this.$refs.exampleDetail.loadData(id)
        this.exampleListVisible = false
      },
      hideExampleDetail () {
        this.backVisible = false
        this.$refs.exampleDetail.initData()
        this.exampleListVisible = true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .resource-layout-sort {
    padding-top: 20px;
  }
  .example-layout-category {
    background: #fff;
  }
  .example-layout-content {
  }
  .example-layout-content-main {
    min-height: 600px;
  }

  h3 {
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

  .h-l {
    width: 52px;
    height: 20px;
    line-height: 30px;
    font-weight: 700;
    font-size: 14px;
    color: #07111b;
    padding-top: 30px;
    text-align: center;
  }

</style>
