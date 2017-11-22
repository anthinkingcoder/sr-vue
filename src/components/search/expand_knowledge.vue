<template>
   <div v-show="visible"  style="margin-top: 30px">
     <Row>
       <Col span="24">
       <Card>
         <p slot="title">
           相关拓展
         </p>
         <a slot="extra"  @click="showMore" v-show="total >= per && !isMore">
           查看更多 <Icon type="chevron-right"></Icon>
         </a>
         <div>
           <Row type="flex" justify="start">
             <Col span="24" v-for="item in knowledges" :key="item.id" style="margin-top: 5px">
               <div  class="topic">
                 <a :href="item.url">
                   <Card >
                     <p slot="title" v-html="item.name">
                     </p>
                     <p class="ek-summary" v-html="item.summary">
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
           <div style="text-align: center;margin-top: 60px;margin-bottom: 20px" v-show="total >= per && isMore">
             <Page :total="total" :current="page" :page-size="per" @on-change="listExpandKnowledge" show-elevator></Page>
           </div>
         </div>
       </Card>
       </Col>
       </Row>
   </div>
</template>

<script>
  import reg from '../util/reg'
  export default {
    created () {
      this.words = this.$route.query.words
      this.search(this.words)
    },
    props: {
      visible: {
        default: true
      },
      name: {
        default: -1
      },
      isMore: {
        default: false
      }
    },
    data () {
      return {
        words: '',
        knowledges: [],
        total: 0,
        page: 0,
        per: 10
      }
    },
    methods: {
      showMore () {
        this.$emit('more', this.name)
      },
      search (words) {
        if (!words) {
          return
        }
        this.words = words
        this.listExpandKnowledge(1)
      },
      listExpandKnowledge (page) {
        this.loading = true
        this.page = page - 1
        this.$http.get('/api/expand_knowledge/search', {
          params: {
            size: this.per,
            page: this.page,
            search: this.words
          }
        }).then((response) => {
          this.loading = false
          let res = response.data
          if (res.code === 666) {
            this.knowledges = res.data.content
            this.knowledges.forEach((item) => {
              item.name = reg.highLightForTitle(item.name, this.words)
              item.summary = reg.highLightForSummary(item.summary, this.words)
            })
            this.total = res.data.totalElements
            this.page = res.data.number + 1
            if (this.total <= 0) {
              this.$emit('navVisible', this.name)
            }
          }
        }).catch(() => {
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
