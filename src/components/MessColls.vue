<template>
  <div class="join-group">
    <!-- 消息弹窗 -->
    <el-dialog
      @close="dialogclose"
      v-model="netcontisBut"
      title="聊天"
      width="50%"
      center
      draggable
      @open="grobdialogopen"
    >
      <div class="messBox">
        <div class="messBox-left" v-if="userItem === -1">
        <!-- <div class="messBox-left"> -->
          <ul>
            <li v-for="(item,index) in purList" :key="index" @click="setPur(item.chatUserDTO.id)" >
              <span>{{ item.chatUserDTO.userName }}</span>
              <!-- unreadCount chatCount -->
              <span class="span-number" v-if="item.unreadCount">{{ item.unreadCount }}</span>
            </li>
          </ul>
        </div>
        <div class="messBox-right">
          <div class="rigBox" ref="rigBox">
            <!-- <div class="rigBox-li r-text">
              <span class="rigBox-text">设计开发喝咖啡</span>
            </div> -->
            <div class="rigBox-li" v-for="(item,index) in messList" :key="index" :class="item.urAddresseeId==boluserItem?'r-text':'l-text'" >
              <span class="rigBox-text">{{ item.urInfo }}</span>
            </div>
          </div>
          <div class="rigBottom">
            <el-input v-model="messInput" placeholder="请输入消息" @keyup.enter="sendMess"  clearable />
            <el-button type="primary" @click="sendMess">发送</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "MessColls",
  props: {
    contisBut: {
      type: Boolean,
      default: true,
    },
    userItem: {
      type: Number,
      default: 26,
    },
  },
  data() {
    return {
      netcontisBut: this.contisBut,
      boluserItem: this.userItem,
      messInput: "",
      messList: [],//聊天记录
      purList:"",//聊天用户
      timer:null,
    };
  },
  watch: {
    contisBut(val) {
      this.netcontisBut = val;
      // this.boluserItem = -1;
      this.messInit();
    },
    userItem(val) {
      this.boluserItem = val;
      this.getRecord(val);
    },
  },
  created() {
    if (this.contisBut) {
      this.timer = window.setInterval(() => {
        this.messInit();
        if(this.boluserItem) this.setPur()
      }, 60000);
    }
  },
  mounted() {
    this.messInit();
  },
  computed: {},
  methods: {
    async setPur(id){
      this.boluserItem = id;
      await this.$request
      .post("/ur/view", {urAddresseeId:id})
      .then(({data})=>{
        console.log(data);
      })
      this.getRecord(id);
      this.messInit();
    },
    getRecord(id){
      this.$request
      .post("/ur/getChatRecord", {urAddresseeId:id})
      .then(({data:list})=>{
        console.log("聊天记录list=>", list.rows);
        this.messList = list.rows;
        this.scrollToBottom();
      })
    },
    messInit() {
      // 聊天列表
      let purDat = {};
      this.$request
        .post("/ur/getChatList", purDat)
        .then(({ data: list }) => {
          console.log("查询聊天列表list=>", list.data.chatUserList);
          this.purList = list.data.chatUserList.filter(item=>item.chatUserDTO)
        })
        .catch((error) => {
          console.log("查询聊天列表error=>", error);
        });
    },
    dialogclose() {
      this.netcontisBut = false;
      if(this.timer) {
        window.clearInterval(this.timer); //关闭
      }
      this.$emit("dialogclose", false);
    },
    grobdialogopen() {
      // 打开
      // let purDat = {
      //     urAddresseeId: 2,
      //     urInfo: "脑瓜子嗡嗡的了吧",
      // }
      // this.$request.post("/ur/send",purDat )
      // .then((data)=>{
      //     console.log("data123=>", data)
      // })
    },
    sendMess() {
      // 发送
      if (this.messInput === "") {
        return;
      }
      let purDat = {
        urAddresseeId: this.boluserItem - 0,
        urInfo: this.messInput,
      };
      this.$request
        .post("/ur/send", purDat)
        .then(({ data: list }) => {
          if (list.data) {
            this.messInput = "";
            let miId = {
              urAddresseeId: this.boluserItem - 0,
            };
            // this.$request
            //   .post("/ur/getChatRecord", miId)
            //   .then(({ data: list }) => {
            //     console.log("聊天记录list=>", list.rows);
            //     this.messList = list.rows;
            //   });
            this.getRecord(this.boluserItem);
            // rigBox
            

          }
        })
        .catch((error) => {
          console.log("发送消息error=>", error);
        });
    },
    scrollToBottom () {
      this.$nextTick(() => {
          const container = this.$refs.rigBox;
          console.log("container",container);
          container.scrollTop = container.scrollHeight;
      });
    },
  },
};
</script>

<style lang="less" scoped>
// 严格模式下必须存在内容
.join-group {
  width: 100%;
  margin: 0;
  padding: 0;
  ::v-deep .el-dialog {
    border-radius: 10px;
    box-sizing: border-box;
    overflow: hidden;
    .el-dialog__header {
      background-color: #643cb1;
      // min-height: 35px;
      margin: 0;
      padding: 15px;
      display: flex;
      align-items: center;
      color: #fff;
      .el-dialog__title {
        padding: 0;
        margin: 0;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        font-weight: 500;
      }
      .el-dialog__close {
        color: #fff;
        font-size: 16px;
      }
    }
    .el-dialog__body {
      min-height: 300px;
      padding: 15px;
      display: flex;
      flex-flow: column nowrap;
      .messBox {
        border: 1px solid #8b8b8b;
        width: 100%;
        height: 300px;
        // background-color: aqua;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        .messBox-left {
          width: 300px;
          height: 100%;
          background-color: #E9E7E6;
          ul,li{ padding:0;margin:0;list-style:none}
          li{
            color: #000;
            padding: 5px 10px;
            border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            .span-number{
              background: red;
              color: #fff;
              padding: 3px 7px;
              border-radius: 50%;
            }
          }
          li:hover{
            background-color: rgba(216,215,215)
          }
        }
        .messBox-right {
          width: 100%;
          height: 100%;
          background-color: rgb(245,245,245);
          display: flex;
          flex-flow: column nowrap;
          .rigBox {
            width: 100%;
            height: calc(100% - 50px);
            overflow: auto;
            // background-color: rgb(67, 12, 12);
            .rigBox-li-header{
              line-height: 50px;
              color: #000;
              padding-left: 10px;
              // background-color: rgb(67, 12, 12);
            }
            .rigBox-li {
              width: 100%;
              min-height: 30px;
              // background-color: rgb(47, 232, 170);
              display: flex;
              flex-flow: row nowrap;
              margin-top: 1%;
              border-bottom: 0.5%;
            }
            .r-text {
              display: flex;
              flex-flow: row nowrap;
              justify-content: flex-end;
              span{
                background-color: rgb(149,236,105);
              }
            }
            .l-text {
              display: flex;
              flex-flow: row nowrap;
              justify-content: flex-start;
              span{
                background-color: #fff;
                border: 1px solid #ccc;
              }

            }
            .rigBox-text {
              color: #000;
              min-height: 30px;
              
              // background-color: rgba(101, 60, 177, 0.3);
              border-radius: 10px;
              display: inline-block;
              // display: flex;
              line-height: 30px;
              // flex-flow: row nowrap;
              // align-items: center;
              padding: 0 10px;
            }
          }
          .rigBottom {
            width: 100%;
            height: 50px;
            background-color: #fff;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
