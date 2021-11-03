<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>当前位置</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="user-content">
      <div class="user-box">
        <el-form :model="infoForm" ref="infoForm" label-width="180px" :inline="true" >
          <el-form-item label="姓名：" prop="userName">
            <el-input v-model="infoForm.userName" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="gender">
            <el-input v-model="infoForm.gender" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码：" prop="userID">
            <el-input v-model="infoForm.userID" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="地址：" prop="address">
            <el-cascader  class="input-width" :disabled="isDisabled"
              v-model="infoForm.address"
              :options="addressList"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址：" prop="detailAddress">
            <el-input class="input-width" v-model="infoForm.detailAddress" :disabled="isDisabled"></el-input>
          </el-form-item>
           <el-form-item label="所属银行：" prop="belongBank">
            <el-input v-model="infoForm.belongBank" :disabled="isDisabled"></el-input>
          </el-form-item>
           <el-form-item label="银行账户：" prop="bankAccount">
            <el-input class="input-width" v-model="infoForm.bankAccount" :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-form>
        <div class="user-btns">
          <el-button v-if="isDisabled" type="primary" size="mini" class="btn" @click="edit">修改</el-button>
          <el-button v-else type="primary" size="mini" class="btn" @click="confirm">确认修改</el-button>
          <el-button type="danger" size="mini" class="btn" @click="resetForm('infoForm')">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDisabled:true,
      infoForm: {
        userName: "管理员",
        gender: "男",
        userID: "440XXXXXXXXXXX7852",
        address: "广东省/江门市/江海区",
        detailAddress: "广东省江门市江海区礼乐街道",
        belongBank:"建设银行",
        bankAccount:"666XXXXXXXXXXXXX2589",
      },
      addressList: [
        {
          value: "广东省",
          label: "广东省",
          children: [
            {
              value: "江门市",
              label: "江门市",
              children: [
                {
                  value: "江海区",
                  label: "江海区",
                },
                {
                  value: "蓬江区",
                  label: "蓬江区",
                },
                {
                  value: "新会区",
                  label: "新会区",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  components: {},
  created() {},
  methods: {
    handleChange(value) {
      console.log(value);
    },
    edit(){
      this.isDisabled = false
    },
    confirm(){
      this.isDisabled = true
    },
    resetForm(formName) {
      console.log(123);
        this.$refs[formName].resetFields();
      }
  },
  computed: {},
};
</script>

<style>
.user-content {
  width: 100%;
  display: flex;
  justify-content: center;
}
.user-box {
  width: 100%;
  height: 80vh;
  background-color: #fff;
  margin-top: 20px;
  padding: 30px;
  box-sizing: border-box;
}
/* .user-box .input-width{
  width: 300px;
} */

.user-btns{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-btns .btn{
  width: 90px;
}
</style>
