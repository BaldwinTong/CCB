<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div class="dialogCont">
        <el-form
          :model="dialogForm"
          :rules="dialogRule"
          label-width="135px"
          size="small"
          ref="dialogForm"
        >
          <el-form-item label="所属类别：" prop="category">
            <el-select v-model="dialogForm.category" @change="changeCategory">
              <el-option
                v-for="item in CategoryList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称：" prop="productName">
            <el-input v-model="dialogForm.productName"></el-input>
          </el-form-item>
          <el-form-item label="最低价格(元/斤)：" prop="bottomPrice">
            <el-input v-model="dialogForm.bottomPrice"></el-input>
          </el-form-item>
          <el-form-item label="最高价格(元/斤)：" prop="highestPrice">
            <el-input v-model="dialogForm.highestPrice"></el-input>
          </el-form-item>
          <el-form-item label="年交易量(吨)：" prop="yearValue">
            <el-input v-model="dialogForm.yearValue"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm('dialogForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { CategoryGetAll } from "../../../../api/FarmProductCategory.js";
export default {
  props: {
    isshow: {
      typeof: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogForm: {
        category: "",
        productName: "",
        farmProductCategoryId: "",
        bottomPrice: "",
        highestPrice: "",
        yearValue: "",
      },
      dialogRule: {
        category: [
          { required: true, message: "请选择所属类型", trigger: "change" },
        ],
        productName: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
        ],
        bottomPrice: [
          { required: true, message: "请输入最低价格", trigger: "blur" },
        ],
        highestPrice: [
          { required: true, message: "请输入最高价格", trigger: "blur" },
        ],
        yearValue: [
          { required: true, message: "请输入年成交量", trigger: "blur" },
        ],
      },

      CategoryList: [],
    };
  },
  created() {
    this.dialogVisible = this.isshow;
    this.getCategoryList();
  },
  methods: {
    changeCategory(e) {
      this.CategoryList.forEach((item) => {
        if (e == item.name) {
          this.dialogForm.farmProductCategoryId = item.id;
        }
      });
    },
    getCategoryList() {
      CategoryGetAll()
        .then((res) => {
          this.CategoryList = res.data.result.items;
        })
        .catch((fail) => {
          console.log(fail);
        });
    },
    onConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogForm.bottomPrice = Number(this.dialogForm.bottomPrice);
          this.dialogForm.highestPrice = Number(this.dialogForm.highestPrice);
          this.dialogForm.yearValue = Number(this.dialogForm.yearValue);
          this.$emit("addcloseDialog", false, this.dialogForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  computed: {},
  watch: {
    dialogVisible(e) {
      this.$emit("addcloseDialog", e);
    },
  },
};
</script>
<style lang='less' scoped>
.dialogCont {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>