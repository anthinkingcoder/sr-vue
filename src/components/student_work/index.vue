<template>
  <div style="background: #fff;">
    <div class="student-work-layout-category">
      <Row type="flex">
        <Col span="1">
        <h3 style="margin-top: 17px">类型:</h3>
        </Col>
        <Col span="20">
        <ul class="answer-sheet-num">
          <li v-for="(category,index) in categories" :key="category.name">
            <Button :type="category.active ? 'primary' : 'text'" @click="menuSelect(index)">{{category.name}}</Button>
          </li>
        </ul>
        <!--<Menu  active-name="0" mode="horizontal" @on-select="menuSelect">-->
          <!--<MenuItem name="0">全部</MenuItem>-->
          <!--<MenuItem name="1">课程设计</MenuItem>-->
          <!--<MenuItem name="2">项目实训</MenuItem>-->
          <!--<MenuItem name="3">大赛作品</MenuItem>-->
        <!--</Menu>-->
        </Col>
      </Row>
    </div>

    <div class="student-work-layout-content">
      <div class="student-work-layout-content-main">
          <Row>
              <Col span="4" v-for="item in studentWorks" :key="item.id"  style="margin:20px">
              <a @click="show(item.id)">
                <Card style="height: 250px">
                  <div  style="width: 100%">
                    <div class="work-cover">
                      <img :src="item.coverUrl ? item.coverUrl: '/static/img/avatar2.jpg'" style="width: 100%;height: 100%">
                    </div>
                    <p class="work-title"  v-html="item.title"></p>
                    <div>
                      <Icon type="ios-person-outline" color="#93999f"></Icon>
                      <span class="work-summary" >{{item.author}}</span>
                    </div>
                    <p class="work-summary">{{item.summary}}</p>
                  </div>
                </Card>
              </a>
              </Col>
          </Row>
      </div>
      <div class="layout-page">
        <Page :total="total" :current="page" :page-size="per" @on-change="listStudentWork"></Page>
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
  export default {
    created () {
      this.listStudentWork(1)
    },
    data () {
      return {
        categories: [
          {
            id: 0,
            name: '全部',
            active: true
          },
          {
            id: 1,
            name: '课程设计',
            active: false
          },
          {
            id: 2,
            name: '项目实训',
            active: false
          },
          {
            id: 3,
            name: '大赛作品',
            active: false
          }
        ],
        category: 0,
        studentWorks: [],
        loading: true,
        page: 0,
        per: 10,
        total: 0
      }
    },
    methods: {
      menuSelect (index) {
        this.category = this.categories[index].id
        this.categories.forEach((item) => {
          item.active = false
        })
        this.categories[index].active = true
        this.listStudentWork(1)
      },
      show (id) {
        this.$router.push({
          path: '/student_work/detail',
          query: {
            id: id
          }
        })
      },
      listStudentWork (page) {
        this.page = page - 1
        this.loading = true
        this.$http.get('/api/student_work', {
          params: {
            category: this.category,
            size: this.per,
            page: this.page
          }
        }).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.studentWorks = res.data.content
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
<style>
  .student-work-layout-category {
    background: #fff;
    padding-left: 50px;
    padding-top: 50px;
  }
  .student-work-layout-content {
    margin-top: 10px;
    padding-bottom: 30px;
    background: #f3f5f7;
  }
  .student-work-layout-content-main {
    min-height: 600px;
    padding-left: 50px;
    padding-top: 50px;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
  }


  .layout-page {
    text-align: center;
  }

  .work-summary {
    color: #93999f;
    font-weight: 200;
    max-height: 48px;
    line-height: 24px;
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
  }
  .work-cover {
    height: 120px;
    width: 100%;
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
