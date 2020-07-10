<template>
  <div class="UserCenter">
    <form>
      <div class="from">
        <div class="form-input">
          <div class="form-input-left">
            用户名：
            <a-input style="width:80%" v-model="uname" />
          </div>
          <div class="form-input-right">
            姓名：
            <a-input style="width:80%" />
          </div>
        </div>
        <div class="form-submit">
          <a-button type="primary" @click="serch">查询</a-button>
        </div>
      </div>
    </form>
    <div style="margin-bottom: 16px">
      <div class="cente-button">
        <!-- 增加 -->
        <a-button type="primary" @click="add">增加</a-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <!-- 修改 -->
        <a-button type="primary" @click="editUser">修改</a-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <!-- 删除 -->
        <a-button type="primary" @click="delUser">删除</a-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      
        <!-- 分配工作 -->
        <!-- <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start">分配工作组</a-button> -->

        <!-- 表格 -->
        <span style="margin-left: 8px">
          <template v-if="hasSelected">{{ `选择 ${selectedRowKeys.length} 行` }}</template>
        </span>
      </div>
    </div>
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="data"
    />
    <!-- 分配工作组弹出框 -->
    <a-modal v-model="visible" title="分配工作组" @ok="handleOk" width="600px">
      <UserModel></UserModel>
    </a-modal>
    <!-- 增加弹出框 -->
    <a-modal
      v-model="addText"
      title="新增"
      width="600px"
      ok-text="确认"
      cancel-text="取消"
      @ok="hideModal"
    >
      <!-- 隐藏key值 -->
      <input type="hidden" v-model="key" />
      <a-input v-model="adduname" placeholder="请输入用户名"></a-input>
      <a-input v-model="addname" placeholder="请输入姓名"></a-input>
      <a-input v-model="addpost" placeholder="请输入岗位"></a-input>
    </a-modal>
  </div>
</template>
<script>
const columns = [
  {
    title: "用户名",
    dataIndex: "uname"
  },
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "岗位",
    dataIndex: "post"
  }
];
import UserModel from "@/components/UserModel.vue";
import "../mock/mock.js";
import axios from "axios";
export default {
  name: "UserCenter",
  components: {
    UserModel
  },
  data() {
    return {
      data: [],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      visible: false,
      addText: false,
      uname: "",
      userlist: "",
      adduname: "",
      addname: "",
      addpost: "",
      key: ""
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },
  methods: {
    // start() {
    //   this.visible = true;
    //   this.loading = true;
    //   // ajax request after empty completing
    //   setTimeout(() => {
    //     this.loading = false;
    //     this.selectedRowKeys = [];
    //   }, 1000);
    // },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    // 分配工作按钮
    handleOk(e) {
      this.visible = false;
    },
    // 添加和修改事件
    hideModal(e) {
      if (this.key == null || this.key=='') {
        var user = {
          key: this.data.length + 2,
          uname: this.adduname,
          name: this.addname,
          post: this.addpost
        };
        this.data.unshift(user);
        alert('增加成功');
      } else {
        this.data.some(edit=>{
          if(edit.key==this.key){
            edit.uname=this.adduname,
            edit.name=this.addname,
            edit.post=this.addpost
            return true;
          }
        })
         alert('修改成功')
      }
      this.selectedRowKeys.length=0;
      this.adduname = "";
      this.addname = "";
      this.addpost = "";
      this.key='';
      this.addText = false;
    },
    // 删除事件
    delUser() {
      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        this.data = this.data.filter(items => {
          return items.key != this.selectedRowKeys[i];
        });
        setInterval(500);
      }
      this.selectedRowKeys.length = null;
      alert('删除成功')
    },
    //查询代码
    serch() {
      if (this.uname == "" || this.uname == null) {
        this.data = this.userlist;
      } else {
        this.data = this.userlist;
        this.data = this.data.filter(items => {
          return items.uname == this.uname;
        });
      }
    },

    add() {
      this.addText = true;
    },
    //  修改准备工作
    editUser() {
      if (this.selectedRowKeys.length == 1) {
        var editList = this.data.filter(edit => {
          return edit.key == this.selectedRowKeys[0];
        });
        this.key = editList[0].key;
        this.adduname = editList[0].uname;
        this.addname = editList[0].name;
        this.addpost = editList[0].post;
        this.addText = true;
      } else {
        alert("只能选择一行数据进行修改");
      }
    }
  },
  mounted() {
    axios.post("Userlist.com").then(Userlist => {
      //这里post和get都行
      this.data = Userlist.data;
      this.userlist = Userlist.data;
    });
  }
};
</script>

<style lang="less" scoped>
.cente-button {
  width: 100%;
  margin-bottom: 10px;
  margin-left: 20px;
}
* {
  margin: 0;
  padding: 0;
}
.from {
  width: 100%;
  height: 80px;
  margin-top: 25px;
}
.form-input {
  float: left;
  margin: 15px;
  width: 70%;
}
.form-input-left {
  width: 40%;
  float: left;
}
.form-input-right {
  .form-input-left;
  float: right;
}
.form-submit {
  float: right;
  width: 20%;
  margin-top: 20px;
}
.header-button {
  margin-left: 20px;
}
.center-button {
  height: 20%;
  background: #f0f2f5;
}
</style>