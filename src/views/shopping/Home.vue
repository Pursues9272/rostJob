<template>
  <div>
    <SystemBox title="我的购物车">
      <div class="homeMainBox">
        <el-table :data="shopping" stripe style="width: 100%" @selection-change="handleSelectionChange" >
            <el-table-column type="selection" width="55" />
            <el-table-column label="商品信息" >
              <template #default="scope">
                <div class="infoBox">
                    <img style="width:100px;" :src="scope.row.articleDTO.articleCover" alt="">
                    <span>
                        {{ scope.row.articleDTO.articleName }}
                    </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="articleDTO.articleDiscount" label="价格" />
            <el-table-column prop="stArticleCount" label="数量" >
                <template #default="scope">
                    <!-- {{scope.row.articleDTO.articleDiscount}} -->
                    <el-input-number
                      v-model="scope.row.stArticleCount"
                      :min="1"
                      :max="10"
                      @change="handleChange(scope.row.stArticleCount,scope.row)"
                    />
                </template> 
            </el-table-column>
            <el-table-column label="金额" width="180">
              <template #default="scope">
                <div class="moneyText">
                    {{scope.row.articleDTO.articleDiscount*scope.row.stArticleCount}}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template #default="scope">
                <el-button type="text" @click="Move(scope.row.id)" >删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <div class="foot">
            <span>选择了{{number}}件商品，共计{{ moeny }}</span>
            <!-- size="large" -->
            <el-button type="primary" @click="settlement()">结算</el-button>
        </div>
      </div>
    </SystemBox>
    <el-dialog v-model="isSettlement" width="40%" title="结算" align-center>
        <div class="dialogMain">
            <img src="@/assets/img/skm.jpg" alt="支付二维码" width="200">
        </div>
        <template #footer>
            <div class="dialogFooter">
                <el-button type="primary" @click="isSettlement=false"
                > 稍后支付</el-button>
                <el-button type="primary" @click="isSettlement=false">放弃支付</el-button>
                <el-button type="primary" @click="isSettlement=false">我已支付</el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="isAddress" width="50%" title="地址新增" align-center>
        
    </el-dialog>
  </div>
</template>

<script>
import SystemBox from '@/components/SystemBox.vue';
import { ElMessage } from 'element-plus';
export default {
  components:{
    SystemBox,
  },
  data () {
    return {
        shopping:'',
        number:0,
        moeny:0,
        isSettlement:false,
        isAddress:false
    }
  },
  created() {
    this.setGWC()
  },
  mounted() {
  },
  methods: {
    settlement(){
        this.isSettlement = true;
    },
    Move(item){
        this.$request({
            url:'/st/remove',
            method:"post",
            data:{ids:[item] }
        }).then(({data})=>{
            if(data.code==200&&data.data){
                ElMessage.success(data.msg)
                this.setGWC()
            }else{
                ElMessage.error(data.msg)
            }
        })
    },
    handleSelectionChange(val){
        console.log(val);
    },
    setNumber(data){
        let num=0,moeny=0;
        data.forEach(item => {
            num = num + item.stArticleCount;
            moeny = moeny+(item.articleDTO.articleDiscount*item.stArticleCount)
        });
        // console.log(num,moeny);
        return {num,moeny};
    },
    setGWC(){
        console.log("是否有用户信息",this.$store.state.user.userPhone);
        this.$request({
            url:"/st/get",
            method:"post",
            data:{
                pageNum:1,
                pageSize:10
            }
        }).then(({data})=>{
            // console.log(data.rows.stArticleCount);
            this.shopping = data.rows;
            let {num,moeny} = this.setNumber(data.rows)
            this.number = num;
            this.moeny = moeny;
        })
    },
    handleChange(value,item){
        console.log(value,item);
        this.$request({
            url:'/st/editCount',
            method:"post",
            data:{
                id: item.id,
                stArticleCount: value,
                stArticleId: item.stArticleId
            }
        }).then(({data})=>{
            if(data.code==200&&data.data){
                console.log(data);
                let {num,moeny} = this.setNumber(this.shopping)
                this.number = num;
                this.moeny = moeny;
                ElMessage.success(data.msg)
            }else{
                item.stArticleCount = 1;
                ElMessage.error(data.msg)
            }
        })
         

    }
  }
}

</script>

<style lang='less' scoped>
.homeMainBox{
    // display: flex;
    width: 100%;
    .infoBox{
        display: flex;
        align-items: center;
        span{
            padding-left: 10px;
        }
    }
    .moneyText{
        color: red;
        font-weight: bold;
    }
    ::v-deep .el-button--text{
        color: #46287d;
        &：hover{
            color: #46287d;
        }
    }
    .foot{
        margin: 10px 0;
        text-align: right;
        padding-right: 25px;
        span{
            margin-right: 15px;
        }
        ::v-deep .el-button--primary {
            border-color: #714ea7;
            background-color: #714ea7;
        }
    }
}
::v-deep .el-dialog{
    .dialogMain{
        width: 100%;
        display: flex;
        justify-content: center;
        border: 1px solid #ccc;
    }
    .dialogFooter{
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    .el-button--primary {
        border-color: #714ea7;
        background-color: #714ea7;
    }
}
</style>
