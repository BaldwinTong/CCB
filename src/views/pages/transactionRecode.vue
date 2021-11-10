<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>当前位置</el-breadcrumb-item>
      <el-breadcrumb-item>交易流水</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="T-search">
      <div class="status">
        <div class="status-title">项目状态：</div>
        <div
          :class="type1 == 1 ? 'typeActive' : 'status-item'"
          @click="changeAudit(1)"
        >
          全部
        </div>
        <div
          :class="type1 == 2 ? 'typeActive' : 'status-item'"
          @click="changeAudit(2)"
        >
          待审核
        </div>
        <div
          :class="type1 == 3 ? 'typeActive' : 'status-item'"
          @click="changeAudit(3)"
        >
          审核中
        </div>
        <div
          :class="type1 == 4 ? 'typeActive' : 'status-item'"
          @click="changeAudit(4)"
        >
          已审核
        </div>
        <div
          :class="type1 == 5 ? 'typeActive' : 'status-item'"
          @click="changeAudit(5)"
        >
          无需审核
        </div>
      </div>
      <div class="status">
        <div class="status-title">项目状态：</div>
        <div
          :class="type2 == 1 ? 'typeActive' : 'status-item'"
          @click="changeDate(1)"
        >
          全部
        </div>
        <div
          :class="type2 == 2 ? 'typeActive' : 'status-item'"
          @click="changeDate(2)"
        >
          一个月以内
        </div>
        <div
          :class="type2 == 3 ? 'typeActive' : 'status-item'"
          @click="changeDate(3)"
        >
          1-3个月
        </div>
        <div
          :class="type2 == 4 ? 'typeActive' : 'status-item'"
          @click="changeDate(4)"
        >
          3-6个月
        </div>
        <div
          :class="type2 == 5 ? 'typeActive' : 'status-item'"
          @click="changeDate(5)"
        >
          6个月以上
        </div>
      </div>
    </div>
    <div class="T-box">
      <div class="T-content">
        <div class="cont-item" v-for="items in dataList" :key="items.id">
          <div class="item-top">
            <div class="top-left">
              <img src="../../assets/bill.png" alt="" />
              <div class="date">{{ items.date }}</div>
            </div>
            <div class="top-right">
              <div class="top-btn staycheckPending" v-if="items.type == 1">
                待审核
              </div>
              <div class="top-btn alreadyPending" v-if="items.type == 2">
                已审核
              </div>
              <div class="top-btn noNeedPending" v-if="items.type == 3">
                无需审核
              </div>
              <div class="top-btn checkPending" v-if="items.type == 4">
                审核中
              </div>
            </div>
          </div>
          <div class="item-info">
            <div class="info-item">
              <div class="line"></div>
              <div class="info-title">交易重量：</div>
              <div class="info-quantity">{{ items.weight }}吨</div>
            </div>
            <div class="info-item">
              <div class="line"></div>
              <div class="info-title">单价：</div>
              <div class="info-quantity">￥{{ items.unitPrice }}</div>
            </div>
            <div class="info-item">
              <div class="line"></div>
              <div class="info-title">总价：</div>
              <div class="info-quantity">￥{{ items.totalPrice }}</div>
            </div>
            <div class="info-item">
              <div class="line"></div>
              <div class="info-title">交易对象：</div>
              <div class="info-quantity">{{ items.tradingUserName }}</div>
            </div>
            <div class="info-item">
              <div class="line"></div>
              <div class="info-title">是否需要审核：</div>
              <div class="info-quantity">
                {{ items.type == 3 ? "否" : "是" }}
              </div>
            </div>
            <div class="info-item">
              <div class="line"></div>
              <div class="info-title">审核人员：</div>
              <div class="info-quantity">
                {{ items.type == 3 ? "无" : items.checkUser }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type1: 1,
      type2: 1,
      dataList: [],
    };
  },
  components: {},
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get("/detailData")
        .then((res) => {
          console.log(res);
          this.dataList = res.data;
        })
        .catch((fail) => {
          console.log(fail);
        });
    },
    changeAudit(e) {
      this.type1 = e;
      this.sifting(this.type1);
    },
    changeDate(e) {
      this.type2 = e;
    },
  },
  computed: {},
};
</script>

<style>
.T-search {
  width: 100%;
  background-color: #fff;
  padding: 14px 24px;
  box-sizing: border-box;
  margin-top: 20px;
}
.T-search .status {
  display: flex;
  align-items: center;
  font-size: 12px;
}

.T-search .status:last-child {
  margin-top: 14px;
}

.T-search .status .status-title {
  color: #3c3c3c;
  font-weight: 700;
  margin-right: 30px;
}
.T-search .status .status-item {
  margin-right: 40px;
  cursor: pointer;
  color: #6d6d6d;
  padding: 0 10px;
  box-sizing: border-box;
  line-height: 25px;
}

.typeActive {
  color: #fff;
  cursor: pointer;
  padding: 0 10px;
  margin-right: 40px;
  box-sizing: border-box;
  line-height: 25px;
  background-color: #5773e1;
  border-radius: 4px;
}

.T-box {
  margin-top: 20px;
  width: 100%;
  height: 70vh;
  overflow: auto;
}

.T-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}
.T-content .cont-item {
  width: 48%;
  padding: 6px 12px 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 18px;
  box-shadow: 2px 3px 7px 2px #cccc;
}

.T-content .cont-item .item-top {
  display: flex;
  justify-content: space-between;
  padding: 6px 2px;
  box-sizing: border-box;
  border-bottom: 1px solid #e4e4e4;
}

.cont-item .item-top .top-left {
  display: flex;
  align-items: center;
}
.cont-item .item-top .top-left .date {
  margin-left: 10px;
  font-size: 16px;
}

.top-btn {
  padding: 4px;
  box-sizing: border-box;
  line-height: 20px;
  font-size: 12px;
  text-align: center;
}

.staycheckPending {
  border: 1px solid #f08c42;
  color: #f08c42;
  border-radius: 4px;
}
.checkPending {
  border: 1px solid rgb(68, 151, 243);
  color: rgb(68, 151, 243);
  border-radius: 4px;
}
.alreadyPending {
  border: 1px solid #35b37d;
  color: #35b37d;
  border-radius: 4px;
}
.noNeedPending {
  border: 1px solid #8a8a8a;
  color: #8a8a8a;
  border-radius: 4px;
}

.item-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.item-info .info-item {
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  margin-top: 20px;
}
.item-info .info-item .line {
  width: 6px;
  height: 12px;
  background-color: #4497f3;
  border-radius: 4px;
  margin-right: 10px;
}
.item-info .info-item .info-title {
  color: #a3a3a3;
  font-size: 14px;
}
.item-info .info-item .info-quantity {
  color: #555555;
  font-size: 14px;
}
</style>
