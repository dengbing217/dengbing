<template>
  <div class="login">
    <div class="content">
        <LoginCenter></LoginCenter>
    </div>
  </div>
</template>


<style lang="less" scoped>
.login {
  position: absolute;
  background: url("../assets/login.jpg");
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

<script>
import LoginCenter from '@/components/LoginCenter.vue';
export default {
  name:'login',
  components: {
    LoginCenter
  }
}
</script>
