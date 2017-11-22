<template>
  <div class="student-work-detail-content">
    <Row  type="flex" justify="center">
      <Col span="18">
      <Row :gutter="16">
        <Col span="24">
        <Card :bordered="false" :dis-hover="true">
          <p slot="title">
            标题
          </p>
          <p>
            {{studentWork.title}}
          </p>
        </Card>
        </Col>
      </Row>
      </Col>
    </Row>

    <Row  type="flex" justify="center">
      <Col span="18">
      <Row :gutter="16">
        <Col span="24">
        <Card :bordered="false" :dis-hover="true">
          <p slot="title">
            作者
          </p>
          <p>
            {{studentWork.author}}
          </p>
        </Card>
        </Col>
      </Row>
      </Col>
    </Row>
    <Row  type="flex" justify="center">
      <Col span="18">
      <Row :gutter="16">
        <Col span="24">
        <Card :bordered="false" :dis-hover="true">
          <p slot="title">
            分类
          </p>
          <p v-if="studentWork.category === 1">
           课程设计
          </p>
          <p v-else-if="studentWork.category === 3">
            大赛作品
          </p>
          <p v-else>
            项目实训
          </p>
        </Card>
        </Col>
      </Row>
      </Col>
    </Row>

    <Row  type="flex" justify="center">
      <Col span="18">
            <Row :gutter="16">
              <Col span="24">
              <Card :bordered="false" :dis-hover="true">
                <p slot="title">
                  内容介绍
                </p>
                <p>
                  {{studentWork.summary}}
                </p>
              </Card>
              </Col>
            </Row>
      </Col>
    </Row>
    <Row  type="flex" justify="center" >
      <Col span="18">
      <Row :gutter="16">
        <Col span="24">
        <Card :bordered="false" :dis-hover="true">
          <p slot="title">
            效果展示
          </p>
          <div v-html="studentWork.content">
          </div>
        </Card>
        </Col>
      </Row>
      </Col>
    </Row>

    <Row  type="flex" justify="center">
      <Col span="18">
      <Row :gutter="16">
        <Col span="24">
        <Card :bordered="false" :dis-hover="true">
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
</template>

<script>
  export default {
    created () {
      this.loadData()
    },
    data () {
      return {
        studentWork: '',
        attachments: []
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'loadData'
    },
    methods: {
      loadData () {
        this.getStudentWork()
        this.listAttachment()
      },
      getStudentWork () {
        this.$http.get('/api/student_work/detail', {
          params: {
            id: this.$route.query.id
          }
        }).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.studentWork = res.data
          }
        }).catch(() => {
        })
      },
      listAttachment () {
        this.$http.get('/api/attachment/module/list', {
          params: {
            moduleCategory: 3,
            moduleId: this.$route.query.id
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.attachments = res.data
          }
        }).catch(() => {
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .student-work-detail-content {
      padding: 30px;
    }
</style>
