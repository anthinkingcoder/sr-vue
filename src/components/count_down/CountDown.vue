<template>
  <div>
    <span class="text" :style="{ backgroundColor: bgColor, color: color,fontSize: fontSize }">{{hour}}:{{minute}}:{{second}}</span>
    <!--<span :style="{ color: color, fontSize: fontSize }">:</span>-->
    <!--<span-->
    <!--class="text" :style="{ backgroundColor: bgColor, color: color,fontSize: fontSize }">{{minute}}</span>-->
    <!--<span :style="{ color: color, fontSize: fontSize}">:</span>-->
    <!--<span-->
    <!--class="text" :style="{ backgroundColor: bgColor, color: color,fontSize: fontSize }">{{second}}</span>-->
  </div>
</template>

<script>
  export default {
    props: {
      date: {
        default: function () {
          return new Date().getTime()
        }
      },
      bgColor: {
        default: '#fff'
      },
      color: {
        default: '#495060'
      },
      fontSize: {
        default: '20px'
      }
    },
    data () {
      return {
        hour: '00',
        minute: '00',
        second: '00',
        count: new Date().getTime() - this.date,
        interval: null
      }
    },
    mounted () {
      this.start()
    },
    methods: {
      start () {
        this.interval = setInterval(() => {
          this.count = this.count + 1000
          if (this.count <= 0) {
            this.second = '00'
            clearInterval(this.interval)
            this.timeDown()
            return
          }
          this.hour = parseInt(this.count / (60 * 60 * 1000)) + ''
          if (this.hour < 10) {
            this.hour = '0' + this.hour
          }
          let n = this.count % (60 * 60 * 1000)
          this.minute = parseInt(n / (60 * 1000)) + ''
          if (this.minute < 10) {
            this.minute = '0' + this.minute
          }
          let n2 = n % (60 * 1000)
          this.second = parseInt(n2 / 1000) + ''
          if (this.second < 10) {
            this.second = '0' + this.second
          }
        }, 1000)
      },
      timeDown () {
        this.$emit('timeDown')
      }
    },
    computed: {}
  }
</script>

<style scoped>
  .text {
    background-color: #000000;
    color: #ffffff;
    border-radius: 2px;
  }
</style>
