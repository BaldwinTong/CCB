<template>
  <div class="home">
    <el-container class="home-aside">
      <el-aside width="200px">
        <nav-aside></nav-aside>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navAside from "../components/navAside.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: { navAside },
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
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #5068D1;
  color: #fff;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
