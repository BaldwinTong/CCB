<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>当前位置</el-breadcrumb-item>
      <el-breadcrumb-item>农产品</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <div class="search-box">
        <el-form
          class="form"
          :model="searchForm"
          label-width="80px"
          ref="searchForm"
          size="mini"
        >
          <div class="search-item">
            <el-form-item label="所属类别：" prop="BelongType">
              <el-select v-model="searchForm.BelongType" placeholder="请选择">
                <el-option
                  v-for="item in belongList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最高价格：" prop="hightPrice">
              <el-input
                class="padd-right"
                v-model="searchForm.hightPrice"
                placeholder="请输入"
              ></el-input>
              <div class="unit">元/斤</div>
            </el-form-item>
          </div>
          <div class="search-item">
            <el-form-item label="产品名称：" prop="productName">
              <el-input
                v-model="searchForm.productName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="年交易量：" prop="yearValue">
              <el-input
                class="padd-right"
                v-model="searchForm.yearValue"
                placeholder="请输入"
              ></el-input>
              <div class="unit">吨</div>
            </el-form-item>
          </div>
          <div class="search-item">
            <el-form-item label="最低价格：" prop="bottomPrice">
              <el-input
                class="padd-right"
                v-model="searchForm.bottomPrice"
                placeholder="请输入"
              ></el-input>
              <div class="unit">元/斤</div>
            </el-form-item>
            <el-form-item>
              <el-button class="check-btn" @click="search"
                >查询 <i class="el-icon-search"></i
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
            <el-table-column prop="category" label="所属类别" align="center">
            </el-table-column>
            <el-table-column prop="productName" label="产品名称" align="center">
            </el-table-column>
            <el-table-column
              prop="bottomPrice"
              label="最低价格(元/斤)"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="highestPrice"
              label="最高价格(元/斤)"
              width="180px"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="yearValue"
              label="年交易量(吨)"
              width="180px"
              align="center"
            >
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit(scope.row)"
                  type="primary"
                  plain
                  size="mini"
                  >编辑</el-button
                >
                <el-button
                  @click="handleClick(scope.row)"
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
              :total="tableData.length"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <farm-add
      v-if="isshowAddvisible"
      :isshow="isshowAddvisible"
      @addcloseDialog="addcloseDialog"
    ></farm-add>

    <farm-edit
      v-if="isshowEditvisible"
      :editData="dataItem"
      :isshow="isshowEditvisible"
      @editcloseDialog="editcloseDialog"
    ></farm-edit>
  </div>
</template>

<script>
import farmAdd from "./components/farm/farmAddDialog.vue";
import farmEdit from "./components/farm/farmEditDialog.vue";
import export2Excel from "../../utils/exportfile.js";
export default {
  data() {
    return {
      searchForm: {
        BelongType: "",
        hightPrice: "",
        productName: "",
        yearValue: "",
        bottomPrice: "",
      },
      tableData: [
        {
          num: "0001",
          category: "蔬菜类",
          productName: "小白菜",
          bottomPrice: "1.40",
          highestPrice: "4.60",
          yearValue: "200.62",
        },
        {
          num: "0002",
          category: "蔬菜类",
          productName: "西蓝花",
          bottomPrice: "3.50",
          highestPrice: "5.50",
          yearValue: "400.62",
        },
      ],
      belongList: [
        {
          value: "蔬菜类",
          label: "蔬菜类",
        },
        {
          value: "瓜果类",
          label: "瓜果类",
        },
        {
          value: "海鲜类",
          label: "海鲜类",
        },
        {
          value: "家禽类",
          label: "家禽类",
        },
      ],
      limitUpload: 1,
      fileTemp: null,
      pickeList: [], //修改
      dataItem: {},
      isshowAddvisible: false,
      isshowEditvisible: false,
    };
  },
  components: {
    farmAdd,
    farmEdit,
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {},
    search() {},
    clearForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSelectionChange(val) {
      this.pickeList = val;
    },
    addData() {
      this.isshowAddvisible = true;
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

    addcloseDialog(e, data) {
      this.isshowAddvisible = e;
      if (data) {
        data.num = "000" + (this.tableData.length + 1);
        this.tableData.push(data);
      }
    },
    editcloseDialog(e, data) {
      this.isshowEditvisible = e;
      console.log(data);
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
            "所属类型",
            "产品名称",
            "最低价格",
            "最高价格",
            "年交易量",
          ]; // 导出的表头名
          const filterVal = [
            "num",
            "category",
            "productName",
            "bottomPrice",
            "highestPrice",
            "yearValue",
          ]; // 导出的表头字段名
          export2Excel(this.tableData, tHeader, filterVal, "农产品");
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
          obj.category = v["所属类型"];
          obj.productName = v["产品名称"];
          obj.bottomPrice = v["最低价格"];
          obj.highestPrice = v["最高价格"];
          obj.yearValue = v["年交易量"];
          that.tableData.push(obj);
        });
      };
      reader.readAsArrayBuffer(event);
    },
    handleEdit(row) {
      this.dataItem = row;
      this.isshowEditvisible = true;
    },
    handleClick(row) {
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
  },
  computed: {},
};
</script>

<style scoped>
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
  padding: 22px 12px 0;
  box-sizing: border-box;
  box-shadow: 2px 3px 7px 2px #cccc;
  border-radius: 2px;
}
.search .search-box .form {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
/* 
.search-item{
  width: 28%;
} */

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
.el-select-dropdown__item {
  font-size: 12px;
}
.check-btn {
  background-color: #05beab !important;
  color: #fff !important;
}

.unit {
  width: 50px;
  height: 28px;
  border: 1px solid #c0c4cc;
  font-size: 12px;
  box-sizing: border-box;
  text-align: center;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  position: absolute;
  top: 0px;
  right: 0px;
}

.padd-right .el-input__inner {
  padding-right: 56px !important;
  box-sizing: border-box;
}
</style>
