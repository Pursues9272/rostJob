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
        <div class="messBox-left" v-if="boluserItem === -1"></div>
        <div class="messBox-right">
          <div class="rigBox">
            <div class="rigBox-li r-text">
              <span class="rigBox-text">设计开发喝咖啡</span>
            </div>
          </div>
          <div class="rigBottom">
            <el-input v-model="messInput" placeholder="请输入消息" clearable />
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
      messList: [],
    };
  },
  watch: {
    contisBut(val) {
      this.netcontisBut = val;
    },
    userItem(val) {
      this.boluserItem = val;
    },
  },
  created() {},
  mounted() {
    this.messInit();
  },
  computed: {},
  methods: {
    messInit() {
      // 聊天列表
      let purDat = {};
      this.$request
        .post("/ur/getChatList", purDat)
        .then(({ data: list }) => {
          console.log("查询聊天列表list=>", list);
        })
        .catch((error) => {
          console.log("查询聊天列表error=>", error);
        });
    },
    dialogclose() {
      this.netcontisBut = false;
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
            this.$request
              .post("/ur/getChatRecord", miId)
              .then(({ data: list }) => {
                console.log("聊天记录list=>", list.rows);
                this.messList = list.rows;
              });
          }
        })
        .catch((error) => {
          console.log("发送消息error=>", error);
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
        width: 100%;
        height: 300px;
        background-color: aqua;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        .messBox-left {
          width: 300px;
          height: 100%;
          background-color: #643cb1;
        }
        .messBox-right {
          width: 100%;
          height: 100%;
          background-color: aquamarine;
          display: flex;
          flex-flow: column nowrap;
          .rigBox {
            width: 100%;
            height: calc(100% - 50px);
            // background-color: rgb(67, 12, 12);
            .rigBox-li {
              width: 100%;
              min-height: 30px;
              background-color: red;
              display: flex;
              flex-flow: row nowrap;
            }
            .r-text {
              display: flex;
              flex-flow: row nowrap;
              justify-content: flex-end;
            }
            .l-text {
              display: flex;
              flex-flow: row nowrap;
              justify-content: flex-start;
            }
            .rigBox-text {
              min-height: 30px;
              background-color: rgba(101, 60, 177, 0.3);
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
