<template>
    <div class="loginCenter">
        <a-form-model
        layout="inline"
        :model="formInline"
        @submit="handleSubmit"
        @submit.native.prevent
        :rules="rules"
        
      >
          <a-form-model-item ref="user" prop="user">
            <a-input v-model="formInline.user" placeholder="账号" style="width:300px" >
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <div></div>
       
          <a-form-model-item ref="password" prop="password">
            <a-input
              v-model="formInline.password"
              type="password"
              placeholder="密码"
              style="width:300px"
            >
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <div></div>
       
          <a-form-model-item>
            <a-button
              type="primary"
              html-type="submit"
              style="width:300px"
            >登录</a-button>
          </a-form-model-item>
      </a-form-model>
    </div>
</template>

<style lang="less" scoped>
    .loginCenter{
       width: 350px;
       height: 320px;
       display: flex;
       justify-content: center;
       align-items: center;

    }
    div{
        height: 30px;
    }
</style>





<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
       rules: {
        user: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 12, message: '最大长度为12', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 12, message: '最大长度为12', trigger: 'blur' },
        ],
       }
    };
  },
  methods: {
    handleSubmit(e) {
      if (this.formInline.user == "admin" &&this.formInline.password == "123456") {
        
        sessionStorage.setItem('uname', true); // 设置本地存储信息 
        var urlName=sessionStorage.getItem('url');
        this.$router.push(this.$route.query.redirect);
        if(urlName==null || urlName==''){
          this.$router.push(
                { path: '/zhongjiao',
                }
        );
        }else{
          var url=urlName.substring(22);
          this.$router.push(
                { path: url,
                }
        );
        alert('登录成功')
        }
        console.log(this.$route)
        this.formInline.user='';
        this.formInline.password='';
      } else {
        alert("登录失败");
      }
    }
  }
};
</script>