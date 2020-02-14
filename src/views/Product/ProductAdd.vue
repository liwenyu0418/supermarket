<template>
  <div class="product-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>添加商品卡片名称</h2>
      </div>
      <div>
        <el-form
          :model="productaddform"
          :rules="rules"
          ref="productaddform"
          label-width="100px"
          class="demo-productaddform"
        >
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="productaddform.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="category">
            <el-select v-model="productaddform.category" placeholder="请选择商品分类">
              <el-option
                v-for="type in listtype"
                :key="type.id"
                :label="type.name"
                :value="type.name"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品特色" prop="feature">
            <el-checkbox-group v-model="productaddform.feature">
              <el-checkbox label="新品上市" name="feature" value="新品上市"></el-checkbox>
              <el-checkbox label="第二单半价" name="feature" value="新品上市"></el-checkbox>
              <el-checkbox label="主打商品" name="feature" value="主打产品"></el-checkbox>
              <el-checkbox label="火爆商品" name="feature" value="火爆产品"></el-checkbox>
              <el-checkbox label="祖传手艺" name="feature" value="祖传手艺"></el-checkbox>
              <el-checkbox label="源自重庆" name="feature" value="源自四川"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- 
          show-file-list：是否显示已上传文件列表
          actions：上传组件的请求接口地址（action地址必须为完整地址： http://域名：端口/接口地址）
          on-success：文件上传成功的回调函数       
          -->
          <el-form-item label="商品照片">
            <el-upload
              class="avatar-uploader"
              :action="uploadApi"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="是否促销" prop="isPromotion">
            <el-radio-group v-model="productaddform.isPromotion">
              <el-radio label="促销"></el-radio>
              <el-radio label="不促销"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="包装费">
            <el-input-number
              v-model="productaddform.packingexpense"
              :min="1"
              :max="100"
              label="包装费"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="价格">
            <el-input-number v-model="productaddform.price" :min="1" :max="10" label="价格"></el-input-number>
          </el-form-item>
          <el-form-item label="商品概述" prop="desc">
            <el-input type="textarea" v-model="productaddform.desc"></el-input>
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
// 引入商品增加模块
// uploadApi：   是图片上传接口
// uploadDir：   是照片回填时的服务器路径地址
import { addProduct, uploadApi, uploadDir } from "@/api/product.js";
// 引入商品分类列表，做商品分类部分的动态渲染
import { listproducttype } from "@/api/productType.js";
export default {
  data() {
    return {
      // 配置图片上传接口
      uploadApi: uploadApi,

      // 商品列表页数据
      productaddform: {
        name: "", //名称
        category: "", //分类
        feature: [], //特色
        isPromotion: "", //
        packingexpense: "", //包装费
        price: "", //价格
        desc: "", //商品描述
        inputtime: "", //时间
        imgUrl: "" //照片地址
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        feature: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个商品特色",
            trigger: "change"
          }
        ],
        sale: [
          { required: true, message: "请选择是否促销", trigger: "change" }
        ],
        desc: [{ required: true, message: "请描述商品", trigger: "blur" }]
      },
      // 商品类型分类数据
      listtype: {}
    };
  },
  methods: {
    // 图片上传成功事件，会发送请求
    handleAvatarSuccess(res) {
      // debugger;
      // 照片回填的文件名，再利用后面计算属性，实现完整地址拼装
      // this.imageUrl = res.fileName;这样会缺少地址
      this.productaddform.imgUrl = res.fileName;
    },

    // 表单保存按钮
    submitForm() {
      const vm = this;
      vm.$refs.productaddform.validate(valid => {
        if (valid) {
          debugger;
          // 判断特色多选框的值，存在的话转换为字符串
          if (vm.productaddform.feature) {
            vm.productaddform.feature = JSON.stringify(
              vm.productaddform.feature
            );
          }
          // 如果符合添加规则，发送ajax请求
          addProduct(vm.productaddform).then(res => {
            //成功添加
            if (res.success) {
              vm.$message({
                showClose: true,
                message: res.message,
                type: "success",
                onClose: () => {
                  vm.$router.push("/home/product-list");
                }
              });
            } else {
              // 添加失败
              vm.$message.error(res.message);
            }
          });
        } else {
          // 如果不成功
          vm.$message.error("账号添加失败，请检查您的信息！");
        }
      });
    },
    // 表单重置按钮
    resetForm() {
      this.$refs.productaddform.resetFields();
    }
  },
  computed: {
    // 提供一个计算属性，实现照片回填地址的封装
    imageUrl() {
      if (this.productaddform.imgUrl) {
        // 如果照片的文件名存在,就把封装好的服务器地址和文件名拼接
        return uploadDir + this.productaddform.imgUrl;
      } else {
        return "";
      }
    }
  },
  // 生命周期挂载商品分类，渲染到页面
  created() {
    listproducttype().then(data => {
      this.listtype = data;
    });
  }
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
// 相片边框
/deep/.el-upload {
  border: 1px #ccc dashed;
}
</style>