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
            <el-select v-model="dialogForm.category">
              <el-option
                v-for="item in CategoryList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称：" prop="productName">
            <el-input v-model="dialogForm.productName"></el-input>
          </el-form-item>
          <el-form-item label="当日价格(元/斤)：" prop="todayPrice">
            <el-input v-model="dialogForm.todayPrice"></el-input>
          </el-form-item>
          <el-form-item prop="priceDate" label="单价日期：">
            <el-date-picker
              v-model="dialogForm.priceDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="getInDate" label="录入时间：">
            <el-date-picker
              v-model="dialogForm.getInDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="getInPersonal" label="录入人员：">
            <el-input v-model="dialogForm.getInPersonal"></el-input>
          </el-form-item>
          <el-form-item label="处理：">
            <el-switch
              v-model="dialogForm.tag"
              active-text="启用"
              inactive-text="禁用"
              @change="changeTag"
            >
            </el-switch>
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
export default {
  props: {
    isshowDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogForm: {
        category: "",
        productName: "",
        todayPrice: "",
        priceDate:"",
        getInDate: "",
        getInPersonal: "",
        tag: true,
      },
      dialogRule: {
        category: [
          { required: true, message: "请选择所属类型", trigger: "change" },
        ],
        productName: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
        ],
        todayPrice: [
          { required: true, message: "请输入当日价格", trigger: "blur" },
        ],
        priceDate: [
          { required: true, message: "请输入单价日期", trigger: "blur" },
        ],
        getInDate: [
          { required: true, message: "请输入录入时间", trigger: "blur" },
        ],
        getInPersonal: [
          { required: true, message: "请输入录入人员", trigger: "blur" },
        ],
      },

      CategoryList: [
        {
          label: "蔬菜类",
          value: "蔬菜类",
        },
        {
          label: "瓜果类",
          value: "瓜果类",
        },
      ],
    };
  },
  created() {
    this.dialogVisible = this.isshowDialog;
  },
  methods: {
    onConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("addCloseDialog",false,this.dialogForm)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeTag(e) {
      this.dialogForm.tag = e;
    },
  },
  computed: {},
  watch: {
    dialogVisible() {
      if (!this.dialogVisible) {
        this.$emit("addCloseDialog", false);
      }
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