<template>
  <div>
    <SystemBox title="用户管理">
      <div class="userBox">
        <el-table :data="userData" style="width: 100%">
            <el-table-column prop="id" label="用户编号" />
            <el-table-column prop="userName" label="昵称" />
            <el-table-column prop="userRealName" label="真实姓名" />
            <el-table-column prop="userPhone" label="电话" />
            <el-table-column prop="userGender" label="性别" >
                <template #default="scope">
                    {{ scope.row.userGender?'女':'男' }}
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template #default="scope">
                    <el-button type="text" @click="image.png(scope.row)">修改</el-button>
                    <el-button type="text" @click="setMove(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-box">
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :current-page="userPage.pageNum" 
        :page-size="userPage.pageSize" :page-sizes="[10, 20, 40]"    
        @size-change="handleSize"
        @current-change="handleCurrent" :total="total" />
        </div>
      </div>
    </SystemBox>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import SystemBox from "../../components/SystemBox.vue";
export default {
  components: {
    SystemBox,
  },
  data() {
    return {
        userPage:{
            pageNum:1,
            pageSize:10
        },
        userData:'',
        total:0,
    }
  },
  created() {
    this.userList();
  },
  mounted() {},
  methods: {
    handleSize(val){
      this.userPage.pageNum = 1
      this.userPage.pageSize = val
      this.userList()
    },
    handleCurrent(val){
      this.userPage.pageNum = val
      this.userList()
    },
    setUpdata(item){},
    setMove(item){
      this.$request({
        url:'/user/remove',
        method:'post',
        data:{
          // id:[item]
          id:item
        }
      }).then(({data})=>{
        ElMessage.success(data.msg)
      })
    },
    setAdd(){

    },
    userList(){
        this.$request({
            url:'/user/list',
            method:"post",
            data:this.userPage
        }).then(({data})=>{
            // if(data.code==200){
                this.userData = data.rows
                this.total = data.total
            // }else{
            //     ElMessage.error(data.msg)
            // }
        })
    }
  }
}

</script>

<style lang='less' scoped>
.userBox{
  display: flex;
  flex-direction: column;
  width: 100%;
  .pagination-box{
    margin: 10px;
    display: flex;
    justify-content: right;
  }
}
</style>
