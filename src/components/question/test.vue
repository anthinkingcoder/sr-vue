<template>
  <div class="question-text-layout-content" v-if="this.testRecord">
    <Row  type="flex" justify="center">
      <Col span="18">
      <Row :gutter="16">
        <Col span="24" style="margin-top: 10px">
        <Card>
          <div slot="title">
            <Row>
              <Col span="21">
               <Progress :percent="(index + 1) / this.testRecord.questionNum * 100">
                <span style="font-size: 20px">{{index + 1}}/{{this.testRecord.questionNum}}</span>
              </Progress>
              </Col>
              <Col span="3">
                <CountDown :date="this.testRecord.startTime"></CountDown>
              </Col>
            </Row>
          </div>
          <div style="background: #ffffff">
            <Row>
              <Col span="24" style="margin-bottom: 30px">
              <Icon type="help-circled" size="23" color="#ff6547"></Icon>
              <span style="font-size: 15px" v-if="this.testRecord.questionTestRecord.question.answerCategory === 1">[单选题]</span>
              <span style="font-size: 15px" v-else>[多选题]</span>
              </Col>
              <Col span="24">
                <span v-html="this.testRecord.questionTestRecord.question.content"></span>
              </Col>
              <Col span="24">
              <span class="question-title">{{this.testRecord.questionTestRecord.question.title}}</span>
              </Col>
            </Row>
          </br>
            <Row v-if="this.testRecord.questionTestRecord.question.answerCategory === 1">
              <Col span="24">
              <RadioGroup  v-model="testRecord.questionTestRecord.answer" vertical>
                <Radio label="A" v-if="testRecord.questionTestRecord.question.possibleAnswerOne">
                  <span class="question-answer">{{testRecord.questionTestRecord.question.possibleAnswerOne}}</span>
                </Radio>
                <Radio label="B" v-if="testRecord.questionTestRecord.question.possibleAnswerTwo">
                  <span class="question-answer">{{testRecord.questionTestRecord.question.possibleAnswerTwo}}</span>
                </Radio>
                <Radio label="C" v-if="testRecord.questionTestRecord.question.possibleAnswerThree">
                  <span class="question-answer">{{testRecord.questionTestRecord.question.possibleAnswerThree}}</span>
                </Radio>
                <Radio label="D" v-if="testRecord.questionTestRecord.question.possibleAnswerFour">
                  <span class="question-answer">{{testRecord.questionTestRecord.question.possibleAnswerFour}}</span>
                </Radio>
                <Radio label="E" v-if="testRecord.questionTestRecord.question.possibleAnswerFive">
                  <span class="question-answer">{{testRecord.questionTestRecord.question.possibleAnswerFive}}</span>
                </Radio>
                <Radio label="F" v-if="testRecord.questionTestRecord.question.possibleAnswerSix">
                  <span class="question-answer">{{testRecord.questionTestRecord.question.possibleAnswerSix}}</span>
                </Radio>
              </RadioGroup>
              </Col>
            </Row>
            <Row v-show="this.testRecord.questionTestRecord.question.answerCategory === 2">
              <Col span="24">
              <CheckboxGroup  v-model="checkBoxAnswer">
                <Checkbox label="A" v-if="this.testRecord.questionTestRecord.question.possibleAnswerOne">
                  <span class="question-answer">{{this.testRecord.questionTestRecord.question.possibleAnswerOne}}</span>
                </Checkbox>
                <br>
                <Checkbox label="B" v-if="this.testRecord.questionTestRecord.question.possibleAnswerTwo">
                  <span class="question-answer">{{this.testRecord.questionTestRecord.question.possibleAnswerTwo}}</span>
                </Checkbox>
                <br>
                <Checkbox label="C" v-if="this.testRecord.questionTestRecord.question.possibleAnswerThree">
                  <span class="question-answer">{{this.testRecord.questionTestRecord.question.possibleAnswerThree}}</span>
                </Checkbox>
                <br>
                <Checkbox label="D" v-if="this.testRecord.questionTestRecord.question.possibleAnswerFour">
                  <span class="question-answer">{{this.testRecord.questionTestRecord.question.possibleAnswerFour}}</span>
                </Checkbox>
                <br>
                <Checkbox label="E" v-if="this.testRecord.questionTestRecord.question.possibleAnswerFive">
                  <span class="question-answer">{{this.testRecord.questionTestRecord.question.possibleAnswerFive}}</span>
                </Checkbox>
                <br>
                <Checkbox label="F" v-if="this.testRecord.questionTestRecord.question.possibleAnswerSix">
                  <span class="question-answer">{{this.testRecord.questionTestRecord.question.possibleAnswerSix}}</span>
                </Checkbox>
              </CheckboxGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                  <div style="text-align: right">
                    <Button type="error" @click="preEvaluate" v-show="index + 1 != this.testRecord.questionNum">提前交卷</Button>
                      <Button type="success" @click="nextQuestion" v-show="index + 1 != this.testRecord.questionNum">下一题</Button>
                    <Button type="success" @click="evaluate" v-show="index + 1 == this.testRecord.questionNum">交卷</Button>
                  </div>
              </Col>
            </Row>

            </br>
            <Row>
              <Col style="padding: 10px">
               <a @click="onChevron">
                 <span style="color: #495060!important;font-size: 16px;">{{questionCard}}</span>
                 <Icon :type="chevron" color="#495060"></Icon>
               </a>
              </Col>
              <Col span="24" v-show="questionIndexListVisible">
              <ul class="answer-sheet-num">
                <li v-for="(item,i) in testRecord.questionIds">
                  <Button  v-if="i === index" type="success" @click="clickQuestionCardItem(i,item)">{{i+1}}</Button>
                  <Button  v-else-if="item.done" type="dashed" @click="clickQuestionCardItem(i,item)">{{i+1}}</Button>
                  <Button v-else type="text" @click="clickQuestionCardItem(i,item)">{{i+1}}</Button>
                </li>
              </ul>
              </Col>
            </Row>
          </div>
        </Card>
        </Col>
      </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
  import CountDown from '../count_down/CountDown.vue'
  import qs from 'qs'
  export default {
    created () {
      this.testRecordId = this.$route.query.testRecordId
      this.getTextRecord()
    },
    components: {
      CountDown
    },
    data () {
      return {
        index: 0,
        testRecordId: 0,
        testRecord: '',
        question: '',
        vertical: 'A',
        currentQuestionIndex: 1,
        chevron: 'chevron-down',
        questionIndexListVisible: false,
        questionCard: '展开答题卡',
        checkBoxAnswer: [],
        answer: 'A'
      }
    },
    computed: {
    },
    methods: {
      start (data) {
        console.info(data)
      },
      onChevron () {
        if (this.chevron === 'chevron-down') {
          this.chevron = 'chevron-up'
          this.questionIndexListVisible = true
          this.questionCard = '收起答题卡'
        } else {
          this.chevron = 'chevron-down'
          this.questionIndexListVisible = false
          this.questionCard = '展开答题卡'
        }
      },
      initCheckBoxAnswer () {
        if (this.testRecord) {
          if (this.testRecord.questionTestRecord.question.answerCategory === 2) {
            if (this.testRecord.questionTestRecord.answer) {
              this.checkBoxAnswer = this.testRecord.questionTestRecord.answer.split(',')
            }
          }
        }
      },
      getAnswer () {
        if (this.testRecord) {
          if (this.testRecord.questionTestRecord.question.answerCategory === 2) {
            if (this.checkBoxAnswer.length > 0) {
              this.testRecord.questionTestRecord.answer = ''
              this.checkBoxAnswer.forEach((item) => {
                if (this.testRecord.questionTestRecord.answer.length > 0) {
                  this.testRecord.questionTestRecord.answer += ','
                }
                this.testRecord.questionTestRecord.answer += item
              })
            }
          }
        }
        return this.testRecord.questionTestRecord.answer
      },
      clickQuestionCardItem (n) {
        this.index = n
        this.loadNextQuestion()
      },
      getTextRecord () {
        this.$http.get('/api/test/record/detail', {
          params: {
            testRecordId: this.testRecordId
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.testRecord = res.data
            if (this.testRecord) {
              if (this.testRecord.status === 1) {
                this.$router.push({
                  path: '/question/evaluate_result',
                  query: {
                    testRecordId: this.testRecord.testRecordId,
                    mId: 6
                  }
                })
              }
            }
            this.initCheckBoxAnswer()
          }
        }).catch(() => {
        })
      },
      preEvaluate () {
        this.$Modal.confirm({
          title: '提示',
          content: '是否提前交卷?',
          onOk: () => {
            this.evaluate()
          }
        })
      },
      evaluate () {
        this.$http.post('/api/test/record/evaluate', qs.stringify({
          testRecordId: this.$route.query.testRecordId,
          questionId: this.testRecord.questionTestRecord.question.id,
          answer: this.getAnswer()})
        ).then((response) => {
          let res = response.data
          if (res.code === 666 || res.code === 605) {
            this.$router.push({
              path: '/question/evaluate_result',
              query: {
                testRecordId: res.data.id,
                mId: 6
              }
            })
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(() => {
          this.$Message.error('服务器错误,请重试')
        })
      },
      loadNextQuestion () {
        this.$http.get('/api/test/record/next', {
          params: {
            testRecordId: this.testRecordId,
            questionId: this.testRecord.questionTestRecord.question.id,
            answer: this.getAnswer(),
            nextQuestionId: this.testRecord.questionIds[this.index]
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.testRecord = res.data
            this.initCheckBoxAnswer()
          }
        }).catch(() => {
        })
      },
      nextQuestion () {
        if (this.index + 1 === this.testRecord.questionNum) {
          return
        }
        this.index += 1
        this.loadNextQuestion()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .question-text-layout-content {
      padding-top: 10px;
      padding-left: 30px;
      padding-right: 30px;
    }
    .question-title,.question-answer {
      font-weight: 400;
      font-size: 14px;
      margin-top: 20px;
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
</style>


