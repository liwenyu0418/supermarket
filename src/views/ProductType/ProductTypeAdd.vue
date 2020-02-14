<template>
  <div class="product-type-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品分类增加</span>
      </div>
      <div>
        <!-- 
         model：表单数据对象
         rules：表单验证规则	
         ref：作用同ID
         status-icon:是否在输入框中显示校验结果反馈图标
         label-width:表单域标签的宽度     
        -->
        <el-form
          :model="producttypeaddForm"
          :rules="rules"
          status-icon
          ref="producttypeaddForm"
          label-width="100px"
          class="demo-producttypeaddForm"
        >
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="producttypeaddForm.name" style="width:300px"></el-input>
          </el-form-item>
          <!-- 计数器
          controls-position：	控制按钮位置
          max：设置计数器允许的最大值
          -->
          <el-form-item label="分类序号" prop="order">
            <el-input-number
              v-model="producttypeaddForm.order"
              controls-position="right"
              :min="1"
              :max="100"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="分类说明" prop="desc">
            <el-input type="textarea" v-model="producttypeaddForm.desc"></el-input>
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
// 引入商品分类增加接口
import { addproducttype } from "@/api/productType.js";
export default {
  data() {
    return {
      producttypeaddForm: {
        name: "",
        order: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入商品分类名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleChange() {},
    // 点击提交按钮时间
    submitForm() {
      this.$refs.producttypeaddForm.validate(valid => {
        if (valid) {
          //如果验证成功发送ajax请求
          addproducttype(this.producttypeaddForm).then(data => {
            if (data.success) {
              // 如果后台返回的数据显示保存成功，给提示信息，并跳转到列表页
              this.$message({
                showClose: true,
                message: data.message,
                type: "success",
                onClose: () => {
                  this.$router.push("/home/producttype-list");
                }
              });
            } else {
              this.$message.error(data.message);
            }
          });
        } else {
          // 如果不成功
          this.$message.error("账号添加失败，请检查您的信息！");
        }
      });
    },
    resetForm() {
      this.$refs.producttypeaddForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  width: 400px;
}
</style>