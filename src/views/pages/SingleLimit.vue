<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>当前位置</el-breadcrumb-item>
      <el-breadcrumb-item>单笔限额</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="S-content">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="form-item">
          <el-form-item label="单笔限额：">
            <el-input
              :disabled="isDisabled"
              v-model="form.singleLimit"
            ></el-input
            ><span class="units">*单位：元</span>
          </el-form-item>
          <el-form-item label="银行卡号：">
            <el-input
              :disabled="isDisabled"
              v-model="form.bankNumber"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="btns">
        <el-button
          v-if="isDisabled"
          type="primary"
          class="edit-btn"
          size="mini"
          @click="change"
          >修改</el-button
        >
        <el-button
          v-else
          type="primary"
          class="edit-btn"
          size="mini"
          @click="onConfirmChange"
          >确认修改</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { GetSingleLimit, EditSingleLimit } from "../../api/pricelimit"; 
export default {
  data() {
    return {
      form: {
        singleLimit: "",
        bankNumber: "",
      },
      isDisabled: true,
    };
  },
  components: {},
  created() {
    this.getData();
  },
  methods: {
    getData() {
      GetSingleLimit()
        .then((res) => {
          console.log(res);
          this.form = res.data.result
        })
        .catch((fail) => {
          console.log(fail);
        });
    },
    change() {
      this.isDisabled = false;
    },
    onConfirmChange() {
      EditSingleLimit(this.form)
        .then((res) => {
          if (res.data.success) {
            this.$mess({
              type:'success',
              message:'修改成功！'
            })
          }
        })
        .catch((fail) => {
          console.log(fail);
        });
      this.isDisabled = true;
    },
  },
  computed: {},
};
</script>

<style>
.S-content {
  width: 100%;
  height: 83vh;
  background-color: #fff;
  padding: 30px;
  box-sizing: border-box;
  margin-top: 20px;
  box-shadow: 2px 3px 7px 2px #cccc;
}

.S-content .form-item {
  width: 28%;
}
.el-form-item {
  position: relative;
}
.units {
  font-size: 12px;
  color: #ff3d3d;
  font-weight: 800;
  position: absolute;
  top: 0px;
  right: -70px;
}
.btns {
  width: 28%;
  display: flex;
  justify-content: center;
  margin-top: 55px;
}
.edit-btn {
  width: 90px;
}
</style>
