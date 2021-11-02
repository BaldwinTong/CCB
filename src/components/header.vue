<template>
  <div class="container">
    <div class="head">
      <h1 class="title">后台管理系统</h1>
      <div class="loginOut" @click="loginOut">
        <img src="../assets/loginOut.png" alt="">
        <span class="out">退出</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {
    loginOut(){
      this.$router.push('/login')
    }
  },
  computed: {},
};
</script>

<style>
.head {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.head .loginOut{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}
.head .loginOut img{
  width: 22px;
  height: 24px;
}
.head .loginOut .out{
  margin-left: 10px;
  font-size: 12px;
  color: #FF7E60;
  font-weight:900;
}
</style>
