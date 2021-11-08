<template>
  <div>
    <el-dialog title="添加数据" :visible.sync="dialogVisible" width="30%">
      <div class="dialogCont">
        <el-form
          :model="dialogForm"
          :rules="dialogRule"
          label-width="100px"
          size="small"
          ref="dialogForm"
        >
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="dialogForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="gender">
            <el-select v-model="dialogForm.gender" placeholder="请输入" clearable >
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄：" prop="age">
            <el-input v-model="dialogForm.age"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="userID">
            <el-input v-model="dialogForm.userID"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号：" prop="bankNumber">
            <el-input v-model="dialogForm.bankNumber"></el-input>
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
  components: {},
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
        name: "",
        gender: "",
        age: "",
        userID: "",
        bankNumber: "",
      },
      dialogRule: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        userID: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        bankNumber: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.dialogVisible = this.isshowDialog;
  },
  methods: {
    onConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("addCloseDialog", false, this.dialogForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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