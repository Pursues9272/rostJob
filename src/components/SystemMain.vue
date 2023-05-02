<template>
  <div class="list" v-show="totalShow">
    <div class="Hlist">
        <div class="leftName">
          <!-- <i class="iconfont icon-filled"></i> -->
          {{title}}
        </div>
        <span class="rightName" @click="setMore()">更多</span>
    </div>
    <div class="Mlist" :style="isMove?'flex-wrap: wrap;':''">
      <!-- <div class="listCard" v-for="(item,index) in listData" :key="index" > -->
        <div class="col-xs-2" v-for="(item,index) in listData" :key="index"  >
            <div class="card">
             
                <!-- <img src="@/assets/img/1-1.jpg" alt=""> -->
                <img :src="setImg(index)" alt="">
                <!-- <span @click="aaa(index)">{{ index }}</span> -->
                <div class="card-heading">
                  <span class="pull-right price">{{ item[itemKey1] }} </span>
                  <span class="pull-left" style="color: #673AB7;">{{ item[itemKey2] }}</span>
                </div>
            </div>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title: {
      type: String,
      default: "热门创作者"
    },
    typex: {
      type: Number,
      default: 1
    },
    isMove: {
      type: Boolean,
      default: false
    },
    itemKey1:{
      type: String,
      default: 'userPhone'
    },
    itemKey2:{
      type: String,
      default: 'userName'
    }
  },
  name: '',
  data () {
    return {
      listData:'',
      urlList:['/user/list','/article/getByArticleTypeList','/article/getByArticleTypeList'],
      totalShow: true
    }
  },
  created() {
    this.login()
  },
  mounted() {
  },
  computed:{
    
  },
  methods: {
    setImg(i){
      return require(`@/assets/img/${this.typex}-${i+1}.jpg`)
    },
    
    login(){
      let data,method;
      if(this.typex == 1){
        // method = 'post'
        data = {
          context: "",
          pageNum: 1,
          pageSize: 6,
        }
      }else{
        // method = 'get'
        data={
          articleType:this.typex==2?0:4,
          pageNum: 1,
          pageSize: 6,
        }
        
      }
      this.$request
      ({
        url: this.urlList[this.typex-1],
        method: "post" ,
        data: data,
      })
      .then(res => {
      if(res.status == 200)
      console.log(this.urlList[this.typex-1],"list=>", res.data.rows);
          this.listData = res.data.rows
          this.totalShow = res.data.total
      })
      .catch((error) => {
        console.log("error=>", error);
      });
    },
    setMore(){
      this.$router.push("/MoreList")
    },
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
      width: 19%;
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
