<template>
  <div>
    <SystemBox title="地址管理">
        <div class="dialogHeader">
          <el-button class="addstyle" type="primary" @click="isAddress=true" >新增收货地址</el-button>
          <el-table :data="addressList">
            <el-table-column prop="addressName" label="姓名" />
            <el-table-column prop="addressPhone" label="收货地址"/>
            <el-table-column prop="addressInfo" label="收货地址" />
            <el-table-column prop="addressInfo" label="收货地址" />
            <el-table-column  label="操作" width="180" >
                <template #default="scope">
                <el-button type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
    </SystemBox>
  </div>
</template>

<script>
import SystemBox from '../../components/SystemBox.vue'
export default {
  components:{
    SystemBox
  },
  data () {
    return {
        isAddress:false,
        addressList:'',
    }
  },
  created() {
    this.setAddress()
  },
  mounted() {
  },
  methods: {
    setAddress(){
        this.$request({
            url:"/address/list",
            method:"post",
            data:{
                creationTime:"",
                lastAccessedTime:"",
                pageNum:1,
                pageSize:2
            }

        }).then(({data})=>{
            this.addressList = data.rows
        })
    },
  }
}

</script>

<style lang='less' scoped>
.dialogHeader{
        // height: 150px;
        width: 100%;
        // border: 1px solid #ccc;
        position: relative;
        margin-top: 60px;
        .address-box{
            display: flex;
            justify-content: space-between;
            width: 100%;
            border-bottom: 1px solid #ccc;
            padding: 5px; 
            max-height: 120px;
            overflow-y:auto ;
        }
        .addstyle{
            position: absolute;
            right: 20px;
            top: -35px;
        }

    }
</style>
