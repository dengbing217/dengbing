<template>
  <div class="Monly">
   
    <div class="center">
        <MonlyCenter></MonlyCenter>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 100px;
}
.center {
  widows: 100%;
  height: 100%;
  background: #fafafa;
}
.Monly{
    background: #fafafa;
}
</style>

<script>
import MonlyCenter from "@/components/MonlyCenter.vue";
export default {
  name: "Monly",
  components: {
    MonlyCenter
  }
};
</script>