<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>当前位置</el-breadcrumb-item>
      <el-breadcrumb-item>产品单价</el-breadcrumb-item>
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
            <el-form-item label="录入时间：" prop="date1">
              <el-date-picker
                v-model="searchForm.date1"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="search-item">
            <el-form-item label="产品名称：" prop="productName">
              <el-input
                v-model="searchForm.productName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="录入时间：" prop="date2">
              <el-date-picker
                v-model="searchForm.date2"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="search-item">
            <el-form-item label="当日价格：" prop="todayPrice">
              <el-input
                v-model="searchForm.todayPrice"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="录入人员：" prop="getInUserName">
              <el-input
                v-model="searchForm.getInUserName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <div class="search-item">
            <el-form-item>
              <el-button class="P-btn" type="primary" @click="search"
                >搜索 <i class="el-icon-search"></i
              ></el-button>
              <br />
              <el-button class="P-btn" @click="clearForm('searchForm')"
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
            <el-table-column
              prop="num"
              label="编号"
              align="center"
              width="80px"
            >
            </el-table-column>
            <el-table-column prop="category" label="所属类别" align="center">
            </el-table-column>
            <el-table-column prop="productName" label="产品名称" align="center" width="100px">
            </el-table-column>
            <el-table-column
              prop="todayPrice"
              label="当日价格(元/斤)"
              align="center"
              
            >
            </el-table-column>
            <el-table-column prop="priceDate" label="单价日期" align="center">
            </el-table-column>
            <el-table-column prop="getInDate" label="录入时间" align="center">
            </el-table-column>
            <el-table-column
              prop="getInPersonal"
              label="录入人员"
              align="center"
              width="100px"
            >
            </el-table-column>
            <el-table-column prop="handle" label="处理" align="center" width="80px">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag
                    size="medium"
                    effect="plain"
                    type=""
                    v-if="scope.row.tag"
                  >
                    启用</el-tag
                  >
                  <el-tag size="medium" effect="plain" type="danger" v-else>
                    禁用</el-tag
                  >
                </div>
              </template>
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
    <padd
      v-if="showAddDataDialog"
      :isshowDialog="showAddDataDialog"
      @addCloseDialog="addCloseDialog"
    ></padd>
    <pedit
      v-if="isshowEditvisible"
      :editData="dataItem"
      :isshowDialog="isshowEditvisible"
      @editcloseDialog="editcloseDialog"
    ></pedit>
  </div>
</template>

<script>
import padd from "./components/proPrice/priceAddDialog.vue";
import pedit from "./components/proPrice/priceEidtDialog.vue";
import export2Excel from "../../utils/exportfile.js";
export default {
  data() {
    return {
      searchForm: {
        BelongType: "",
        productName: "",
        date1: "",
        date2: "",
        todayPrice: "",
        getInUserName: "",
      },
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
      tableData: [
        {
          num: "0001",
          category: "蔬菜类",
          productName: "小白菜",
          todayPrice: "1.40",
          priceDate: "2021-06-20",
          getInDate: "2021-06-22",
          getInPersonal: "王大锤",
          tag: false,
        },
      ],
      // 点击事件
      showAddDataDialog: false,
      isshowEditvisible: false,
      pickeList: [], //选中
      dataItem: {},
      limitUpload: 1,
      fileTemp: null,
    };
  },
  components: { padd, pedit },
  created() {},
  methods: {
    search() {},
    clearForm(formName) {
      this.$refs[formName].resetFields();
    },
    addData() {
      this.showAddDataDialog = true;
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
    handleSelectionChange(val) {
      this.pickeList = val;
    },
    deleteData() {
      if (this.pickeList.length < 1) {
        this.$mess("您还没有选中要删除的数据");
        return false;
      } else {
        this.$confirm(
          `此操作将删除这${this.pickeList.length}条数据, 是否继续?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            let numId = [];
            this.pickeList.forEach((item) => {
              numId.push(item.num);
            });
            let data = this.tableData.filter((v) => !numId.includes(v.num));
            this.tableData = data;
          })
          .catch(() => {
            this.$mess("取消删除");
          });
      }
    },
    addCloseDialog(e, data) {
      this.showAddDataDialog = e;
      if (data) {
        data.num = "000" + (this.tableData.length + 1);
        this.tableData.push(data);
      }
    },

    editcloseDialog(e, data) {
      console.log(e, "-----");
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
            "当日价格",
            "单价日期",
            "录入时间",
            "录入人员",
            "处理",
          ]; // 导出的表头名
          const filterVal = [
            "num",
            "category",
            "productName",
            "todayPrice",
            "priceDate",
            "getInDate",
            "getInPersonal",
            "tag",
          ]; // 导出的表头字段名
          export2Excel(this.tableData, tHeader, filterVal, "产品单价");
        })
        .catch(() => {
          console.log("导出失败");
        });
    },
    // 导入

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
      let that = this;
      var reader = new FileReader();
      var XLSX = require("xlsx");
      reader.onload = function (e) {
        var data = e.target.result;
        var wb = XLSX.read(data, {
          type: "buffer",
        });
        var outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        outdata.map((v) => {
          let obj = {};
          obj.num = v["编号"];
          obj.category = v["所属类型"];
          obj.productName = v["产品名称"];
          obj.todayPrice = v["当日价格"];
          obj.priceDate = v["单价日期"];
          obj.getInDate = v["录入时间"];
          obj.getInPersonal = v["录入人员"];
          obj.tag = v["处理"];
          that.tableData.push(obj);
        });
      };
      reader.readAsArrayBuffer(event);
    },
  },
  computed: {},
};
</script>

<style scope>
.P-btn {
  width: 72px;
}
.P-btn:last-child {
  margin-top: 20px;
}
.el-select .el-input__inner {
  cursor: pointer;
  padding-right: 0px;
}
</style>
