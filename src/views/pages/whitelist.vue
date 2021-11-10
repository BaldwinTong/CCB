<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>当前位置</el-breadcrumb-item>
      <el-breadcrumb-item>白名单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <div class="search-box">
        <el-form
          class="form"
          :model="searchForm"
          label-width="80px"
          size="mini"
          ref="searchForm"
        >
          <div class="search-item">
            <el-form-item label="姓名：" prop="name">
              <el-input
                v-model="searchForm.name"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="身份证号：" prop="userID">
              <el-input
                v-model="searchForm.userID"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <div class="search-item">
            <el-form-item label="性别：" prop="gender">
              <el-select v-model="searchForm.gender" placeholder="请选择">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="银行卡号：" prop="bankNumber">
              <el-input
                v-model="searchForm.bankNumber"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <div class="search-item">
            <el-form-item label="年龄：" prop="age">
              <el-input
                v-model="searchForm.age"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search"
                >搜索 <i class="el-icon-search"></i
              ></el-button>
              <el-button @click="clearForm('searchForm')" type="info"
                >清空</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="W-content">
      <div class="W-box">
        <div class="W-btns">
          <div class="addData" @click="addData">
            <i class="el-icon-plus addIcon"></i>
            <span>添加数据</span>
          </div>
          <div class="handle-btns">
            <!-- <div class="handle-item one" @click="editData">
              <i class="el-icon-edit-outline"></i>
              <span class="title">修改</span>
            </div> -->
            <div class="handle-item two" @click="deleteData">
              <i class="el-icon-delete"></i>
              <span class="title">删除</span>
            </div>
            <div class="handle-item thr" @click="outExe">
              <i class="iconfont icon-exportdaochu"></i>
              <span class="title">导出</span>
            </div>
            <div class="handle-item thr">
              <i class="iconfont icon-daoru"></i>
              <el-upload
                class="upload-demo"
                :show-file-list="false"
                action=""
                :on-change="handleChange"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :limit="limitUpload"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                :auto-upload="false"
              >
                <span class="title">导入</span>
              </el-upload>
            </div>
          </div>
        </div>

        <div class="W-table">
          <el-table
            :data="tableData"
            style="width: 100%"
            highlight-current-row
            size="small"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="num" label="编号" align="center">
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="gender" label="性别" align="center">
            </el-table-column>
            <el-table-column prop="age" label="年龄" align="center">
            </el-table-column>
            <el-table-column
              prop="userID"
              label="身份证号"
              width="180px"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="bankNumber"
              label="银行卡号"
              width="180px"
              align="center"
            >
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="handleReset(scope.row)"
                  type="primary"
                  plain
                  size="mini"
                  >修改</el-button
                >
                <el-button
                  @click="handleDelete(scope.row)"
                  type="danger"
                  size="mini"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="this.tableData.length"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加弹窗 -->
    <wadd
      v-if="showAddDataDialog"
      :isshowDialog="showAddDataDialog"
      @addCloseDialog="addCloseDialog"
    ></wadd>

    <!-- 编辑弹窗 -->
    <wed
      v-if="showEidtDialog"
      :isshowDialog="showEidtDialog"
      :editData="rowObj"
      @editCloseDialog="editCloseDialog"
    ></wed>
  </div>
</template>

