<template>
    <el-container class="home-aside">
      <el-aside width="200px">
        <nav-aside></nav-aside>
      </el-aside>
      <el-container>
        <el-header>
          <sellheader></sellheader>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import navAside from "../components/navAside.vue";
import sellheader from "../components/header.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: { navAside, sellheader },
};
</script>
<style>
.home {
  height: 100%;
}
.home-aside {
  height: 100%;
}
.el-header {
  background-color: #ffff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #5068d1;
  color: #fff;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 10px !important;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-breadcrumb__inner {
  color: #94949A;
  font-size: 12px;
}
</style>
