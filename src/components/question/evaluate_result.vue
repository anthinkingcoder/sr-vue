<template>
  <div class="test-evaluate-layout-main" v-show="visible">
    <Row type="flex" justify="center">
      <Col span="18">
      <Card style="background:#f9f9f9">
        <Tabs type="card" :animated="false">
          <TabPane label="评估结果" name="0">
            <div style="padding: 10px;background: #fff">
              <Row>
                <Col span="24" style="margin-bottom: 10px">
                <Icon type="pie-graph" size="23" color="#ff6547"></Icon>
                <span class="test-evaluate-score">得分: {{testRecord.score}}</span>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                <Row>
                  <Col span="5">
                  <span class="test-evaluate-result-detail">试卷： Java专项练习 </span>
                  </Col>
                  <Col>
                  <Rate :value="testRecord.level" disabled></Rate>
                  </Col>
                </Row>
                </Col>
                <Col span="24">
                <p class="test-evaluate-result-detail">正确题数：
                  {{testRecord.questionRightNum}}/{{testRecord.questionNum}}</p>
                </Col>
                <Col span="24">
                <p class="test-evaluate-result-detail">得分： {{testRecord.score}}</p>
                </Col>
                <Col span="24">
                <p class="test-evaluate-result-detail">用时： {{getTime(testRecord.endTime - testRecord.startTime)}}</p>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane label="答案解析" name="1">
            <!--题目得分模块-->
            <div class="border-bottom" style=";background: #fff">
              <Row>
                <Col>
                <p class="test-evaluate-result-detail">每题得分:</p>
                </Col>
                <Col span="24">
                <ul class="answer-sheet-num">
                  <li  v-for="(item,i) in resultPath">
                    <Button v-if="item === '1'" type="success" @click="clickQuestionCardItem(i,item)"
                            :size="index === i ? 'large' : 'default'">{{i+1}}
                    </Button>
                    <Button v-else-if="item === '2'" type="error" @click="clickQuestionCardItem(i,item)"
                            :size="index === i ? 'large' : 'default'">{{i+1}}
                    </Button>
                    <Button v-else type="dashed" @click="clickQuestionCardItem(i,item)"
                            :size="index === i ? 'large' : 'default'">{{i+1}}
                    </Button>
                  </li>
                </ul>
                </Col>
              </Row>
            </div>
            <!--题目详细模块-->
            <div class="border-bottom" style=";background: #fff">
              <Row>
                <Col span="24" class="margin-top30">
                <span class="question-title">{{this.testRecord.questionTestRecord.question.title}}</span>
                </Col>

                <Col span="24" class="margin-top30">
                <span v-html="this.testRecord.questionTestRecord.question.content"></span>
                </Col>

              </Row>
            </div>
            <div style="background: #f9f9f9">
              <Row>
                <Col span="24" class="margin-top30" style="margin-left: 20px">
                <span>正确答案: {{this.testRecord.questionTestRecord.question.answer}}  你的答案: {{!this.testRecord.questionTestRecord.answer ? '空': this.testRecord.questionTestRecord.answer}}
                 </span>
                <span
                  v-if="this.testRecord.questionTestRecord.question.answer !== this.testRecord.questionTestRecord.answer"
                  style="color: #ed3f14">(错误)</span>
                </Col>
                <Col span="24" v-if="this.testRecord.questionTestRecord.question.possibleAnswerOne">
                <div :class="{'success-answer-item':(answerAIsRight && isSingleSelect) || ( answerAIsRight && !isSingleSelect  && !isSelectAnswerA) || (answerAIsRight && !isSingleSelect && totalRight && isSelectAnswerA),
                 'error-answer-item':answerAIsError  && isSelectAnswerA,
                 'two-color-answer-item':answerAIsRight && !isSingleSelect &&  !totalRight && isSelectAnswerA}" class="result-answer-item">
                     <span>
                    {{this.testRecord.questionTestRecord.question.possibleAnswerOne}}
                  </span>
                </div>
                </Col>
                <Col span="24" v-if="this.testRecord.questionTestRecord.question.possibleAnswerTwo">
                <div  :class="{'success-answer-item':(answerBIsRight && isSingleSelect) || ( answerBIsRight && !isSingleSelect  && !isSelectAnswerB) || (answerBIsRight && !isSingleSelect && totalRight && isSelectAnswerB),
                 'error-answer-item': answerBIsError  && isSelectAnswerB,
                 'two-color-answer-item':answerBIsRight && !isSingleSelect &&  !totalRight && isSelectAnswerB}" class="result-answer-item">
                <span class="pre">
                                  {{this.testRecord.questionTestRecord.question.possibleAnswerTwo}}
                  </span>
                </div>

                </Col>
                  <Col span="24" v-if="this.testRecord.questionTestRecord.question.possibleAnswerThree">
                <div :class="{'success-answer-item':(answerCIsRight && isSingleSelect) || ( answerCIsRight && !isSingleSelect  && !isSelectAnswerC) || (answerCIsRight && !isSingleSelect && totalRight && isSelectAnswerC),
                 'error-answer-item': answerCIsError  && isSelectAnswerC,
                 'two-color-answer-item':answerCIsRight && !isSingleSelect &&  !totalRight && isSelectAnswerC}
                "class="result-answer-item">
                  <span class="pre">
                    {{this.testRecord.questionTestRecord.question.possibleAnswerThree}}
                  </span>
                </div>
                </Col>
                  <Col span="24" v-if="this.testRecord.questionTestRecord.question.possibleAnswerFour">
                <div :class="{'success-answer-item':(answerDIsRight && isSingleSelect) || ( answerDIsRight && !isSingleSelect  && !isSelectAnswerD) || (answerDIsRight && !isSingleSelect && totalRight && isSelectAnswerD),
                 'error-answer-item': answerDIsError && isSelectAnswerD,
                 'two-color-answer-item':answerDIsRight && !isSingleSelect &&  !totalRight && isSelectAnswerD}" class="result-answer-item">
                  <span class="pre">
                    {{this.testRecord.questionTestRecord.question.possibleAnswerFour}}
                  </span>
                </div>
                </Col>
                  <Col span="24"  v-if="this.testRecord.questionTestRecord.question.possibleAnswerFive">
                <div :class="{'success-answer-item':(answerEIsRight && isSingleSelect) || ( answerEIsRight && !isSingleSelect  && !isSelectAnswerE) || (answerEIsRight && !isSingleSelect && totalRight && isSelectAnswerE),
                 'error-answer-item': answerEIsError  && isSelectAnswerE,
                 'two-color-answer-item':answerEIsRight && !isSingleSelect &&  !totalRight && isSelectAnswerE}" class="result-answer-item">
                  <span class="pre">
                    {{this.testRecord.questionTestRecord.question.possibleAnswerFive}}
                  </span>
                </div>
                </Col>
                  <Col span="24" v-if="this.testRecord.questionTestRecord.question.possibleAnswerSix">
                <div :class="{'success-answer-item':(answerFIsRight && isSingleSelect) || ( answerFIsRight && !isSingleSelect  && !isSelectAnswerF) || (answerFIsRight && !isSingleSelect && totalRight && isSelectAnswerF),
                 'error-answer-item': answerFIsError  && isSelectAnswerF,
                 'two-color-answer-item':answerFIsRight && !isSingleSelect &&  !totalRight && isSelectAnswerF}" class="result-answer-item">
                  <span class="pre">
                    {{this.testRecord.questionTestRecord.question.possibleAnswerSix}}
                  </span>
                </div>
                </Col>
              </Row>
              <br>
            </div>

            <!--解析模块-->
            <div class="test-evaluate-explain" v-show="this.explains">
                <Row type="flex">
                  <Col span="18">
                  共有{{total}}条解析
                  </Col>
                  <Col span="6">
                  <Button type="success" @click="setExplainVisible" style="float: right;margin-right: 5px"  v-if="explainVisible">取消发表</Button>
                  <Button type="success"  @click="setExplainVisible" style="float: right;margin-right: 5px"  v-if="explainEditable && !explainVisible" >添加解析</Button>
                  <Button type="success"  @click="editExplain" style="float: right;margin-right: 5px"  v-if="!explainEditable" >修改解析</Button>
                  </Col>
                </Row>
                <br>
                <Row v-show="explainVisible" type="flex" justify="end">
                  <Col span="24">
                    <ueditor :value="explain" :config="config" ref="ueditor"></ueditor>
                  </Col>
                  <Col style="margin-top: 20px">
                  <Button type="success"  @click="submitExplain(0)" style="float: right">发表解析</Button>
                  </Col>
                </Row>

              <Row>
                <Col span="24" v-for="(item,i) in explains" :key="i">
                  <div class="border-bottom">
                    <Row>
                      <Col span="2">
                      <Row type="flex" jusitify="center">
                        <Col span="22">
                           <Button :type="item.agree ? 'success' : 'default'" @click="agreeExplain(i,1)">
                             <Icon type="arrow-up-b"></Icon>
                             <p>{{item.agreeNum}}</p>
                           </Button>
                        </Col>
                        <Col span="22" style="margin-top: 5px">
                        <Button type="ghost" @click="agreeExplain(i,0)">
                          <Icon type="arrow-down-b" color="#19be6b"></Icon>
                        </Button>
                        </Col>
                      </Row>
                      </Col>
                      <Col span="22">
                      <Row>
                        <Col span="24">
                          <Row>
                            <Col span="1">
                            <Avatar :src="item.userHeadImg"></Avatar>
                            </Col>
                            <Col span="6">
                            <span class="user-name" :class="{'level-color':i % 2 === 0,'level-color1':i % 2 === 1}">{{item.username}}</span>
                            </Col>
                          </Row>
                        </Col>
                        <Col span="24" v-if="(!isShowEdit && item.editable) || (!item.editable)">
                          <span v-html="item.content"></span>
                        </Col>
                        <Col span="24">
                        <Row v-if="(!isShowEdit && item.editable) || (!item.editable)">
                          <Col span="12" style="margin-top: 15px">
                          <span class="explain-time">发表于 {{item.publishTime |moment("YYYY-MM-DD HH:mm")}}</span>
                          </Col>
                          <Col span="12" style="margin-top: 15px">
                          <a class="explain-reply" @click="setReplyVisible(i)">回复({{item.comment}})</a>
                          <a class="explain-reply" v-if="item.editable" @click="removeExplain(item.questionExplainId)"  style="margin-left: 5px;margin-right: 5px">删除</a>
                          <a class="explain-reply" @click="showEdit" v-if="item.editable">修改</a>
                          </Col>
                        </Row>
                        <Row type="flex" justity="end" v-if="isShowEdit && item.editable">
                          <Col span="24" >
                          <ueditor :value=item.content :config="config" ref="ueditor1"></ueditor>
                          </Col>
                          <Col span="24" style="margin-top: 10px">
                          <Button type="success"  @click="submitExplain(item.questionExplainId,item.content)" style="float: right;margin-right: 5px">确定</Button>
                          <Button type="success" @click="showEdit" style="float: right;margin-right: 5px">取消</Button>
                          </Col>
                        </Row>
                        </Col>

                        <Col span="24">
                        <div class="explain-comment"  v-show="item.showComment">
                            <div class="border-bottom" v-for="(comment,ci) in explainComments[i].content" :key="ci">
                              <Row>
                                  <Col>
                                    <Row>
                                      <Col span="24">
                                          <span  class="level-color explain-comment-name" >{{comment.username}}:</span>
                                          <span v-if="comment.toUserId">回复</span>
                                      <span class="level-color1 explain-comment-name" v-if="comment.toUserId">{{comment.toUsername}}:</span>
                                          <span>{{comment.content}}</span>
                                      </Col>
                                    </Row>
                                    <br>
                                    <Row>
                                      <Col span="12">
                                      <span class="explain-time">发表于 {{comment.publishTime |moment("YYYY-MM-DD HH:mm")}}</span>
                                      </Col>
                                      <Col>
                                          <a class="explain-reply" @click="showReplyComment(i,ci)">回复</a>
                                      <a class="explain-reply" style="margin-right: 15px" v-if="comment.agree" @click="agreeComment(i,ci,0)">已赞({{comment.agreeNum}})</a>
                                          <a class="explain-reply" style="margin-right: 15px" @click="agreeComment(i,ci,1)" v-else>赞({{comment.agreeNum}})</a>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col span="24">
                                      <div style="text-align: right;padding: 20px" v-if="explainReplyCommentsVisible[i][ci]">
                                        <Input  v-model="explainReplyCommentInputs[i][ci]" :placeholder="'回复'+comment.username + ':'"/>
                                        <Button type="success" style="margin-top: 15px" @click="submitExplainComment(i, explainReplyCommentInputs[i][ci],comment.userId)">回复</Button>
                                      </div>
                                      </Col>
                                    </Row>

                                  </Col>
                              </Row>
                            </div>
                          <!--回复框 -->
                          <div style="text-align: right;padding: 20px">
                            <Input  v-model="explainCommentInputs[i]" placeholder="请输入你的观点"/>
                            <Button type="success" style="margin-top: 15px" @click="submitExplainComment(i, explainCommentInputs[i])">回复</Button>
                          </div>
                        </div>
                        </Col>
                      </Row>
                      </Col>
                    </Row>

                  </div>
                </Col>
              </Row>
              <br>
              <Row>
                <Col span="24">
                <div style="text-align: center"  v-show="pageVisible">
                  <Page :total="total" :current="page" :page-size="per" @on-change="listExplain"></Page>
                </div>
                </Col>
              </Row>
            </div>
          </TabPane>
        </Tabs>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import ueditor from '../../components/ueditor/ueditor.vue'
  import qs from 'qs'
  import vue from 'vue'
  export default {
    created () {
      this.getTextRecord()
    },
    components: {
      ueditor
    },
    data () {
      return {
        explain: '',
        index: 0,
        testRecord: '',
        visible: false,
        resultPath: [],
        explains: [],
        explainComments: [],
        explainCommentInputs: [],
        explainReplyCommentInputs: [],
        explainReplyCommentsVisible: [],
        total: 0,
        per: 30,
        page: 0,
        pageVisible: false,
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 320
        },
        explainVisible: false,
        replyVisible: false,
        explainEditable: false,
        isShowEdit: false
      }
    },

    computed: {
      answerAIsRight: function () {
        return this.testRecord.questionTestRecord.question.answer.indexOf('A') !== -1
      },
      isSelectAnswerA: function () {
        return this.testRecord.questionTestRecord.answer.indexOf('A') !== -1
      },
      answerAIsError: function () {
        return this.testRecord.questionTestRecord.question.answer.indexOf('A') === -1
      },
      answerBIsRight: function () {
        return this.testRecord.questionTestRecord.question.answer.indexOf('B') !== -1
      },
      isSelectAnswerB: function () {
        return this.testRecord.questionTestRecord.answer.indexOf('B') !== -1
      },
      answerBIsError: function () {
        return this.testRecord.questionTestRecord.question.answer.indexOf('B') === -1
      },
      isSelectAnswerC: function () {
        return this.testRecord.questionTestRecord.answer.indexOf('C') !== -1
      },
      answerCIsRight: function () {
        return this.testRecord.questionTestRecord.question.answer.indexOf('C') !== -1
      },
      answerCIsError: function () {
        return this.testRecord.questionTestRecord.question.answer.indexOf('C') === -1
      },
      answerDIsRight: function () {
        return this.testRecord.questionTestRecord.question.answer.indexOf('D') !== -1
      },
      isSelectAnswerD: function () {
        return this.testRecord.questionTestRecord.answer.indexOf('D') !== -1
      },
      answerDIsError: function () {
        return this.testRecord.questionTestRecord.question.answer.indexOf('D') === -1
      },
      answerEIsRight: function () {
        return this.testRecord.questionTestRecord.question.answer.indexOf('E') !== -1
      },
      isSelectAnswerE: function () {
        return this.testRecord.questionTestRecord.answer.indexOf('E') !== -1
      },
      answerEIsError: function () {
        return this.testRecord.questionTestRecord.question.answer.indexOf('E') === -1
      },
      answerFIsRight: function () {
        return this.testRecord.questionTestRecord.question.answer.indexOf('F') !== -1
      },
      isSelectAnswerF: function () {
        return this.testRecord.questionTestRecord.answer.indexOf('F') !== -1
      },
      answerFIsError: function () {
        return this.testRecord.questionTestRecord.question.answer.indexOf('F') === -1
      },
      totalRight: function () {
        return this.testRecord.questionTestRecord.answer === this.testRecord.questionTestRecord.question.answer
      },
      isSingleSelect: function () {
        return this.testRecord.questionTestRecord.question.answerCategory === 1
      }
    },
    methods: {
      agreeComment (i, ci, agree) {
        this.$http.post('/api/question/explain/comment/agree', qs.stringify({
          commentId: this.explainComments[i].content[ci].commentId,
          agree: agree}
          )
        ).then((response) => {
          let res = response.data
          if (res.code === 666) {
            if (agree === 1) {
              this.explainComments[i].content[ci].agreeNum += 1
              this.explainComments[i].content[ci].agree = true
            } else {
              this.explainComments[i].content[ci].agreeNum -= 1
              this.explainComments[i].content[ci].agree = false
            }
            vue.set(this.explainComments[i].content, ci, this.explainComments[i].content[ci])
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(() => {
          this.$Message.error('服务器错误,请重试')
        })
      },
      agreeExplain (i, agree) {
        this.$http.post('/api/question/explain/agree', qs.stringify({
          explainId: this.explains[i].questionExplainId,
          agree: agree}
          )
        ).then((response) => {
          let res = response.data
          if (res.code === 666) {
            if (agree === 1) {
              this.explains[i].agreeNum += 1
              this.explains[i].agree = true
            } else {
              this.explains[i].agreeNum -= 1
              this.explains[i].agree = false
            }
            console.info(this.explains[i].agreeNum)
            vue.set(this.explains, i, this.explains[i])
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(() => {
          this.$Message.error('服务器错误,请重试')
        })
      },
      showEdit () {
        this.isShowEdit = !this.isShowEdit
      },
      setReplyVisible (index) {
        this.explains[index].showComment = !this.explains[index].showComment
        vue.set(this.explains, index, this.explains[index])
        if (this.explainComments[index].length === 0) {
          this.listExplainComment(1, index)
        }
      },
      setExplainVisible (index) {
        this.explainVisible = !this.explainVisible
      },
      showReplyComment (i, ci) {
        vue.set(this.explainReplyCommentsVisible[i], ci, !this.explainReplyCommentsVisible[i][ci])
      },
      editExplain () {
        this.listExplain(1, 1)
      },
      canPublish () {
        this.$http.get('/api/question/explain/canPublish', {
          params: {
            questionId: this.testRecord.questionTestRecord.question.id
          }
        }).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.explainEditable = res.data
          }
        }).catch(() => {
        })
      },
      listExplain (page, editExplain) {
        this.page = page - 1
        this.loading = true
        this.$http.get('/api/question/explain/list', {
          params: {
            questionId: this.testRecord.questionTestRecord.question.id,
            editExplain: editExplain,
            page: this.page,
            size: this.size
          }
        }).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.explains = res.data.content
            if (this.explains) {
              for (let i = 0; i < this.explains.length; i++) {
                vue.set(this.explainComments, i, [])
              }
            }
            this.total = res.data.totalElements
            this.page = res.data.number + 1
            if (this.total <= this.per) {
              this.pageVisible = false
            }
          }
        }).catch(() => {
        })
      },
      listExplainComment (page, index) {
        this.loading = true
        this.$http.get('/api/question/explain/comment/list', {
          params: {
            explainId: this.explains[index].questionExplainId,
            page: page - 1,
            size: 30
          }
        }).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            vue.set(this.explainComments, index, res.data)
            if (res.data) {
              vue.set(this.explainReplyCommentInputs, index, [])
              vue.set(this.explainReplyCommentsVisible, index, [])
              for (let i = 0; i < res.data.content.length; i++) {
                vue.set(this.explainReplyCommentsVisible[index], i, false)
              }
            }
            console.info(this.explainComments[index])
          }
        }).catch(() => {
        })
      },
      submitExplainComment (index, content, toUserId) {
        this.$http.post('/api/question/explain/comment/publish', qs.stringify({
          explainId: this.explains[index].questionExplainId,
          content: content,
          toUserId: toUserId}
          )
        ).then((response) => {
          let res = response.data
          if (res.code === 666) {
            vue.set(this.explainCommentInputs, index, '')
            this.listExplainComment(1, index)
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(() => {
          this.$Message.error('服务器错误,请重试')
        })
      },
      removeExplain (explainId) {
        this.$Modal.confirm({
          title: '提示',
          content: '确认删除您的解析吗',
          onOk: () => {
            this.loading = true
            this.$http.post('/api/question/explain/delete', qs.stringify({'explainId': explainId})).then((response) => {
              let result = response.data
              let data = result.data
              if (result.code === 666) {
                this.$Message.success('删除成功')
                this.listExplain(1)
                this.canPublish()
              } else {
                this.$Message.error(data.message)
              }
            }).catch(() => {
              this.loading = false
              this.$Message.error('服务器错误,请重试')
            })
          }
        })
      },
      submitExplain (explainId) {
        if (explainId !== 0) {
          this.showEdit()
          this.explain = this.$refs.ueditor1[0].getContent()
        } else {
          this.explain = this.$refs.ueditor.getContent()
          this.setExplainVisible()
        }
        this.$http.post('/api/question/explain/publish', qs.stringify({
          questionId: this.testRecord.questionTestRecord.question.id,
          explainId: explainId,
          content: this.explain})
        ).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.canPublish()
            this.listExplain(1, 1)
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(() => {
          this.$Message.error('服务器错误,请重试')
        })
      },
      getTextRecord () {
        this.$http.get('/api/test/record/detail', {
          params: {
            testRecordId: this.$route.query.testRecordId
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.testRecord = res.data
            if (this.testRecord) {
              if (this.testRecord.status === 0) {
                this.$router.push({
                  path: '/question/test',
                  query: {
                    testRecordId: this.testRecord.testRecordId,
                    mId: '6'
                  }
                })
              }
            }
            this.canPublish()
            this.listExplain(1)
            this.resultPath = this.testRecord.resultPath.split(',')
            this.visible = true
          }
        }).catch(() => {
        })
      },
      loadNextQuestion () {
        this.$http.get('/api/test/record/next', {
          params: {
            testRecordId: this.$route.query.testRecordId,
            nextQuestionId: this.testRecord.questionIds[this.index]
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.testRecord = res.data
            this.canPublish()
            this.listExplain(1)
          }
        }).catch(() => {
        })
      },
      clickQuestionCardItem (n) {
        this.index = n
        this.loadNextQuestion()
      },
      getTime (count) {
        let hour
        let second
        let minute
        if (count <= 0) {
          second = '00'
          this.timeDown()
          return
        }
        hour = parseInt(count / (60 * 60 * 1000)) + ''
        if (hour < 10) {
          hour = '0' + hour
        }
        let n = count % (60 * 60 * 1000)
        minute = parseInt(n / (60 * 1000)) + ''
        if (minute < 10) {
          minute = '0' + minute
        }
        let n2 = n % (60 * 1000)
        second = parseInt(n2 / 1000) + ''
        if (second < 10) {
          second = '0' + second
        }
        return hour + ':' + minute + ':' + second
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .test-evaluate-layout-main {
    padding: 20px;
  }

  .test-evaluate-score {
    color: #888;
    height: 28px;
    line-height: 36px;
    font-size: 16px;
  }

  .test-evaluate-explain {
    background: #fff;
    padding: 20px;

  }

  .level-color {
    color: #fd8321!important;
  }
  .level-color1 {
    color: #21a88b !important;
  }
  .user-name {
    font-size: 14px;
    display: inline-block;
    line-height: 32px;
    margin-left: 5px;
  }
  .test-evaluate-result-detail {
    color: #34495e;
    font-weight: 700;
    white-space: nowrap;
    line-height: 30px;
    font-size: 16px;
    margin-top: 10px;
  }

  .answer-sheet-num {
    display: block;
    margin-top: 15px;
  }

  .answer-sheet-num li {
    float: left;
    margin-right: 10px;
  }

  .answer-sheet-num a {
    display: block;
    color: #dce4ec;
    font-size: 16px;
    width: 40px;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  .question-title, .question-answer {
    font-weight: 400;
    font-size: 14px;
    margin-top: 20px;
  }

  .margin-top30 {
    margin-top: 30px;
  }

  .border-bottom {
    border-bottom: 1px solid #EDEDED;
    padding: 15px;
  }

  .result-answer-item {
    border-radius: 6px;
    border: 1px solid #d4d4d4;
    padding: 10px;
    background: #FFF;
    font-size: 14px;
    margin-left: 20px;
  margin-right: 20px;
    margin-top: 15px;
  }
  .pre {
    font-size: 14px;
    font-weight: 400;
  }

  .error-answer-item {
    border-color: #ff6547
  }

  .two-color-answer-item {
    border-left-color: #1abc9c;
    border-top-color: #1abc9c;
    border-right-color: #ff6547;
    border-bottom-color: #ff6547;
  }
  .success-answer-item {
    border-color: #1abc9c;
  }


  .explain-comment {
    background: #dce4ec;
    font-weight: 400;
    font-size: 12px;
    margin-top: 15px;

  }

  .explain-time {
    color: #999;
    font-size: 12px;
    line-height: 20px;
  }

  .explain-reply {
    color: #21a88b;float: right;
    font-size: 12px;
  }
</style>
