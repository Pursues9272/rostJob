<template>
  <div>
    <SystemBox title="用户管理">
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
                    <el-button type="text" @click="setUpdata(scope.row)">修改</el-button>
                    <el-button type="text" @click="setMove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </SystemBox>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import SystemBox from '../../components/SystemBox.vue'
export default {
  components:{
    SystemBox
  },
  data () {
    return {
        userPage:{
            pageNum:1,
            pageSize:10
        },
        userData:''
    }
  },
  created() {
    this.userList()
  },
  mounted() {
  },
  methods: {
    setUpdata(item){},
    setMove(item){},
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
            // }else{
            //     ElMessage.error(data.msg)
            // }
        })
    }
  }
}

</script>

<style lang='less' scoped>

</style>
