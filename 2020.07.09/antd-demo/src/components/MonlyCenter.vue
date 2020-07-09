<template>
  <div class="MonlyCenter">
    <form>
      <div class="from">
        <div class="form-input">
          <div class="form-input-left">
            组编号：
            <a-input style="width:80%" />
          </div>
          <div class="form-input-right">
            组名称：
            <a-input style="width:80%" />
          </div>
        </div>
        <div class="form-submit">
          <a-button type="primary">查询</a-button>
        </div>
      </div>
    </form>
    <div style="margin-bottom: 16px">
      <div class="cente-button">
        <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start">分配用户</a-button>

        <span style="margin-left: 8px">
          <template v-if="hasSelected">{{ `Selected ${selectedRowKeys.length} items` }}</template>
        </span>
      </div>
    </div>
    <a-modal v-model="visible" title="分配工作组" @ok="handleOk" width="600px">
      <MonlyModel1></MonlyModel1>
    </a-modal>
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="data"
    />
  </div>
</template>
<script>
const columns = [
  {
    title: "工作组编号",
    dataIndex: "Team number"
  },
  {
    title: "工作组名称",
    dataIndex: "Team name"
  },
  {
    title: "有效标志",
    dataIndex: "Valid sign"
  }
];
import MonlyModel1 from "@/components/monlyModel1.vue";
import '@/mock/mock.js'
import Axios from 'axios';
export default {
  name: "MonlyCenter",
  components: {
    MonlyModel1
  },
  data() {
    return {
      visible: false,
      data:[],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false
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
    handleOk(e) {
      console.log(e);
      this.visible = false;
    }
  },
  mounted () {
    Axios.post('MoneyList.com').then(money=>{
      this.data=money.data;
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