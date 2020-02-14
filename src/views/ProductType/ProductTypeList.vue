<template>
  <div class="produvt-type-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品分类列表</span>
      </div>
      <div>
        <!-- 商品分类列表 -->

        <!-- 
            stripe：是否为斑马纹 table
        -->
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="id" label="分类ID" width="180"></el-table-column>
          <el-table-column prop="name" label="热销" width="180"></el-table-column>
          <el-table-column prop="order" label="分类序号" width="180"></el-table-column>
          <el-table-column prop="desc" label="描述" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
          :page-sizes="[1, 5, 10, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 编辑对话框 -->
    <!-- 
        visible ： 是否默认可见
    -->
    <el-dialog title="商品分类修改" :visible.sync="dialogFormVisible">
      <el-form
        :model="editTypeForm"
        status-icon
        :rules="rules"
        ref="editTypeForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model.number="editTypeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类序号" prop="order">
          <el-input-number
            v-model="editTypeForm.order"
            controls-position="right"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="分类说明" prop="desc">
          <el-input type="textarea" v-model="editTypeForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入接口
import {
  listproducttype,
  editproducttype,
  delproducttype
} from "@/api/productType.js";
export default {
  data() {
    return {
      //对话框
      dialogFormVisible: false, // 对话框默认不可见
      // 列表数据
      tableData: [
        {
          id: 1,
          name: "热销",
          order: "1",
          desc: "热销产品类别"
        }
      ],
      // 编辑表单
      editTypeForm: {
        name: "",
        order: "",
        desc: ""
      },
      rules: {}
    };
  },
  methods: {
    // 列表页面编辑按钮
    handleEdit(index, row) {
      // 对话框可见
      // debugger;
      this.dialogFormVisible = true;
      // 点击编辑按钮时，把列表数据回填到编辑对话框中,如果对row进行浅拷贝，那么修改的时候，列表页的值也会同步修改
      this.editTypeForm = Object.assign({}, row);
    },
    // 编辑页面保存按钮
    save() {
      const vm = this;
      editproducttype(vm.editTypeForm).then(data => {
        // debugger;
        if (data.success) {
          vm.$message({
            type: "success",
            message: data.message,
            duration: 1000,
            onClose() {
              vm.dialogFormVisible = false;
              listproducttype().then(data => (vm.tableData = data));
            }
          });
        } else {
          this.$message.console.error(data.message);
        }
      });
    },
    // 列表页面删除
    handleDelete(id) {
      // debugger;,直接用this获取不到数据
      const vm = this;
      delproducttype(id).then(data => {
        if (data.success) {
          vm.$message({
            type: "success",
            message: data.message,
            duration: 1000,
            onClose() {
              listproducttype().then(data => (vm.tableData = data));
            }
          });
        } else {
          vm.$message.console.error(data.message);
        }
      });
    }
  },
  // 生命周期创建后发送ajax请求，刷新页面
  created() {
    // 发送请求，不用传参
    listproducttype().then(data => {
      // 把返回的数据绑定到页面
      this.tableData = data;
    });
  }
};
</script>

<style lang="scss" scoped>
</style>