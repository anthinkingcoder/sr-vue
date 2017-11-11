<template>
  <div class="layout">
    <div class="layout-content">
      <Row type="flex" justify="center">
        <Col span="5">
        <Menu ref="baseMenu" :active-name="currentKnowledgeId"  @on-select="menuSelect">
          <MenuGroup :title="title">
            <MenuItem v-if="item.resourceDocumentId" :name="item.resourceDocumentId" :key="item.resourceDocumentId" v-for="(item,index) in knowledges">
              {{item.name}}
            </MenuItem>
          </MenuGroup>
        </Menu>
        </Col>
        <Col span="19">
        <h1  v-show="visible">
          资源内容
        </h1>
        <div class="layout-content-main" v-html="resource.content">
        </div>
        <div class="layout-content-at">
          <h1 v-show="visible">
            附件下载
          </h1>
          <a :key="item.id" v-for="item in attachments" :href="item.url">
            {{item.name}}
          </a>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  export default {
    created () {
      this.listKnowledges()
    },
    data () {
      return {
        knowledges: [],
        resource: '',
        attachments: [],
        currentKnowledgeId: 0,
        visible: false,
        title: '',
        topicId: 0
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'listKnowledges'
    },
    methods: {
      menuSelect (id) {
        this.getResourceDocument(id)
        this.listAttachment(id)
        this.visible = true
      },
      listKnowledges () {
        this.title = this.$route.query.title
        if (this.title === '基础知识') {
          this.topicId = 0
        }
        this.topicId = this.$route.query.topicId
        let url = '/api/knowledge/base/all'
        if (this.topicId && this.topicId !== 0) {
          url = 'api/knowledge/topic/all'
        }
        this.$http.get(url, {
          params: {
            topicId: this.topicId
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.knowledges = res.data
            this.currentKnowledgeId = this.knowledges[0].resourceDocumentId
            this.$nextTick(() => {
              this.$refs.baseMenu.updateActiveName()
            })
            this.menuSelect(this.currentKnowledgeId)
          }
        }).catch(() => {
        })
      },
      getResourceDocument (id) {
        this.$http.get('/api/resource_document', {
          params: {
            id: id
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.resource = res.data
          }
        }).catch(() => {
        })
      },
      listAttachment (id) {
        this.$http.get('/api/attachment/module/list', {
          params: {
            moduleCategory: 1,
            moduleId: id
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
  .layout-content {
    min-height: 600px;
    overflow: hidden;
    background: #fff;
  }

  .layout-content-main {
    min-height: 400px;
    margin-left: 15px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .layout-content-at {
  }
  h1 {
    font-size: 26px;
    font-weight: 400;
    margin-left: 35px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>
