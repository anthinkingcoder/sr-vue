<template>
  <div class="user-test-history-layout-main">
    <Row type="flex" justify="center">
      <Col span="16">
          <Row>
              <Col span="24">
                  <Card>
                    <p slot="title">
                      练习的试卷({{this.total}})
                    </p>
                    <p slot="extra">
                          <Checkbox  v-model="isShowFinished"  @on-change="listTestRecord">只看已完成的</Checkbox>
                    </p>
                    <div>
                      <Row  :gutter="16">
                        <Col span="8" v-for="item in testRecords" style="margin-top: 15px" :key="item.id">
                          <Card style="height: 250px" >
                             <a @click="go(item.id,item.status)">
                               <p class="paper-title">Java专项练习</p>
                               <div  :class="{'special-paper':item.status === 1,'nofinish-paper':item.status === 0}"class="special-paper paper-type ">{{item.status === 1 ? '已完成' : '未完成'}}</div>
                               <ul class="paper-result">
                                 <li>
                                   <Row>
                                      <Col span="4">
                                     <Icon type="android-calendar" size="18"></Icon>
                                     </Col>
                                     <Col>
                                     <span v-if="item.status === 1">完成时间 {{new Date(item.endTime) |moment("YYYY-MM-DD HH:mm")}}</span>
                                     <span v-else>完成时间 未完成</span>
                                     </Col>
                                  </Row>
                                 </li>
                                 <li>
                                   <Row>
                                     <Col span="4">
                                     <Icon type="clipboard" size="18"></Icon>
                                     </Col>
                                     <Col>
                                     <span v-if="item.status === 1">得分 {{item.score}}</span>
                                     <span v-else>未完成</span>
                                     </Col>
                                   </Row>
                                    </li>
                               </ul>
                             </a>
                          </Card>
                        </Col>
                      </Row>
                      <div class="user-test-history-layout-page" v-show="pageVisible">
                        <Page :total="total" :current="page" :page-size="per" @on-change="listTestRecord"></Page>
                      </div>
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
      this.listTestRecord(1)
    },
    data () {
      return {
        isShowFinished: true,
        testRecords: [],
        total: 0,
        page: 0,
        per: 10,
        pageVisible: true
      }
    },
    methods: {
      listTestRecord (page) {
        this.page = page - 1
        this.loading = true
        let status = null
        if (this.isShowFinished === true) {
          status = 1
        }
        this.$http.get('/api/test/record/list', {
          params: {
            status: status
          }
        }).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.testRecords = res.data.content
            this.total = res.data.totalElements
            this.page = res.data.number + 1
            if (this.total <= this.per) {
              this.pageVisible = false
            }
          }
        }).catch(() => {
        })
      },
      go (id, status) {
        if (status === 1) {
          this.$router.push({
            path: '/question/evaluate_result',
            query: {
              testRecordId: id
            }
          })
        } else {
          this.$router.push({
            path: '/question/test',
            query: {
              testRecordId: id
            }
          })
        }
        console.info(id, status)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .user-test-history-layout-main {
    padding: 35px;
  }

  .user-test-history-layout-page {
    text-align: center;
    margin-top: 30px;
  }
  .paper-title {
    height: 50px;
    overflow: hidden;
    padding: 0 25px;
    text-align: center;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.8;
  }
  a {
    color: #333;
  }



  .special-paper {
    background: #19be6b;
  }

  .nofinish-paper {
    background: #b8b8b8;
  }

  .paper-type {
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    margin-bottom: 8px;
  }
  .paper-result {
    font-size: 12px;
    padding: 5px;
    line-height: 30px;
    font-weight: 400;
  }
</style>
