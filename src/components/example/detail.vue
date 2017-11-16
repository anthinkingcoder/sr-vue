<template>
  <div class="example-detail-content" v-show="visible">
    <Row  type="flex" justify="center">
      <Col span="18">
      <Row :gutter="16">
        <Col span="24" style="margin-top: 10px">
        <Card>
          <p slot="title">
            题目
          </p>
          <p>
            {{example.title}}
          </p>
        </Card>
        </Col>
      </Row>
      </Col>
    </Row>

    <Row  type="flex" justify="center">
      <Col span="18">
      <Row :gutter="16">
        <Col span="24" style="margin-top: 10px">
        <Card>
          <p slot="title">
            题目内容
          </p>
          <p v-html="example.content">
          </p>
        </Card>
        </Col>
      </Row>
      </Col>
    </Row>

    <Row   type="flex" justify="center">
      <Col style="text-align: right;margin-top: 20px" span="18">
      <div v-show="!resultVisible" >
        <Button type="success" shape="circle" icon="ios-search" @click="showResult">查看解析</Button>
      </div>
      </Col>
    </Row>
    <div v-show="resultVisible">
      <Row  type="flex" justify="center">
        <Col span="18" style="margin-top: 10px">
        <Row :gutter="16">
          <Col span="24">
          <Card>
            <p slot="title">
              题目解析
            </p>
            <p v-html="example.exampleExplain">
            </p>
          </Card>
          </Col>
        </Row>
        </Col>
      </Row>
      <Row  type="flex" justify="center" >
        <Col span="18">
        <Row :gutter="16">
          <Col span="24" style="margin-top: 10px">
          <Card>
            <p slot="title">
              运行结果
            </p>
            <div v-html="example.runtimeResult">
            </div>
          </Card>
          </Col>
        </Row>
        </Col>
      </Row>

      <Row  type="flex" justify="center">
        <Col span="18">
        <Row :gutter="16">
          <Col span="24" style="margin-top: 10px">
          <Card>
            <p slot="title">
              附件下载
            </p>
            <div>
              <a :key="item.id" v-for="item in attachments" :href="item.url">
                <p style="margin-top: 10px">{{item.name}}</p>
              </a>
            </div>
          </Card>
          </Col>
        </Row>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        example: '',
        exampleId: 0,
        visible: false,
        resultVisible: false,
        attachments: []
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'loadData'
    },
    methods: {
      loadData (id) {
        this.exampleId = id
        this.getExample()
        this.visible = true
      },
      initData () {
        this.visible = false
        this.resultVisible = false
      },
      getExample () {
        this.$http.get('/api/example/findOne', {
          params: {
            id: this.exampleId
          }
        }).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.example = res.data
          }
        }).catch(() => {
        })
      },
      listAttachment () {
        this.$http.get('/api/attachment/module/list', {
          params: {
            moduleCategory: 2,
            moduleId: this.exampleId
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.attachments = res.data
          }
        }).catch(() => {
        })
      },
      showResult () {
        this.resultVisible = true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .example-detail-content {
    padding: 30px;
  }
</style>
