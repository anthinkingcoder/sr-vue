<template>
  <div class="expand-knowledge-layout-content">
    <div style="min-height: 500px">
      <Row  type="flex" justify="center" v-for="item in expandKnowledgeList" :key="item.id">
        <Col span="12" style="margin-top: 10px">
        <Row :gutter="16">
          <Col span="24">
          <a>
            <Card >
              <p slot="title">
                python里使用正则表达式的后向搜索肯定模式
                {{item.title}}
              </p>
              <p slot="extra">
                <a :href="item.url" target="_blank">原文</a>
              </p>
              <p class="ek-summary">
                {{item.summary}}
              </p>
            </Card>
          </a>
          </Col>
        </Row>
        </Col>
      </Row>
    </div>

    <div style="text-align: center;margin-top: 30px">
      <Page :total="total" :current="page" :page-size="per" @on-change="listExpandKnowledge"></Page>
    </div>

    <Modal v-model="loading" width="200" :closable="false" :footerHide="true" :mask-closable="false">
      <Spin size="large">
        <Icon type="load-c" :size="36" class="spin-icon-load"></Icon>
        <div style="margin-top: 10px">加载中</div>
      </Spin>
    </Modal>
  </div>
</template>

<script>
  export default {
    created () {
      this.listExpandKnowledge(1)
    },
    data () {
      return {
        expandKnowledgeList: [],
        loading: true,
        page: 0,
        per: 10,
        total: 0
      }
    },
    methods: {
      listExpandKnowledge (page) {
        this.loading = true
        this.$http.get('/api/expand_knowledge/list', {
          params: {
            size: this.per,
            page: this.page
          }
        }).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.expandKnowledgeList = res.data.content
            this.total = res.data.totalElements
            this.page = res.data.number + 1
          }
        }).catch(() => {
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .expand-knowledge-layout-content {
    padding: 30px;
  }
  .ek-summary {
    color: #93999f;
    font-weight: 200;
    max-height: 48px;
    line-height: 24px;
    overflow: hidden;
    font-size: 12px;
    transition: .3s all linear;
  }
</style>
