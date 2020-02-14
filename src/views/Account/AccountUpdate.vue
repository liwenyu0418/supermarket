<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <div>
        <el-form
          :model="accountUpdeteForm"
          status-icon
          :rules="rules"
          ref="accountUpdeteForm"
          label-width="100px"
          class="demo-accountUpdeteForm"
        >
          <el-form-item label="原密码" prop="passwordOld">
            <el-input type="password" v-model.number="accountUpdeteForm.passwordOld"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passwordNew">
            <el-input type="password" v-model="accountUpdeteForm.passwordNew" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="accountUpdeteForm.checkPass" autocomplete="off"></el-input>
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
export default {
  data() {
    // 自定义校验函数
    const vm = this;
    //密码  validateField	对部分表单字段进行校验的方法
    const checkPassword1 = (rule, value, callback) => {
      // 密码为空时
      if (value === "") {
        callback(new Error("请输入您的新密码！"));
      } else {
        // 输入密码，有值时
        // 如果确认密码也输入了值
        if (vm.accountUpdeteForm.checkPass !== "") {
          //  校验确认框的值是否符合规则
          vm.$refs.accountUpdeteForm.validateField("checkPass");
        }
        //  如果符合规则，就通过
        callback();
      }
    };

    //确认密码  validateField	对部分表单字段进行校验的方法
    const checkPassword2 = (rule, value, callback) => {
      // 密码为空时
      if (value === "") {
        callback(new Error("请确认您的新密码！"));
      } else {
        // 密码有值时
        // 如果确认密码也输入了值，直接和密码框的内容进行比较
        if (value === vm.accountUpdeteForm.passwordNew) {
          //  如果两次密码一致
          callback();
        } else {
          callback(new Error("两次密码不一致哦！"));
        }
      }
    };
    return {
      accountUpdeteForm: {
        passwordOld: "",
        passwordNew: "",
        checkPass: ""
      },
      rules: {
        passwordOld: [
          // 引用规则
          { required: true, message: "请输入您的旧密码", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "不能以数字开头，长度在 3 到 12个字符",
            trigger: "blur"
          }
        ],
        passwordNew: [
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
      this.$refs.accountUpdeteForm.validate(valid => {
        if (valid) {
          // 如果符合成功
          this.$message({
            showClose: true,
            message: "恭喜你，修改成功！",
            type: "success",
            duration: 2000,
            onClose: () => {
              this.$router.push("/home/account-list");
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

<style lang="scss" scoped>
</style>