<template>
  <div class="home">
    <!-- 容器组件 -->
    <el-container>
      <!-- 左侧导航 -->
      <el-aside width="200px">
        <LeftMenu />
      </el-aside>
      <!-- 右侧 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <Header></Header>
        </el-header>

        <!-- 主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 页脚 -->
        <el-footer>©COPYRIGHT 小鱼超市 2019-2019</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LeftMenu from "@/components/LeftMenu";
import Header from "@/components/Header";
export default {
  components: {
    LeftMenu,
    Header
  }
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  background-color: #eee;
  & > .el-container {
    height: 100%;
    // 左侧
    .el-aside {
      background-color: #545c64;
      .el-menu {
        border-right: none;
      }
    }
    // 右侧
    .el-container {
      // 头部和尾部定高度
      .el-header,
      .el-footer {
        height: 50px;
        background-color: #242f41;
      }
      .el-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .el-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px !important;
        font-size: 12px;
        color: #ccc;
      }
    }
  }
}
</style>
