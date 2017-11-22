<template>
 <div class="index-layout">
      <Row type="flex" justify="center">
        <Col span="18">
        <Card>
            <div>
              <Carousel v-model="select" :radius-dot="true" arrow="always"  :autoplay="true" loop>
                <CarouselItem>
                  <div class="demo-carousel">
                    <a target="_blank" href="http://localhost:8089/knowledge?topicId=5&title=Java%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1">
                      <img src="http://img.mukewang.com/5a1395dd0001564f09360316.jpg">
                    </a>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div class="demo-carousel">
                    <a target="_blank" href="http://localhost:8089/knowledge?topicId=6&title=Java%E9%AB%98%E7%BA%A7%E7%BC%96%E7%A8%8B">
                      <img src="http://img.mukewang.com/5a0c1fc4000155d009360316.jpg">
                    </a>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div class="demo-carousel">
                    <a target="_blank" href="http://localhost:8089/knowledge?topicId=7&title=Junit%E5%85%A5%E9%97%A8">
                      <img src="http://img.mukewang.com/59fafaa7000161b309360316.jpg">
                    </a>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div class="demo-carousel">
                    <a target="_blank"  href="http://localhost:8089/knowledge?topicId=8&title=Hibernate%20%E9%AB%98%E7%BA%A7%E6%95%99%E7%A8%8B">
                      <img src="http://img.mukewang.com/5a12c2660001f4ee09360316.jpg">
                    </a>
                  </div>
                </CarouselItem>
              </Carousel>
            </div>
        </Card>
        </Col>
      </Row>
      <br>
   <br>
      <Row type="flex" justify="center">
   <Col span="18">
   <Card>
     <Row>
       <Col span="24" style="text-align: center">
       <h2 class="index-title">
         <Icon type="grid"></Icon>
         <em>学</em>
         <em>生</em>
         <em>作</em>
         <em>品</em>
         <Icon type="grid"></Icon>
       </h2>
       </Col>

       <Col span="24" v-show="studentWorkVisible">
       <Row type="flex" justify="center" :gutter="16">
         <Col span="4" v-for="item in studentWorks" :key="item.id">
         <a @click="showWork(item.id)">
           <Card style="height: 250px">
             <div  style="width: 100%">
               <div class="work-cover">
                 <img :src="item.coverUrl ? item.coverUrl: '/static/img/avatar2.jpg'" style="width: 100%;height: 100%">
               </div>
               <p class="work-title">
                 {{item.title}}
               </p>
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
       </Col>
     </Row>
   </Card>
   </Col>
 </Row>
  <br>
   <br>
   <Row type="flex" justify="center">
     <Col span="18">
     <Card>
       <Row>
         <Col span="24" style="text-align: center">
         <h2 class="index-title">
           <Icon type="ios-cloud-download"></Icon>
           <em>优</em>
           <em>秀</em>
           <em>网</em>
           <em>站</em>
           <Icon type="ios-cloud-download"></Icon>
         </h2>
         </Col>
         <Col span="24"  v-show="webVisible">
         <Row type="flex" justify="start" :gutter="16">
           <Col span="6" v-for="item in webs" :key="item.id">
             <Card style="height: 320px">
               <Row type="flex" justify="center">
                 <Col span="24">
                 <img :src="item.coverUrl ? item.coverUrl: '/static/img/avatar2.jpg'" style="width: 100%;height: 148px">
                 </Col>
                 <Col span="24" style="margin-top: 5px">
                 <p class="work-title">{{item.name}}</p>
                 </Col>
                 <Col span="24" style="margin-top: 5px">
                 <p class="work-summary">{{item.summary}}</p>
                 </Col>
                 <Col span="24" style="margin-top: 5px;text-align: right">
                 <Button type="success" icon="ios-cloud-download" @click="go(item.url)">
                   立即前往
                 </Button>
                 </Col>
               </Row>
             </Card>
           </Col>
         </Row>
         </Col>
       </Row>
     </Card>
     </Col>
   </Row>
   <br>
   <br>
   <Row type="flex" justify="center">
     <Col span="18">
     <Card>
       <Row>
         <Col span="24" style="text-align: center">
         <h2 class="index-title">
           <Icon type="ios-cloud-download"></Icon>
           <em>优</em>
           <em>秀</em>
           <em>书</em>
           <em>籍</em>
           <Icon type="ios-cloud-download"></Icon>
         </h2>
         </Col>
         <Col span="24"  v-show="bookVisible">
         <Row type="flex" justify="start" :gutter="16">
           <Col span="6" v-for="item in books" :key="item.id">
             <Card style="height:320px;width: 100%">
               <Row type="flex" justify="end">
                 <Col span="24">
                 <img :src="item.coverUrl ? item.coverUrl: '/static/img/avatar2.jpg'" style="width: 100%;height: 148px">
                 </Col>
                 <Col span="24" style="margin-top: 5px">
                 <p class="work-title" style="">{{item.name}}</p>
                 </Col>
                 <Col span="24" style="margin-top: 5px">
                 <p class="work-summary">{{item.summary}}</p>
                 </Col>
                 <Col span="24" style="margin-top: 5px;text-align: right">
                 <Button type="success" icon="ios-cloud-download" @click="go(item.url)">
                   立即下载
                 </Button>
                 </Col>
               </Row>
             </Card>
           </Col>
         </Row>
         </Col>
       </Row>
     </Card>
     </Col>
   </Row>
   <br>
   <br>
   <Row type="flex" justify="center">
     <Col span="18">
     <Card>
       <Row>
         <Col span="24" style="text-align: center">
         <h2 class="index-title">
           <Icon type="ios-cloud-download"></Icon>
           <em>优</em>
           <em>秀</em>
           <em>插</em>
           <em>件</em>
           <Icon type="ios-cloud-download"></Icon>
         </h2>
         </Col>
         <Col span="24"  v-show="softWareVisible">
         <Row type="flex" justify="start" :gutter="16">
           <Col span="6" v-for="item in softWares" :key="item.id">
           <Card style="height:320px;width: 100%">
             <Row type="flex" justify="end">
               <Col span="24">
               <img :src="item.coverUrl ? item.coverUrl: '/static/img/avatar2.jpg'" style="width: 100%;height: 148px">
               </Col>
               <Col span="24" style="margin-top: 5px">
               <p class="work-title" style="">{{item.name}}</p>
               </Col>
               <Col span="24" style="margin-top: 5px">
               <p class="work-summary">{{item.summary}}</p>
               </Col>
               <Col span="24" style="margin-top: 5px;text-align: right">
               <Button type="success" icon="ios-cloud-download" @click="go(item.url)">
                 立即下载
               </Button>
               </Col>
             </Row>
           </Card>
           </Col>
         </Row>
         </Col>
       </Row>
     </Card>
     </Col>
   </Row>
   <br>
   <br>
   <Row type="flex" justify="center">
     <Col span="18">
     <Card>
       <Row>
         <Col span="24" style="text-align: center" :gutter="16">
         <h2 class="index-title">
           <Icon type="ionic"></Icon>
           <em>基</em>
           <em>础</em>
           <em>知</em>
           <em>识</em>
           <Icon type="ionic"></Icon>
         </h2>
         </Col>
         <Col span="24"  v-show="knowledgeVisible">
         <Row type="flex" justify="start" :gutter="16">
           <Col span="6" v-for="(item,index) in knowledges" :key="item.id">
           <Card>
             <div style="text-align:center" class="topic">
               <a @click="showKnowledge(item.id,item.name)">
                 <Row :gutter="16">
                   <Col span="6">
                   <Avatar :src="item.coverUrl ? item.coverUrl: '/static/img/knowledge.jpg'" size="default"/>
                   </Col>
                   <Col span="18">
                   <div>
                     {{item.name}}
                   </div>
                   </Col>
                 </Row>
               </a>
             </div>
           </Card>
           </Col>
         </Row>
         </Col>
       </Row>
     </Card>
     </Col>
   </Row>
   <br>
   <br>
   <Row type="flex" justify="center">
     <Col span="18">
     <Card>
       <Row>
         <Col span="24" style="text-align: center" :gutter="16">
         <h2 class="index-title">
           <Icon type="happy"></Icon>
           <em>进</em>
           <em>阶</em>
           <em>专</em>
           <em>题</em>
           <Icon type="happy"></Icon>
         </h2>
         </Col>
         <Col span="24"  v-show="topicVisible">
         <Row type="flex" justify="start"  :gutter="16">
           <Col span="6" v-for="(item,index) in topics" :key="item.id">
           <Card>
             <div style="text-align:center" class="topic">
               <a @click="showTopic(item.id,item.name)">
                 <Row :gutter="16">
                   <Col span="6">
                   <Avatar :src="item.coverUrl ? item.coverUrl: '/static/img/java.jpg'" size="default"/>
                   </Col>
                   <Col span="18">
                   <div>
                      {{item.name}}
                   </div>
                   </Col>
                 </Row>
               </a>
             </div>
           </Card>
           </Col>
         </Row>
         </Col>
       </Row>
     </Card>
     </Col>
   </Row>

   <br>
   <br>
   <Row type="flex" justify="center">
     <Col span="18">
     <Card>
       <Row>
         <Col span="24" style="text-align: center">
         <h2 class="index-title">
           <Icon type="bowtie"></Icon>
           <em>拓</em>
           <em>展</em>
           <em>知</em>
           <em>识</em>
           <Icon type="bowtie"></Icon>
         </h2>
         </Col>
         <Col span="24" v-show="expandKnowledgeVisible">
         <Row type="flex" justify="start" :gutter="16">
           <Col span="12" v-for="item in expandKnowledges" :key="item.id" style="margin-top: 10px">
           <div  class="topic">
             <a :href="item.url" target="_blank">
               <Card >
                 <p slot="title">
                   {{item.name}}
                 </p>
                 <p slot="extra">
                   <a :href="item.url" target="_blank">查看原文</a>
                 </p>
                 <p class="ek-summary">
                   {{item.summary}}
                 </p>
                 <br>
                 <p class="ek-summary">
                   {{item.createAt |moment("YYYY-MM-DD HH:mm")}}
                 </p>
               </Card>
             </a>
           </div>
           </Col>
         </Row>
         </Col>
       </Row>
     </Card>
     </Col>
   </Row>
 </div>
