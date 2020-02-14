<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple type-box">
          <!-- 阿里巴巴矢量图标 -->
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dingdanshu" />
          </svg>
          <div class="content">
            <p class="up">总订单</p>
            <h4 class="down">102,400</h4>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple type-box">
          <!-- 阿里巴巴矢量图标 -->
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-neiye-zongxiaoshoue" />
          </svg>
          <div class="content">
            <p class="up">总销售额</p>
            <h4 class="down">102,400</h4>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple type-box">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jinridingdanliang" />
          </svg>
          <div class="content">
            <p class="up">今日订单数</p>
            <h4 class="down">102,400</h4>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple type-box">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jinrixiaoshoue" />
          </svg>
          <div class="content">
            <p class="up">今日销售额</p>
            <h4 class="down">102,400</h4>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--1、 报表盒子 -->
    <div ref="myChart" :style="{width: '1000px', height: '500px'}"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    // 2、准备：初始化实例
    const myChart = this.$echarts.init(this.$refs.myChart);
    //  3、做配置
    const option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line"
        }
      ]
    };
    // 4、输出配置
    myChart.setOption(option);
  }
};
</script>

<style lang="less" scoped>
.home {
  .type-box {
    display: flex;
    .content {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    font-size: 50px;
  }
}
</style>