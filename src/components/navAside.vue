<template>
  <div class="container">
    <div class="header-img">
      <img src="../assets/head.png" alt="" />
      <div class="title">{{userName}}，{{hour>12?"下午好":"早上好"}}</div>
    </div>
    <div class="navlist">
      <div
        v-for="item in navList"
        :key="item.navIndex"
        :class="pickItem == item.navIndex ? 'actives' : 'item'"
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
      hour:0,
      pickItem: 1,
      userName:"",
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
  beforeCreate(){
  },
  created() {
    this.navList.forEach(item=>{
      if (item.path == this.$route.path) {
       this.pickItem = item.navIndex
      }
    })
    this.gettime()
    this.userName = JSON.parse(localStorage.getItem("USER_INFO")).name
  },
  methods: {
    changeNav(e, path) {
      this.pickItem = e;
      this.$router.push(path);
    },

    gettime(){
      let nowDate = new Date();
      let hour = nowDate.getHours();
      this.hour = hour;
      console.log(this.hour);
    },
  },
  computed: {},
};
</script>

<style scoped>
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
  cursor: pointer;
}
.actives {
  width: 80%;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  font-size: 12px;
  letter-spacing: 1px;
  margin-bottom: 12px;
  background-color: #4254a6;
  cursor: pointer;
}
</style>