</template>

<script>
  export default {
    created () {
      this.listStudentWork()
      this.listWeb()
      this.listBook()
      this.listTopic()
      this.listKnowledge()
      this.listExpandKnowledge()
      this.listSoftWare()
    },
    data () {
      return {
        select: 1,
        studentWorks: [],
        studentWorkVisible: false,
        webs: [],
        webVisible: false,
        books: [],
        bookVisible: false,
        topics: [],
        topicVisible: false,
        knowledges: [],
        knowledgeVisible: false,
        expandKnowledges: [],
        expandKnowledgeVisible: false,
        softWares: [],
        softWaresVisible: false
      }
    },
    methods: {
      listStudentWork () {
        this.$http.get('/api/student_work', {
          params: {
            size: 5,
            page: 0
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.studentWorks = res.data.content
            this.studentWorkVisible = true
          }
        }).catch(() => {
        })
      },
      listWeb () {
        this.$http.get('/api/resource', {
          params: {
            category: 3,
            size: 5,
            page: 0
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.webs = res.data.content
            this.webVisible = true
          }
        }).catch(() => {
        })
      },
      listSoftWare () {
        this.$http.get('/api/resource', {
          params: {
            category: 2,
            size: 5,
            page: 0
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.softWares = res.data.content
            this.softWareVisible = true
          }
        }).catch(() => {
        })
      },
      listBook () {
        this.$http.get('/api/resource', {
          params: {
            category: 1,
            size: 5,
            page: 0
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.books = res.data.content
            this.bookVisible = true
          }
        }).catch(() => {
        })
      },
      listTopic () {
        this.$http.get('/api/topic/list', {
          params: {
            size: 4,
            page: 0
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.topics = res.data.content
            this.topicVisible = true
          }
        }).catch(() => {
        })
      },
      listKnowledge () {
        this.$http.get('/api/knowledge/base/search', {
          params: {
            size: 4,
            page: 0,
            search: ''
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.knowledges = res.data.content
            this.knowledgeVisible = true
          }
        }).catch(() => {
        })
      },
      listExpandKnowledge () {
        this.$http.get('/api/expand_knowledge/list', {
          params: {
            size: 10,
            page: 0,
            search: ''
          }
        }).then((response) => {
          let res = response.data
          if (res.code === 666) {
            this.expandKnowledges = res.data.content
            this.expandKnowledgeVisible = true
          }
        }).catch(() => {
        })
      },
      showWork (id) {
        window.open('student_work/detail?id=' + id)
      },
      showKnowledge (id) {
        window.open('/knowledge?kId=' + id)
      },
      showTopic (id, title) {
        window.open('/knowledge?topicId=' + id + '&title=' + title)
      },
      go (url) {
        window.open(url, '_blank')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .demo-carousel {
    height: 400px;
    color: #fff;
  }
  .index-layout {
    margin-top: 30px;
  }
  .demo-carousel img {
    width: 100%;
    height: 100%;
  }
  .demo-carousel a {
    width: 100%;
    height: 100%;

  }
  .index-title em{
    font-size: 20px;
    font-weight: 600;
    color: #4D555D;
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
    max-width: 100%;
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

  .topic a {
    color: #666;
  }

</style>
