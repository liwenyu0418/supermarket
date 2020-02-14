<template>
  <div class="product-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品列表名称</span>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="店铺特色">
                  <span>{{ props.row.feature |renderFeature}}</span>
                </el-form-item>
                <el-form-item label="是否促销">
                  <span>{{ props.row.isPromotion }}</span>
                </el-form-item>
                <el-form-item label="商品包装费">
                  <span>{{ props.row.packingexpense }}</span>
                </el-form-item>
                <el-form-item label="商品单价">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <!-- 显示列表的选项 -->
          <el-table-column label="商品 ID" prop="id"></el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="描述" prop="desc"></el-table-column>
          <!-- 录入时间格式化 -->
          <el-table-column label="录入时间" prop="inputtime" :formatter="formaterInputtime"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit( scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <!--
        current-page：当前页
        page-sizes：每页显示个数选择器的选项设置[10, 20, 30, 40, 50, 100]
        page-size：每页显示条目个数
        layout:组件布局，子组件名用逗号分隔'prev, pager, next, jumper, ->, total'，顺序有关系
      -->
      <div class="pagination">
        <el-pagination
          :current-page="1"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 商品修改 -->
    <el-dialog title="商品修改" :visible.sync="dialogFormVisible">
      <el-form
        size="small"
        :model="producteditform"
        style="width: 560px;"
        ref="producteditform"
        label-width="80px"
      >
        <!-- 名称 -->
        <el-form-item label="商品名称">
          <el-input v-model="producteditform.name"></el-input>
        </el-form-item>

        <!-- 分类 -->
        <el-form-item label="商品分类">
          <el-select v-model="producteditform.category" placeholder="请选择商品分类">
            <el-option label="热销" value="热销"></el-option>
            <el-option label="咖啡" value="咖啡"></el-option>
            <el-option label="热菜" value="热菜"></el-option>
            <el-option label="凉菜" value="凉菜"></el-option>
            <el-option label="饮品" value="饮品"></el-option>
            <el-option label="火锅" value="火锅"></el-option>
          </el-select>
        </el-form-item>

        <!-- 特色 -->
        <el-form-item label="商品特色">
          <el-checkbox-group v-model="producteditform.feature">
            <el-checkbox label="新品上市" name="feature"></el-checkbox>
            <el-checkbox label="第二单半价" name="feature"></el-checkbox>
            <el-checkbox label="主打产品" name="feature"></el-checkbox>
            <el-checkbox label="火爆产品" name="feature"></el-checkbox>
            <el-checkbox label="祖传手艺" name="feature"></el-checkbox>
            <el-checkbox label="源自四川" name="feature"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 文件上传 -->
        <!-- <el-form-item label="商品图片"> -->
        <!-- 
              action : 上传照片时，请求的接口地址，地址是一个完整的地址加上前面接口的baseURL部分
              show-file-list ： 是否显示已上传文件列表，这是多选状态，就是可以选多张照片
              on-success     :  文件上传成功时的钩子函数（即事件回调函数）	          
        -->
        <!-- <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>-->
        <!-- 是否促销 -->
        <el-form-item label="是否促销">
          <el-radio-group v-model="producteditform.isPromotion">
            <el-radio label="促销"></el-radio>
            <el-radio label="不促销"></el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 单规格:   的 包装费 和 价格 -->
        <!-- 单规格的包装费 -->
        <el-form-item label="包装费">
          <el-input-number v-model="producteditform.packingexpense" :min="0" :max="20" label="包装费"></el-input-number>
        </el-form-item>
        <!-- 单规格的价格 -->
        <el-form-item label="价格">
          <el-input-number v-model="producteditform.price" :min="1" label="价格"></el-input-number>
        </el-form-item>

        <!-- 商品描述 -->
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="producteditform.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">修 改</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入封装好的ajax模块
import { listProduct, editProduct, delProduct } from "@/api/product.js";
import moment from "moment";

export default {
  data() {
    return {
      imageUrl: "",
      uploadUrl: "",
      dialogFormVisible: false, // 对话框默认不可见
      // 编辑页面的数据
      producteditform: {
        id: 1,
        name: "yu",
        category: "4",
        feature: '["第二单半价", "火爆产品"]',
        isPromotion: "促销",
        packingexpense: "1",
        price: "1",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        inputtime: "2019-11-11"
      },

      // 列表页的数据
      tableData: [
        {
          id: "1",
          name: "好滋好味鸡蛋仔",
          category: '["江浙小吃、小吃零食"]',
          feature: '["第二单半价", "火爆产品"]',
          isPromotion: "促销",
          packingexpense: "1",
          price: "1",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          inputtime: "2019年12月20日"
        }
      ]
    };
  },
  methods: {
    // 格式化时间
    // cellvalue单元格的值
    formaterInputtime(row, column, cellvalue) {
      if (cellvalue) {
        return moment(cellvalue).format("YYYY-MM-DD");
      }
    },

    // 列表页面编辑，回填按钮
    handleEdit(row) {
      //1、 显示对话框
      this.dialogFormVisible = true;
      // 2、数据回填，对数据进行浅拷贝
      this.producteditform = Object.assign({}, row);
      // 3、对特色多选框的数据进行处理
      if (this.producteditform.feature) {
        // 将字符串转换为JSON格式的对象
        this.producteditform.feature = JSON.parse(this.producteditform.feature);
      } else {
        this.producteditform.feature = this.producteditform.feature;
      }
      // console.log(this.producteditform.feature);
    },
    // 编辑页面保存按钮
    save() {
      this.$refs.producteditform.validate(valid => {
        if (valid) {
          editProduct(this.producteditform).then(data => {
            if (data.success) {
              this.$message({
                showClose: true,
                message: data.message,
                type: "success",
                onClose: () => {
                  this.dialogFormVisible = false; // 关闭对话框
                  // 刷新页面
                  listProduct().then(data => {
                    this.tableData = data;
                  });
                }
              });
            } else {
              this.$message.error(data.message);
            }
          });
          // this.$message.error("编辑失败");
        }
      });
    },
    // 编辑页面照片上传
    handleUploadSuccess() {},
    // 列表页面删除按钮
    handleDelete(id) {
      debugger;
      // 获取到当前行的id，通过id发送请求
      delProduct(id).then(data => {
        if (data.success) {
          // 如果是成功的，提示消息
          this.$message({
            type: "success",
            message: data.message,
            duration: 500,
            showClose: true,
            onClose: () => {
              // 如果返回数据是成功的，那么就刷新页面
              listProduct().then(data => {
                this.tableData = data;
              });
            }
          });
        } else {
          // 如果删除失败
          this.$message.error(data.message);
        }
      });
    }
  },
  // 创建后发送ajax请求,刷新页面
  created() {
    const vm = this;
    // debugger;
    listProduct().then(
      data =>
        // console.log(vm.tableData);
        (vm.tableData = data)
    );
  },
  //过滤器,把后台传入的特色数据做转化
  filters: {
    renderFeature(value) {
      // 如果值存在
      if (value) {
        // 把符合数组格式的字符串，先转为数组对象，再拆分拼接为字符结果
        return JSON.parse(value);
      }
    }
  }
};
</script>

<style lang="less" scoped>
// 列表表单
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
// 头像上传样式
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
// 自己加的边框样式
// /deep/.el-upload {
//   border: 1px dashed #d9d9d9;
// }
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
</style>