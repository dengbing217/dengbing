<template>
     <a-layout id="components-layout-demo-top-side-2" style="min-height: 100vh">
    <a-layout-header class="header" style="background: #fff; padding: 0">
      <div class="logo">
        <img src="../assets/1.png" />
        中国交建· 统一监控管理平台
      </div>
      <div class="herder-left">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </div>
      <div class="herder-right">
        <a-dropdown>
          <a-button>
            <img src="../assets/avatar.jpg" style="width:15px;margin-top:-4px" />超级管理员
          </a-button>
          <a-menu slot="overlay">
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">重置密码</a>
            </a-menu-item>
            <a-menu-item>
              <a @click.prevent="login">退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible style="width:300px">
        <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="setting" />
              <span>系统设置</span>
            </span>
            <a-menu-item key="2">
              <router-link to="/zhongjiao/user">用户管理</router-link>
            </a-menu-item>
            <a-menu-item key="3">
              <router-link to="/zhongjiao/monly">工资管理</router-link>
            </a-menu-item>
            <a-menu-item key="4">
              <router-link to="/zhongjiao/count">审计管理</router-link>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content>
          <div>
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
#components-layout-demo-top-side-2 .logo {
  width: 200px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  float: left;
}
#components-layout-demo-top-side-2 .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-top-side-2 .trigger:hover {
  color: #1890ff;
}
.herder-left {
  float: left;
  width: 150px;
}
.herder-right {
  float: right;
  width: 180px;
}
</style>

<script >

export default {
    
  data() {
    return {
      collapsed: false,
      views: true
    };
  },
  methods: {
      login:function(){
        sessionStorage.removeItem('uname');
        this.$router.push(
            { path: '/login', 
             }
        )
      },
  }
};
</script>

