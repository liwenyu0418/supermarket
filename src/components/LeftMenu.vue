<template>
  <div class="left-menu">
    <!--
      default-active:当前激活菜单的 index,要跟路由一致
      background-color:菜单的背景色（仅支持 hex 格式
      text-color:菜单的文字颜色（仅支持 hex 格式）
      active-text-color:当前激活菜单的文字颜色（仅支持 hex 格式
      unique-opened:是否只保持一个子菜单的展开
      router:是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
      $route.path
    -->

    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
    >
      <!-- 
        el-submenu:有子集可以展开的菜单
        el-menu-item:没有子集不展开的菜单
        index:唯一标志
      -->
      <!-- 动态加载，用模板在外面包一层做循环，循环完毕后模板标签会消失 -->
      <template v-for="menu in menulist ">
        <el-menu-item v-if="!menu.children" :index="menu.index" :key="menu.id">
          <!-- 图标 -->
          <i :class="menu.cls"></i>
          <!-- 大标题 -->
          <span slot="title">{{menu.title}}</span>
        </el-menu-item>
        <!-- 有子集的菜单 -->
        <el-submenu v-else :index="menu.index" :key="menu.id">
          <template slot="title">
            <!-- 图标 -->
            <i :class="menu.cls"></i>
            <!-- 大标题 -->
            <span>{{menu.title}}</span>
          </template>
          <!-- 子标题 -->
          <el-menu-item
            v-for="item in menu.children"
            :key="item.index"
            :index="item.index"
          >{{item.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menulist: [
        {
          id: 1,
          index: "/home/dashbroad",
          cls: "el-icon-s-cooperation",
          title: "首页"
        },
        {
          id: 2,
          index: "2",
          cls: "el-icon-menu",
          title: "商品分类管理",
          children: [
            { index: "/home/producttype-list", name: "商品分类列表" },
            { index: "/home/producttype-add", name: "添加商品分类" }
          ]
        },
        {
          id: 3,
          index: "3",
          cls: "el-icon-s-goods",
          title: "商品管理",
          children: [
            { index: "/home/product-list", name: "商品列表" },
            { index: "/home/product-add", name: "添加商品" }
          ]
        },
        {
          id: 4,
          index: "4",
          cls: "el-icon-s-custom",
          title: "账号管理",
          children: [
            { index: "/home/account-list", name: "账号列表" },
            { index: "/home/account-add", name: "增加账号" },
            { index: "/home/account-update", name: "修改密码" }
          ]
        },
        {
          id: 5,
          index: "5",
          cls: "el-icon-s-data",
          title: "统计管理",
          children: [
            { index: "/home/sta", name: "销售统计" },
            { index: "/home/stocksta", name: "进货统计" }
          ]
        },
        {
          id: 6,
          index: "6",
          cls: "el-icon-s-tools",
          title: "菜单管理",
          children: [
            { index: "/home/menulist", name: "菜单管理" },
            { index: "/home/menuadd", name: "添加菜单" }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.left-menu {
  .el-menu {
    border-right: none;
  }
}
</style>