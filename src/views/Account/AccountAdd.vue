<template>
  <div class="account-add">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>账号添加</h3>
      </div>
      <!-- 添加用户表单 -->
      <div>
        <!-- 
         model：表单数据对象
         rules：表单验证规则	
         ref：作用同ID
         status-icon:是否在输入框中显示校验结果反馈图标
         label-width:表单域标签的宽度     
        -->
        <el-form
          :model="accountAddForm"
          status-icon
          :rules="rules"
          ref="accountAddForm"
          label-width="100px"
          class="demo-accountAddForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model.number="accountAddForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="accountAddForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="accountAddForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户角色" prop="role">
            <el-select v-model="accountAddForm.role" placeholder="请选择">
              <!-- 
              label ： 下拉框显示的值
              value ： 下拉框传递的值
              -->
              <el-option label="超级管理员" value="1"></el-option>
              <el-option label="普通管理员" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入api调axios的模块
import { addAccount } from "@/api/account.js";
export default {
  data() {
    // 自定义校验函数
    const vm = this;
    //密码  validateField	对部分表单字段进行校验的方法
    const checkPassword1 = (rule, value, callback) => {
      // 密码为空时
      if (value === "") {
        callback(new Error("请输入您的密码！"));
      } else {
        // 输入密码，有值时
        // 如果确认密码也输入了值
        if (vm.accountAddForm.checkPass !== "") {
          //  校验确认框的值是否符合规则
          vm.$refs.accountAddForm.validateField("checkPass");
        }
        //  如果符合规则，就通过
        callback();
      }
    };

    //确认密码  validateField	对部分表单字段进行校验的方法
    const checkPassword2 = (rule, value, callback) => {
      // 密码为空时
      if (value === "") {
        callback(new Error("请确认您的密码！"));
      } else {
        // 密码有值时
        // 如果确认密码也输入了值，直接和密码框的内容进行比较
        if (value === vm.accountAddForm.password) {
          //  如果两次密码一致
          callback();
        } else {
          callback(new Error("两次密码不一致哦！"));
        }
      }
    };
    return {
      accountAddForm: {
        username: "",
        password: "",
        checkPass: ""
      },
      value: "",
      rules: {
        username: [
          // 引用规则
          { required: true, message: "请输入您的账号", trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度在 2 到 12个字符，不能以数字开头",
            trigger: "blur"
          }
        ],
        password: [
          // 自定义密码规则
          {
            validator: checkPassword1, //校验规则也是一个函数，放在data数据里
            trigger: "blur"
          }
        ],
        checkPass: [
          // 自定义确认密码规则
          {
            validator: checkPassword2, //校验规则也是一个函数，放在data数据里
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      // validate	 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      this.$refs.accountAddForm.validate(valid => {
        if (valid) {
          // 如果符合成功正则表达,发送axios请求
          addAccount(this.accountAddForm).then(res => {
            if (res.success) {
              // 如果发送成功，返回success
              // debugger;
              this.$message({
                showClose: true,
                message: res.message,
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.$router.push("/home/account-list");
                }
              });
            } else {
              // 如果发送失败
              this.$message.error(res.message);
            }
          });
        } else {
          // 如果不成功
          this.$message.error("账号添加失败，请检查您的信息！");
        }
      });
    },
    resetForm() {}
  }
};
</script>