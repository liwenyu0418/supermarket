<template>
  <div class="header">
    <div class="left-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-box">
      <span class="title">欢迎小鱼儿</span>
      <!-- 引入下拉框 -->
      <!--command:点击菜单项触发的事件回调  -->
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <!-- 插入头像
          size：设置头像大小
          fit:  设置图片如何适应容器框
          divided:显示分割线
          -->
          <el-avatar fit="contain" :size="40" :src="user"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personal">个人中心</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
// 引入头像照片
import user from "../assets/images/user.jpg";
// 引入注销接口
import { doLogout } from "@/api/index.js";
export default {
  data() {
    return {
      user
    };
  },
  methods: {
    handleCommand(commond) {
      // debugger;
      const vm = this;
      // 如果command是logout
      if (commond === "logout") {
        // 获取到登陆账号的token,发送ajax请求
        const token = localStorage.getItem("token");
        doLogout(token).then(data => {
          // 如果注销账户成功
          if (data.success) {
            vm.$message({
              type: "success",
              message: data.message,
              duration: 500,
              showClose: true,
              onClose: () => {
                // 清除本地缓存
                localStorage.setItem("token", "");
                // 跳转到登陆页面
                vm.$router.replace("/login");
              }
            });
          } else {
            vm.$message.error("注销失败，请检查您的网络！");
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-box {
    /deep/.el-breadcrumb__inner {
      color: #fff;
    }
  }
  .right-box {
    color: #fff;
    font-size: 14px;
    display: flex;
    align-items: center;
    .title {
      margin-right: 8px;
    }
    image {
      width: 30px;
    }
  }
}
</style>