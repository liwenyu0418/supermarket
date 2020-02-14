<template>
  <div class="login">
    <h3 class="title">小鱼超市管理系统登录</h3>
    <!-- model：表单数据对象
         rules：表单验证规则	
         ref：作用同ID
         status-icon:是否在输入框中显示校验结果反馈图标
         label-width:表单域标签的宽度      
    -->
    <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm">
      <!-- 
        label ：标签文本
        prop  ：表单域 model 字段，和验证器的名称匹配
        prefix-icon：前置图标  prefix-icon="el-icon-user-solid"放在标签内
      -->
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" autocomplete="off" placeholder="用户名">
          <!-- 插槽方式
                  slot=“” ： 插槽名称（v2.6+ ： v-slot：插槽名称）
          -->
          <i slot="prefix" class="el-icon-user-solid"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
          placeholder="密码"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 引入接口
import { doLogin } from "@/api/index.js";
export default {
  data() {
    return {
      loginForm: {
        username: "婉儿",
        password: "111111"
      },
      // 表单验证规则，用表单的prop属性名  :  规则数组
      rules: {
        // 用户名
        username: [
          /*required：是否必填，如不设置，则会根据校验规则自动生成
            message：提示信息
            trigger：验证时机
          */
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        //密码
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      // debugger;
      const vm = this;
      // 获取到表单
      const form = vm.$refs.loginForm;
      //表单整体验证
      form.validate(valid => {
        if (valid) {
          // 如果符合验证规则，发送ajax请求
          doLogin(this.loginForm).then(data => {
            if (data.success) {
              vm.$message({
                // 提示信息
                message: data.message,
                type: "success",
                // 消息提示时间
                duration: 2000,
                // 关闭时的回调函数
                onClose: () => {
                  //登陆成功后，把响应得到的token存储在localstorage里,为全局守卫判断做准备
                  localStorage.setItem("token", data.token);
                  // 跳转页面
                  this.$router.replace("/home/dashbroad");
                }
              });
            } else {
              vm.$message.error(data.message);
            }
          });
        } else {
          vm.$message({
            //是否显示关闭按钮
            showClose: true,
            message: "登录失败，请检查用户名和密码！！！",
            type: "error",
            duration: 3000
          });
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  background-image: url("../assets/images/banner.jpg");
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .el-form {
    margin-top: 15px;
    width: 400px;
  }

  .el-button {
    width: 100%;
  }
}
</style>