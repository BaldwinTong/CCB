<template>
  <div class="container">
    <div class="header-img">
      <img src="../assets/head.png" alt="" />
      <div class="title">管理员，下午好</div>
    </div>
    <div class="navlist">
      <div
        v-for="item in navList"
        :key="item.navIndex"
        :class="pickItem == item.navIndex ? 'active' : 'item'"
        @click="changeNav(item.navIndex, item.path)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickItem: 1,
      navList: [
        {
          title: "白名单",
          navIndex: 1,
          path: "/whitelist",
        },
        {
          title: "农产品",
          navIndex: 2,
          path: "/farmProduct",
        },
        {
          title: "产品单价",
          navIndex: 3,
          path: "/productPrice",
        },
        {
          title: "交易流水",
          navIndex: 4,
          path: "/transactionRecode",
        },
        {
          title: "单笔限额",
          navIndex: 5,
          path: "/SingleLimit",
        },
        {
          title: "用户管理",
          navIndex: 6,
          path: "/username",
        },
      ],
    };
  },
  components: {},
  created() {},
  methods: {
    changeNav(e, path) {
      this.pickItem = e;
      this.$router.push(path);
    },
  },
  computed: {},
};
</script>

<style>
.container {
  height: 100%;
}
.header-img {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.header-img img {
  display: block;
  width: 98px;
  height: 98px;
  border-radius: 50%;
  margin-top: 60px;
}

.header-img .title {
  width: 100%;
  line-height: 40px;
  font-size: 14px;
}

.navlist {
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.navlist .item {
  width: 80%;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  font-size: 12px;
  letter-spacing: 1px;
  margin-bottom: 12px;
}
.active {
  width: 80%;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  font-size: 12px;
  letter-spacing: 1px;
  margin-bottom: 12px;
  background-color: #4254a6;
}
</style>
