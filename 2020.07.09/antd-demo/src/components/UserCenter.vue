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
        <!-- 删除 -->
        <a-button type="primary" @click="delUser">删除</a-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <!-- 修改 -->
        <a-button type="primary" @click="delUser">修改</a-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <!-- 分配工作 -->
        <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start">分配工作组</a-button>
        
        <!-- 表格 -->
        <span style="margin-left: 8px">
          <template v-if="hasSelected">{{ `Selected ${selectedRowKeys.length} items` }}</template>
        </span>
      </div>
    
    </div>
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="data"
    />
      <!-- 分配工作组弹出框 -->
    <a-modal v-model="visible" title="分配工作组" @ok="handleOk" width='600px' >
      <UserModel></UserModel>
    </a-modal>
    <!-- 增加弹出框 -->
    <a-modal v-model="addText" title="新增" width='600px' ok-text="确认" cancel-text="取消" @ok="hideModal">
        <a-input v-model="adduname" placeholder='请输入用户名'></a-input>
        <a-input v-model="addname" placeholder='请输入姓名'></a-input>
        <a-input v-model="addpost" placeholder='请输入岗位'></a-input>
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
import UserModel from '@/components/UserModel.vue'
import  '../mock/mock.js';
import axios from 'axios';
export default {
  name:'UserCenter',
  components: {
    UserModel
  },
  data() {
    return {
      data:[],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      visible:false,
      addText:false,
      uname:'',
      userlist:'',
      adduname:'',
      addname:'',
      addpost:''
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },
  methods: {
    start() {
      this.visible = true;
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    // 分配工作按钮
     handleOk(e) {
      this.visible = false;
    },
    // 添加和修改事件
    hideModal(e){
      var user={
        key:this.userlist.length+1,
        uname:this.adduname,
        name:this.addname,
        post:this.addpost
      }
      this.userlist.push(user);
      this.addText=false;
      this.adduname='';
      this.addname='';
      this.addpost='';
    },
    // 删除事件
    delUser(){
      for(let i=0;i<this.selectedRowKeys.length;i++){
        this.data=this.data.filter(items=>{
          return items.key!=this.selectedRowKeys[i];
        })
        setInterval(500)
      }
      this.selectedRowKeys.length=null;
    }
    ,
    //查询代码
   serch(){
     if(this.uname =='' || this.uname == null){
       this.data=this.userlist;
     }else{
       this.data=this.userlist;
       this.data=this.data.filter(items=>{
       return items.uname==this.uname;
     });
     }
   },

   add(){
     this.addText=true;
   }
  },
  mounted () {
    axios.post('Userlist.com').then((Userlist) => {//这里post和get都行
                this.data=Userlist.data;
                this.userlist=Userlist.data;
            })
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