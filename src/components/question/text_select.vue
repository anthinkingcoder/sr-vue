<template>
  <div class="test-detail-content" v-show="visible">
    <Row type="flex" justify="center">
      <Col span="18">
      <Row :gutter="16">
        <Col span="24" style="margin-top: 10px">
        <Card>
          <p slot="title">
            在线测试
          </p>
          <p>
            <Row>
              <Col span="24" v-for="(item,index) in questionCategoryTree" :key="item.questionCategoryVO.questionCategoryId" style="margin-top: 20px">
              <Card>
          <p slot="title">
            {{item.questionCategoryVO.questionCategoryName}}
          </p>
          <p slot="extra">
            <Checkbox  v-model="checkAllList[index]" @on-change="handleCheckAll(index)" >全选</Checkbox>
          </p>
          <p>
            <CheckboxGroup v-model="questionCategoryIdLists[index]" @on-change="changeQuestionCategoryIds(index)">
              <Row>
                <Col span="8"  v-for="children in item.children" :key="children.questionCategoryId">
                  <Row>
                      <Col span="8">
                    <Checkbox :label="children.questionCategoryId"  :key="children.questionCategoryId">{{children.questionCategoryName}}
                    </Checkbox>
                    </Col>
                    <Col span="10" >
                    <Progress :percent="children.alreadyDoneQuestionNum === 0 ? 0 :children.alreadyDoneQuestionNum/children.questionNum * 100" :stroke-width="5" hide-info></Progress>
                    </Col>
                    <Col span="1" offset="1">
                      <span style="font-size: 12px">{{children.alreadyDoneQuestionNum}}/{{children.questionNum}}</span>
                    </Col>
                  </Row>
                </Col>
              </Row>


            </CheckboxGroup>
          </p>
        </Card>
        </Col>
      </Row>
        <Form  style="margin-top: 20px">
          <Form-item label="难度系数" >
              <Rate v-model="level"></Rate>
          </Form-item>
          <Form-item label="出题来源">
            <RadioGroup v-model="origin">
              <Radio label="1">只出新题</Radio>
              <Radio label="2">只出错题</Radio>
              <Radio label="3">错题+新题</Radio>
              <Radio label="4">不限来源</Radio>
            </RadioGroup>
          </Form-item>
          <Form-item label="单次题目次数">
            <RadioGroup v-model="questionNum">
              <Radio label="5"></Radio>
              <Radio label="10"></Radio>
              <Radio label="20"></Radio>
              <Radio label="30"></Radio>
            </RadioGroup>
          </Form-item>
        </Form>

      <Row type="flex" justify="end">
        <Col span="20">
         <span>
           已选择:<span>{{level}}星难度</span>
           <span v-for="nameList in questionCategoryNameLists"><span v-for="name in nameList">{{name}} </span></span>
           <span>{{questionNum}}题</span>
         </span>
        </Col>
        <Col span="4">
        <Button type="primary" :loading="loading" @click="recovery">重选</Button>
        <Button type="success" :loading="loading" @click="submit">确定</Button>
        </Col>
      </Row>
      </p>
      </Card>
      </Col>
    </Row>
    </Col>

    </Row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import qs from 'qs'
  export default {
    created () {
      this.listQuestionCategoryTree()
    },
    data () {
      return {
        questionCategoryTree: [],
        questionCategoryIdLists: [],
        questionCategoryNameLists: [],
        checkAllList: [],
        visible: true,
        resultVisible: false,
        loading: false,
        level: 1,
        attachments: [],
        questionNum: 10,
        origin: 1
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'loadData'
    },
    methods: {
      loadData (id) {
        this.visible = true
      },
      initData () {
      },
      changeQuestionCategoryIds (index) {
        if (this.questionCategoryIdLists[index].length === this.questionCategoryTree[index].children.length) {
          Vue.set(this.checkAllList, index, true)
        } else if (this.questionCategoryIdLists[index].length > 0) {
          Vue.set(this.checkAllList, index, false)
        } else {
          Vue.set(this.checkAllList, index, false)
        }
        Vue.set(this.questionCategoryNameLists, index, [])
        if (this.questionCategoryIdLists[index]) {
          this.questionCategoryIdLists[index].forEach((id, i) => {
            this.questionCategoryTree.forEach((item) => {
              if (item.children) {
                item.children.forEach((child) => {
                  if (id === child.questionCategoryId) {
                    Vue.set(this.questionCategoryNameLists[index], i, child.questionCategoryName)
                  }
                })
              }
            })
          })
        }
      },
      listQuestionCategoryTree () {
        this.$http.get('/api/question/category/tree', {
          params: {}
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.questionCategoryTree = res.data
            if (this.questionCategoryTree) {
              this.questionCategoryTree.forEach((item, index) => {
                Vue.set(this.checkAllList, index, false)
                Vue.set(this.questionCategoryIdLists, index, [])
                Vue.set(this.questionCategoryNameLists, index, [])
              })
            }
          }
        }).catch(() => {
        })
      },
      handleCheckAll (index) {
        if (this.questionCategoryTree[index].children && this.checkAllList[index] === true) {
          this.questionCategoryTree[index].children.forEach((item, i) => {
            Vue.set(this.questionCategoryIdLists[index], i, item.questionCategoryId)
            Vue.set(this.questionCategoryNameLists[index], i, item.questionCategoryName)
          })
        } else {
          Vue.set(this.questionCategoryIdLists, index, [])
          Vue.set(this.questionCategoryNameLists, index, [])
        }
      },
      showResult () {
        this.resultVisible = true
      },
      recovery () {
        this.questionCategoryIdLists.forEach((item, index) => {
          Vue.set(this.questionCategoryIdLists, index, [])
        })
        this.checkAllList.forEach((item, index) => {
          Vue.set(this.checkAllList, index, false)
        })
      },
      submit () {
        let isSelected = false
        this.questionCategoryIdLists.forEach((item) => {
          if (item.length > 0) {
            isSelected = true
          }
        })
        if (isSelected === false) {
          this.$Message.error('请选择测试的题目类别')
          return
        }
        // 合并类别id数组
        let ids = ''
        this.questionCategoryIdLists.forEach((item) => {
          if (item) {
            item.forEach((value) => {
              if (ids.length > 0) {
                ids += ','
              }
              ids += value
            })
          }
        })
        this.$http.post('/api/test/record/create', qs.stringify({
          categoryId: ids,
          questionNum: this.questionNum,
          origin: this.origin,
          level: this.level
        }), {emulateJSON: true}).then((response) => {
          this.loading = false
          let result = response.data
          if (result.code === 666) {
            this.visible = false
            this.$emit('update', 1)
            this.$Message.success('成功')
            this.$router.push({
              path: '/question/test',
              query: {
                testRecordId: result.data.testRecordId
              }
            })
          } else {
            this.$Message.error(result.msg)
          }
        }).catch(() => {
          this.$Message.error('服务器错误,请重试')
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .test-detail-content {
    padding: 30px;
  }
</style>
