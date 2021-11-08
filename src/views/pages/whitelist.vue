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
            <div class="handle-item one" @click="editData">
              <i class="el-icon-edit-outline"></i>
              <span class="title">修改</span>
            </div>
            <div class="handle-item two" @click="deleteData">
              <i class="el-icon-delete"></i>
              <span class="title">删除</span>
            </div>
            <div class="handle-item thr" @click="outExe">
              <i class="iconfont icon-exportdaochu"></i>
              <span class="title">导出</span>
            </div>
            <div class="handle-item thr" @click="inportFile">
              <i class="iconfont icon-daoru"></i>
              <span class="title">导入</span>
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
      :editData="pickeList"
      @editCloseDialog="editCloseDialog"
    ></wed>
  </div>
</template>

<script>
import Mock from "mockjs";
import wadd from "./components/white/whiteAddDataDialog.vue";
import wed from "./components/white/whiteEditDialog.vue";
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

      pickeList: [], //修改

      //弹窗
      showAddDataDialog: false,
      showEidtDialog: false,
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
    editData() {
      if (this.pickeList.length == 1) {
        this.showEidtDialog = true;
      } else {
        this.$mess("您还没有选中或选择了多个要修改的数据");
        return false;
      }
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
    //导入
    inportFile() {
      this.$notify({
        title: "功能开发中...",
        type: "warning",
      });

      // let _this = this;
      // let inputDOM = this.$refs.inputer;
      // // 通过DOM取文件数据
      // this.file = event.currentTarget.files[0];
      // var rABS = false; //是否将文件读取为二进制字符串
      // var f = this.file;
      // var reader = new FileReader();
      // //if (!FileReader.prototype.readAsBinaryString) {
      // FileReader.prototype.readAsBinaryString = function (f) {
      //   var binary = "";
      //   var rABS = false; //是否将文件读取为二进制字符串
      //   var pt = this;
      //   var wb; //读取完成的数据
      //   var outdata;
      //   var reader = new FileReader();
      //   reader.onload = function (e) {
      //     var bytes = new Uint8Array(reader.result);
      //     var length = bytes.byteLength;
      //     for (var i = 0; i < length; i++) {
      //       binary += String.fromCharCode(bytes[i]);
      //     }
      //     var XLSX = require("xlsx");
      //     if (rABS) {
      //       wb = XLSX.read(btoa(fixdata(binary)), {
      //         //手动转化
      //         type: "base64",
      //       });
      //     } else {
      //       wb = XLSX.read(binary, {
      //         type: "binary",
      //       });
      //     }
      //     outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
      //     this.da = [...outdata];
      //     let arr = [];
      //     this.da.map((v) => {
      //       let obj = {};
      //       obj.id = v.id;
      //       obj.status = v.status;
      //       arr.push(obj);
      //     });
      //     console.log(arr);
      //     let para = {
      //       //withList: JSON.stringify(this.da)
      //       withList: arr,
      //     };
      //     _this.$message({
      //       message: "请耐心等待导入成功",
      //       type: "success",
      //     });
      //     withImport(para).then((res) => {
      //       window.location.reload();
      //     });
      //   };
      //   reader.readAsArrayBuffer(f);
      // };
      // if (rABS) {
      //   reader.readAsArrayBuffer(f);
      // } else {
      //   reader.readAsBinaryString(f);
      // }
    },
    // 导出
    outExe() {
      this.$notify({
        title: "功能开发中...",
        type: "warning",
      });
      this.$confirm("此操作将导出excel文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.excelData = this.tableData; //你要导出的数据list。
          this.export2Excel();
        })
        .catch(() => {});
    },

    export2Excel() {
      var that = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel"); //这里必须使用绝对路径
        const tHeader = [
          "num",
          "name",
          "gender",
          "age",
          "userID",
          "bankNumber",
        ]; // 导出的表头名
        const filterVal = [
          "num",
          "name",
          "gender",
          "age",
          "userID",
          "bankNumber",
        ]; // 导出的表头字段名
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);
        // let time1,
        //   time2 = "";
        // if (this.start !== "") {
        //   time1 = that.moment(that.start).format("YYYY-MM-DD");
        // }
        // if (this.end !== "") {
        //   time2 = that.moment(that.end).format("YYYY-MM-DD");
        // }
        // export_json_to_excel(tHeader, data, `[${time1}-${time2}]提现管理excel`); // 导出的表格名称，根据需要自己命名
        export_json_to_excel(tHeader, data, `白名单excel`); // 导出的表格名称，根据需要自己命名
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
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
  width: 256px;
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
</style>
