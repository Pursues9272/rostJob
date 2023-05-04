<template>
  <div>
    新增地址
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  name: '',
  data () {
    return {
        addressList:{
            addressInfo:'',
            addressName:'',
            addressPhone:'',
        }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    initAddress(){
        this.$request({
            url:'/address/add',
            method:"post",
            data:addressList
        }).then(({data})=>{
            if(data.code==200 && data.data){
                ElMessage.success(data.msg)
            }else{
                ElMessage.error(data.msg)
            }
        })
    }
  }
}

</script>

<style lang='less' scoped>

</style>
