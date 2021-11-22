<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>当前位置</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="user-content">
      <div class="user-box">
        <el-form
          :model="infoForm"
          ref="infoForm"
          label-width="180px"
          :inline="true"
        >
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="infoForm.name" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="gender">
            <el-input
              v-model="infoForm.gender"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号码：" prop="idCardNum">
            <el-input
              v-model="infoForm.idCardNum"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="地址：" prop="address">
            <el-cascader
              class="input-width"
              :disabled="isDisabled"
              v-model="infoForm.areaRegion"
              :options="addressList"
              :props="props"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input
              class="input-width"
              v-model="infoForm.address"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属银行：" prop="bankName">
            <el-input
              v-model="infoForm.bankName"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="银行账户：" prop="bankNumber">
            <el-input
              class="input-width"
              v-model="infoForm.bankNumber"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="user-btns">
          <el-button
            v-if="isDisabled"
            type="primary"
            size="mini"
            class="btn"
            @click="edit"
            >修改</el-button
          >
          <el-button
            v-else
            type="primary"
            size="mini"
            class="btn"
            @click="confirm"
            >确认修改</el-button
          >
          <el-button
            type="danger"
            size="mini"
            class="btn"
            @click="resetForm('infoForm')"
            >重置</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetUserInfo } from "../../api/userInfo";
import Region from "../../Region/index";
export default {
  data() {
    return {
      isDisabled: true,
      infoForm: {
        name: "",
        gender: "",
        idCardNum: "",
        address: "",
        detailAddress: "",
        bankName: "",
        bankNumber: "",
        provinceCode: "",
        cityCode: "",
        areaCode: "",
        areaRegion: [],
      },
      props: {
        value: "code",
        label: "name",
      },
      addressList: [],
    };
  },
  components: {},
  created() {
    this.getData();
    this.addressList = Region.Region;
    console.log(typeof(this.addressList));

  },
  methods: {
    getData() {
      GetUserInfo({})
        .then((res) => {
          console.log(res.data.result.items[0]);
          /*
          provinceCode:省级编号
          cityCode：市级编号
          areaCode：区级编号
          */
          let obj = {
            provinceCode: res.data.result.items[0].provinceCode,
            cityCode: res.data.result.items[0].cityCode,
            areaCode: res.data.result.items[0].areaCode,
          };
          let addres = "";
          this.addressList.forEach((pro_item) => {
            // console.log(pro_item);
            if (pro_item.code == obj.provinceCode) {
              addres = pro_item.name;
              // this.infoForm.areaRegion
              pro_item.children.forEach((city_item) => {
                if (city_item.code == obj.cityCode) {
                  addres += city_item.name;
                  city_item.children.forEach((area_item) => {
                    if (area_item.code == obj.areaCode) {
                      addres += area_item.name;
                    }
                  });
                }
              });
            }
          });
          this.infoForm.areaRegion = addres
          console.log(this.infoForm.areaRegion);
          this.infoForm = res.data.result.items[0];
        })
        .catch((fail) => {
          console.log(fail);
        });
    },
    handleChange(value) {
      console.log(value);
    },
    edit() {
      this.isDisabled = false;
    },
    confirm() {
      this.isDisabled = true;
    },
    resetForm(formName) {
      console.log(123);
      this.$refs[formName].resetFields();
    },
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

.user-btns {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-btns .btn {
  width: 90px;
}
</style>
