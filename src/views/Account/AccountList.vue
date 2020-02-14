<template>
  <div class="account-list">
    <!-- 卡片组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 标题 -->
        <h3>用户列表</h3>
      </div>
      <!-- 搜索框 -->
      <el-form :inline="true" :model="searchAccountForm" ref="searchAccountForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="searchAccountForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="searchAccountForm.role" placeholder="角色">
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="普通员工" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchBtn">查询</el-button>
          <el-button @click="resetBtn">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 列表数据 -->
      <div>
        <el-table :data="tableData" style="width: 100%">
          <!-- 
              data:显示的数据
              prop:对应列内容的字段名，也可以使用 property 属性
              label:显示的标题
          -->
          <el-table-column prop="id" label="编号" width="180"></el-table-column>
          <el-table-column prop="username" label="姓名" width="180"></el-table-column>
          <el-table-column label="角色" width="180">
            <!-- 在table的列组件中，使用插槽可以自定义HTML内容  -->
            <template slot-scope="scope">
              <!-- 用三目运算判断role的值 -->
              <span style="margin-left: 10px">{{ scope.row.role===1?"超级管理员":"普通员工" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="日期" width="180">
            <!-- 在table的列组件中，使用插槽可以自定义HTML内容  -->
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.inputtime|formateDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        size-change:每页条数改变的监听事件
        current-change:当前页改变的监听事件
      -->
      <div class="pagination">
        <el-pagination
          :current-page="this.page.currentPage"
          :page-sizes="[1, 5, 10, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 编辑对话框 -->
    <!-- 
        visible ： 是否默认可见
    -->
    <el-dialog title="账号修改" :visible.sync="dialogFormVisible">
      <el-form
        :model="editAccountForm"
        status-icon
        :rules="rules"
        ref="editAccountForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="editAccountForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="role">
          <el-select v-model.number="editAccountForm.role" placeholder="请选择">
            <!-- 
              label ： 下拉框显示的值
              value ： 下拉框传递的值

              value="1"   值是字符串
              :value="1"   值是数字
            -->
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="普通员工" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editForm">修改</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入axios的模块
import {
  searchAccount,
  delAccount,
  editAccount,
  pageAccount
} from "@/api/account.js";
import moment from "moment";
export default {
  data() {
    return {
      // 分页对象
      // currentPage: 1,
      // total: 50,
      page: {
        currentPage: 1, // 默认值
        pageSize: 5,
        total: 2
      },
      // 搜索框
      searchAccountForm: {
        username: "",
        role: ""
      },
      // 编辑页面
      dialogFormVisible: false, // 对话框默认不可见
      editAccountForm: {
        id: "",
        username: "",
        role: ""
      },
      rules: {},

      // 列表页
      tableData: [
        {
          id: "1",
          role: "超级管理员",
          inputtime: "2016-05-02",
          username: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  // 过滤器
  filters: {
    // 转换时间格式
    formateDate: function(value) {
      return moment(value).format("YYYY-MM-DD");
    }
  },
  methods: {
    // 搜索框搜索按钮
    searchBtn() {
      debugger;
      //根据相应条件发送ajax,可做模糊匹配没有输入条件时，获取到所有数据
      searchAccount(this.searchAccountForm).then(
        data => (this.tableData = data)
      );
    },
    // 搜索框重置按钮
    resetBtn() {
      const vm = this;
      this.$refs.searchAccountForm.resetFields();
      pageAccount(this.page).then(function(res) {
        // debugger;
        vm.tableData = res.data;
      });
    },
    // 分页
    // 分页每页条数
    handleSizeChange(val) {
      // debugger;
      const vm = this;
      // 参数就是分页显示的数据条数
      this.page.pageSize = val;
      // 当前页跳转到第一页
      this.page.currentPage = 1;
      pageAccount(this.page).then(function(res) {
        // 把获取到的数据渲染到页面，获取到的数据有两层，注意看返回数据
        vm.tableData = res.data;
        // 更新total
        vm.page.total = res.total;
      });
    },
    // 分页当前页
    handleCurrentChange(value) {
      // debugger;
      const vm = this;
      // 参数就是点击当前页的页数
      this.page.currentPage = value;
      pageAccount(this.page).then(function(res) {
        // 把获取到的数据渲染到页面，获取到的数据有两层，注意看返回数据
        vm.tableData = res.data;
        // 更新total
        vm.page.total = res.total;
      });
    },
    // 列表编辑按钮
    handleEdit(index, row) {
      const vm = this;
      // 修改对话框的显示状态为true，即显示对话框
      vm.dialogFormVisible = true;
      // 点击编辑按钮时，把当前行的数据，更新到form对于的model对象上
      // this.editAccountForm = row;这个传递是同步的，要用浅拷贝或者用qs模块
      // debugger;
      vm.editAccountForm = Object.assign({}, row);
    },
    // 编辑回填页面
    editForm() {
      const vm = this;
      // 编辑提交
      // debugger;
      editAccount(this.editAccountForm).then(data => {
        // console.log(data);
        if (data.success) {
          vm.$message({
            type: "success",
            message: data.message,
            duration: 500,
            showClose: true,
            onClose: () => {
              //关闭对话框
              vm.dialogFormVisible = false;
              //提示成功，刷新页面
              pageAccount(this.page).then(function(data) {
                // debugger
                vm.tableData = data.data;
              });
            }
          });
        } else {
          // 如果不合法
          vm.$message.error(data.message);
        }
      });
    },
    // 删除当前行
    handleDelete(index, row) {
      // 删除当前行
      const vm = this;
      // vm.tableData.splice(index, 1);
      // console.log(row.id);
      // 发送ajax请求
      delAccount(row.id).then(res => {
        if (res.success) {
          // 如果删除成功
          vm.$message({
            type: "success",
            message: res.message,
            duration: 500,
            showClose: true,
            onClose: () => {
              //提示成功，刷新页面
              // searchAccount().then(function(res) {
              pageAccount(this.page).then(function(res) {
                vm.tableData = res.data;
              });
            }
          });
        } else {
          // 如果删除失败
          vm.$message.error(res.message);
        }
      });
    }
  },
  // 利用分页接口，发送axios请求数据，获取到所有数据
  created() {
    const vm = this;
    // debugger;
    pageAccount(this.page).then(function(res) {
      // 把获取到的数据渲染到页面，获取到的数据有两层，注意看返回数据
      vm.tableData = res.data;
      // 更新total
      vm.page.total = res.total;
    });
    // 列表接口
    // listAccounts().then(res => {
    //   console.log(res);
    // });
  }
};
</script>

<style lang="less" scoped>
.account-list {
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>