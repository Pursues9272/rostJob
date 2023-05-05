<template>
  <div>
    <SystemBox title="订单管理">
        <el-table :data="indentData">
            <el-table-column prop="orderPrice" label="总价格" />
            <el-table-column prop="orderType" label="订单状态" >
                <template #default="scope">
                    {{ orederType[scope.row.orderType] }}
                </template>
            </el-table-column>
            <el-table-column prop="orderAddressDTO.addressName" label="收货人" />
            <el-table-column prop="orderAddressDTO.addressPhone" label="收货人手机号" />
            <el-table-column prop="orderAddressDTO.addressInfo" label="收货地址" />
            <el-table-column prop="orderSendDate" label="下单时间" />
            <el-table-column  label="操作" >
                <template #default="scope">
                    <el-button @click="payment(scope.row.id)" type="text">二次支付</el-button>
                    <el-button @click="details(scope.row.id)"  type="text">详情</el-button>
                </template>
            </el-table-column>
            <!-- payment -->
        </el-table>
    </SystemBox>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import SystemBox from '../../components/SystemBox.vue'
export default {
  components: { SystemBox },
  data () {
    return {
        indentData:'',
        orederType:['已付款','稍后付款','放弃付款']
    }
  },
  created() {
    this.setIndent()
  },
  mounted() {
  },
  methods: {
    setIndent(){
        this.$request({
            url:"/order/list",
            method:"post",
            data:{
                pageNum:1,
                pageSize:10,
                tag:0
            }
        }).then(({data})=>{
            console.log(data);
            this.indentData = data.rows;
        })
    },
    // 二次支付
    payment(id){
        this.$request({
            url:"/order/getPay/"+id,
            method:"get"
        }).then(({data})=>{
            console.log(data);
            if(data.code ==200){
                ElMessage.success(data.msg)
            }else{
                ElMessage.msg(data.msg)
            }
        })
    },
    details(id){
        this.$request({
            url:"/order/get/"+id,
            method:"get"
        }).then(({data})=>{
            console.log(data.data);
        })
    }
  }
}

</script>

<style lang='less' scoped>

</style>
