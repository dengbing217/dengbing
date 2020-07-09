<template>
  <div class="User">
    <!-- 内容部分 -->
    <div class="center">
      <UserCenter></UserCenter>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UserCenter from "@/components/UserCenter.vue";

export default {
  name: "User",
  components: {
    UserCenter
  }
};
</script>

<style lang="less" scoped>

.center {
  widows: 100%;
  height: 100%;
  background: #FAFAFA;
}
.User{
  background: #FAFAFA;
}
</style>