<script>
import Mock from "mockjs";
import wadd from "./components/white/whiteAddDataDialog.vue";
import wed from "./components/white/whiteEditDialog.vue";
import export2Excel from "../../utils/exportfile.js";
export default {
  components: {
    wadd,
    wed,
  },
  data() {
    return {
      searchForm: {
        name: "",
        userID: "",
        gender: "",
        bankNumber: "",
        age: "",
      },
      tableData: [
        {
          num: "0001",
          name: "王小虎",
          gender: "男",
          age: "34",
          userID: "440XXXXXXXXXXX8870",
          bankNumber: "666XXXXXXXXXX4883",
        },
        {
          num: "0002",
          name: "王大虎",
          gender: "男",
          age: "31",
          userID: "440XXXXXXXXXXX8880",
          bankNumber: "666XXXXXXXXXX4893",
        },
      ],
      rowObj:{},
      pickeList: [], //修改

      //弹窗
      showAddDataDialog: false,
      showEidtDialog: false,

      //导入
      limitUpload: 1,
      fileTemp: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    search() {},
    getData() {},
    clearForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSelectionChange(val) {
      this.pickeList = val;
    },
    addData() {
      this.showAddDataDialog = true;
    },
    deleteData() {
      if (this.pickeList.length < 1) {
        this.$mess("您还没有选中要删除的数据");
        return false;
      } else {
        let numId = [];
        this.pickeList.forEach((item) => {
          numId.push(item.num);
        });
        let data = this.tableData.filter((v) => !numId.includes(v.num));
        this.tableData = data;
      }
    },
    handleReset(row) {
      console.log(131313213);
      this.rowObj = row
       this.showEidtDialog = true;
    },

    handleDelete(row) {
      this.$confirm("此操作将删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData = this.tableData.filter((v) => v.num != row.num);
          this.$mess({
            message: "删除成功",
            type: "success",
          });
        })
        .catch(() => {
          this.$mess("取消删除");
        });
    },

    addCloseDialog(e, data) {
      this.showAddDataDialog = e;
      if (data) {
        console.log(data);
        let id = Mock.mock({
          id: Mock.Random.id("@id"),
        });
        data.num = id.id;
        this.tableData.push(data);
      }
    },

    editCloseDialog(e, data) {
      this.showEidtDialog = e;
      if (data) {
        this.tableData.forEach((item) => {
          if (data.num == item.num) {
            item = data;
          }
        });
      }
    },

    // 导出
    outExe() {
      this.$confirm("此操作将导出excel文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const tHeader = [
            "编号",
            "姓名",
            "性别",
            "年龄",
            "身份证号",
            "银行卡号",
          ]; // 导出的表头名
          const filterVal = [
            "num",
            "name",
            "gender",
            "age",
            "userID",
            "bankNumber",
          ]; // 导出的表头字段名
          export2Excel(this.tableData, tHeader, filterVal, "白名单");
        })
        .catch(() => {
          console.log("导出失败");
        });
    },

    handleChange(file) {
      this.fileTemp = file.raw;
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.importfxx(this.fileTemp);
          this.$mess({
            type: "success",
            message: "上传成功",
          });
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！",
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！",
        });
      }
    },
    handleExceed() {
      this.$message({
        type: "warning",
        message: "超出最大上传文件数量的限制！",
      });
      return;
    },
    handleRemove() {
      this.fileTemp = null;
    },
    importfxx(event) {
      console.log(event, "-----------");
      let that = this;
      var reader = new FileReader();
      var XLSX = require("xlsx");
      reader.onload = function (e) {
        var data = e.target.result;
        console.log(data);
        var wb = XLSX.read(data, {
          type: "buffer",
        });
        var outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        console.log(outdata);
        outdata.map((v) => {
          let obj = {};
          obj.num = v["编号"];
          obj.name = v["姓名"];
          obj.gender = v["性别"];
          obj.age = v["年龄"];
          obj.userID = v["身份证号"];
          obj.bankNumber = v["银行卡号"];
          that.tableData.push(obj);
        });
      };
      reader.readAsArrayBuffer(event);
    },
  },
  computed: {},
};
</script>

<style>
.search,
.W-content {
  width: 100%;
  display: flex;
  justify-content: center;
}
.search .search-box {
  width: 100%;
  margin-top: 20px;
  background-color: #fff;
  padding-top: 22px;
  box-sizing: border-box;
  box-shadow: 2px 3px 7px 2px #cccc;
  border-radius: 2px;
}
.search .search-box .form {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-form-item__label {
  font-size: 12px !important;
  color: #373737 !important;
  font-weight: 900;
}

.W-content .W-box {
  width: 100%;
  background-color: #fff;
  box-shadow: 2px 3px 7px 2px #cccc;
  border-radius: 2px;
  margin-top: 12px;
  padding: 10px;
  box-sizing: border-box;
}

.W-content .W-box .W-btns {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.W-content .W-box .W-btns .addData {
  width: 92px;
  background-color: #4378ed;
  font-size: 12px;
  color: #fff;
  line-height: 30px;
  border-radius: 2px;
  cursor: pointer;
  text-align: center;
  font-weight: 800;
}
.addIcon {
  font-weight: 900 !important;
  margin-right: 4px;
}

.W-content .handle-btns {
  width: 175px;
  border-radius: 2px;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #f1f4f8;
  font-size: 12px;
  line-height: 30px;
  margin-left: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 6px;
  color: #888888;
}

.W-content .handle-btns .handle-item {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.W-content .handle-btns .one:hover,
.W-content .handle-btns .two:hover,
.W-content .handle-btns .thr:hover,
.W-content .handle-btns .four:hover {
  color: #519fee;
}
.W-content .handle-btns .title {
  margin-left: 3px;
}

.W-table {
  padding: 0 12px;
  box-sizing: border-box;
  border-top: 1px solid #ebeef5;
  margin-top: 20px;
}
.W-table .el-table th.el-table__cell > .cell {
  color: #262626;
  font-weight: 700;
}
.pagination {
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

/* 文件导入input */
input::-webkit-file-upload-button {
  background: #efeeee;
  color: #333;
  border: 0;
  padding: 0;
  border-radius: 5px;
  font-size: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.12);
}
</style>
