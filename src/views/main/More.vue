<template>
  <div>
    <SystemMain
      typex="1"
      itemKey1="userPhone"
      itemKey2="userName" :pageSize="pageList.pageSize" :pageNum ="pageList.pageNum" isMove="true"
    ></SystemMain>
  </div>
</template>

<script>
import SystemMain from "@/components/SystemMain.vue";

export default {
  components: {
    SystemMain,
  },
  data() {
    return {
      pageList: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  mounted(){
    this.details()
  },
  methods:{
    details(){
      
    }
  }
};
</script>

<style lang="less" scoped></style>
