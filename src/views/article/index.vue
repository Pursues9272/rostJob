<template>
  <div>
    <SystemBox title="我的物品">
        <el-table
          :data="articleData"
          style="width: 100%"
        >
          <el-table-column label="商品">
            <template #default="scope">
              <div class="infoBox">
                <img
                  style="width: 100px"
                  :src="scope.row.articleCover"
                  alt=""
                />
                <span>
                  {{ scope.row.articleName }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="articlePrice" label="价格" />
          <!-- <el-table-column prop="articleDTO.articleDiscount" label="特价" /> -->
          <el-table-column prop="articleCount" label="数量" />
          <el-table-column label="特价" width="180">
            <template #default="scope">
              <div class="moneyText">
                {{
                  scope.row.articleDiscount
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template #default="scope">
              <el-button type="text" @click="updata(scope.row.id)"
                >修改</el-button
              >
            </template>
          </el-table-column>
        </el-table>
    </SystemBox>
    <el-dialog v-model="isUpdata" width="60%" title="修改" align-center @setUpdata="isUpdata=false" >
        <PublishPost :isAdd="false" :updataId="updataId" ref="publish" ></PublishPost>
    </el-dialog>
  </div>
</template>

<script>
import SystemBox from '../../components/SystemBox.vue'
import PublishPost from '../main/PublishPost.vue'
export default {
  components:{
    SystemBox,PublishPost
  },
  name: '',
  data () {
    return {
        dataPost:{
            articleUserId:this.$store.state.user.id,
            pageNum:1,
            pageSize:10,
        },
        articleData:'',
        updataList:"",
        isUpdata:false,
        updataId:0,
    }
  },
  created() {
    this.setArticle()
  },
  mounted() {
  },
  methods: {
    setArticle(){
        this.$request({
            url:"/article/getByArticleUserIdList",
            method:"post",
            data:this.dataPost
        }).then(({data})=>{
            console.log(data.rows);
            this.articleData = data.rows
        })
    },
    updata(id){
        this.isUpdata = true
        // this.updataId = id
        this.$nextTick(()=>{
            this.$refs.publish.setUpdatax(id)
        })

        // this.$request({
        //     url:"/article/getById/"+id,
        //     method:'get'
        // }).then(({data})=>{
        //     this.$nextTick(() => {
        //         this.updataList = data.data
        //     });
        // })

    }
  }
}

</script>

<style lang='less' scoped>
.infoBox {
    display: flex;
    align-items: center;
         

    span {
      padding-left: 10px;
    }
  }
  .moneyText {
    color: red;
    font-weight: bold;
  }
</style>
