<template>
  <div>
    <SystemMain title="热门创作者" typex="1"></SystemMain>
    <SystemMain title="热门制品" typex="2"></SystemMain>
    <SystemMain title="官方周边" typex="3"></SystemMain>
  </div>
</template>

<script>
import SystemMain from '@/components/SystemMain.vue'
export default {
  components:{
    SystemMain,
  },
  name: '',
  data () {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}

</script>

<style lang='less' scoped>
.list{  
    margin-top: 8px;
    margin-bottom: 24px;
    padding: 0;
}
.Hlist{
    display: flex;
    justify-content: space-between;
    justify-items: center;
    padding-bottom: 10px;
    border: 0;
    .leftName{
      font-weight: bold;
    }
    .rightName{
      cursor: pointer;
    }
    span{
      color: #673AB7;
    }
}
.Mlist{
  width: 100%;
  display: flex;
  border: 1px solid #ddd;
  border-top: 0;
  border-left: 0;


  .listCard:hover {
    border: 1px solid #6633cc;
  }
    .col-xs-2 {
      border: 1px solid #e5e5e5;
      // margin: 5px;
      width: 20%;
      .card{
        padding: 10px;
        border-right: 0;
        border-bottom: 0;
        border-radius: 0;
        .card-heading{
          padding: 10px;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .pull-right{
            float: right;
            padding-top: 1px;
          }
          .pull-left{
            text-decoration: none;
          }
        }
      }
      img{
        max-width: 100%;
        vertical-align: middle;
      }
    }
    .col-xs-2:hover {
        border: 1px solid #6633cc;
    }
}
</style>
