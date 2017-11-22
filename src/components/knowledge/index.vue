<template>
  <div class="layout">
    <div class="layout-content">
      <Row type="flex" justify="center">
        <Col span="5">
        <Affix :offset-top="50">
        <Menu :active-name="currentKnowledgeIndex"  @on-select="menuSelect" ref="knowledgeMenu">
          <MenuGroup :title="title">
            <MenuItem  v-for="(item,index) in knowledges" :name="index" :key="item.name" >
              {{item.name}}
            </MenuItem>
          </MenuGroup>
        </Menu>
        </Affix>
        </Col>
        <Col span="19">
          <div style="padding-top: 10px">
            <Tabs type="card" :animated="false" @on-click="tabClick" :value="tabName">
              <TabPane label="资源文档" name="0">
                <h1  v-show="visible">
                  资源内容
                </h1>
                <div class="layout-content-main" v-html="resource.content">
                </div>
                <div class="layout-content-at">
                  <h1 v-show="visible">
                    附件下载
                  </h1>
                  <div style="margin: 35px;">
                    <a :key="item.id" v-for="item in attachments" :href="item.url">
                      {{item.name}}
                    </a>
                  </div>
                </div>
              </TabPane>
              <TabPane label="实例教程" name="1">
                <Example ref="example"></Example>
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import Example from '../example/index.vue'
  export default {
    created () {
      this.listKnowledges()
    },
    components: {
      Example
    },
    data () {
      return {
        currentKnowledgeIndex: 0,
        knowledges: [],
        resource: '',
        attachments: [],
        visible: false,
        title: 'Basic',
        topicId: 0,
        tabName: '0'
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'listKnowledges'
    },
    methods: {
      menuSelect (index) {
        this.currentKnowledgeIndex = parseInt(index)
        console.info(this.currentKnowledgeIndex)
        this.getResourceDocument(this.knowledges[this.currentKnowledgeIndex].resourceDocumentId)
        this.listAttachment(this.knowledges[this.currentKnowledgeIndex].id)
        this.visible = true
        this.tabClick(1, true)
      },
      findTopic (topicId) {
        this.$http.get('/api/topic/findOne', {
          params: {
            topicId: topicId
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.title = res.data.name
          }
        }).catch(() => {
        })
      },
      listKnowledges () {
        this.topicId = this.$route.query.topicId
        let url = '/api/knowledge/base/all'
        if (this.topicId && this.topicId !== 0) {
          url = 'api/knowledge/topic/all'
          this.findTopic(this.topicId)
        }
        this.$http.get(url, {
          params: {
            topicId: this.topicId
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.knowledges = res.data
            if (this.$route.query.kId) {
              this.knowledges.forEach((item, i) => {
                if (item.id === parseInt(this.$route.query.kId)) {
                  this.currentKnowledgeIndex = i
                }
              })
            } else {
              this.currentKnowledgeIndex = 0
            }
            this.$nextTick(function () {
              this.$refs.knowledgeMenu.updateOpened()
              this.$refs.knowledgeMenu.updateActiveName()
            })
            this.menuSelect(this.currentKnowledgeIndex)
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
          } else {
            this.$Message.error('服务器错误')
          }
        }).catch(() => {
          this.$Message.error('服务器错误')
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
      },
      tabClick (name, isLoad) {
        if (name === 1) {
          this.$refs.example.loadData(this.knowledges[this.currentKnowledgeIndex].id, isLoad)
        }
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
