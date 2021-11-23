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
          :rules="infoFormRules"
          :inline="true"
          :hide-required-asterisk="isDisabled"
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
            @click="confirm('infoForm')"
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
import { GetUserInfo, UpdateUserInfo } from "../../api/userInfo";
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
        bankName: "",
        bankNumber: "",
        provinceCode: "",
        cityCode: "",
        areaCode: "",
        areaRegion: [],
      },
      infoFormRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
        idCardNum: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        bankName: [
          { required: true, message: "请输入银行名称", trigger: "blur" },
        ],
        bankNumber: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
        ],
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
  },
  methods: {
    getData() {
      GetUserInfo({})
        .then((res) => {
          this.infoForm = res.data.result.items[0];
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
          let addres = [];
          this.addressList.forEach((pro_item) => {
            if (pro_item.code == obj.provinceCode) {
              addres.push(pro_item.code);
              pro_item.children.forEach((city_item) => {
                if (city_item.code == obj.cityCode) {
                  addres.push(city_item.code);
                  city_item.children.forEach((area_item) => {
                    if (area_item.code == obj.areaCode) {
                      addres.push(area_item.code);
                    }
                  });
                }
              });
            }
          });
          this.infoForm.areaRegion = addres;
        })
        .catch((fail) => {
          console.log(fail);
        });
    },
    handleChange(value) {
      console.log(value);
      if (value) {
        this.infoForm.address = "";
      }
    },
    edit() {
      this.isDisabled = false;
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          UpdateUserInfo(this.infoForm)
            .then((res) => {
              if (res.data.success) {
                this.isDisabled = true;
                 this.$store.dispatch('userInfo/UpdateUserInfo',this.infoForm)
                this.$mess({
                  type: "success",
                  message: "修改成功!",
                });
              }
            })
            .catch((fail) => {
              console.log(fail);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      if (!this.isDisabled) {
        this.$refs[formName].resetFields();
        console.log(this.infoForm);
      } else {
        this.$mess({
          type: "warning",
          message: "请点击修改后再重置!",
        });
      }
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
