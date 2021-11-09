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
            <div class="handle-item one">
              <i class="el-icon-edit-outline"></i>
              <span class="title">修改</span>
            </div>
            <div class="handle-item two" @click="deleteData">
              <i class="el-icon-delete"></i>
              <span class="title">删除</span>
            </div>
            <div class="handle-item thr">
              <i class="iconfont icon-exportdaochu"></i>
              <span class="title">导出</span>
            </div>
            <div class="handle-item thr">
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
            <el-table-column
              prop="num"
              label="编号"
              align="center"
              width="80px"
            >
            </el-table-column>
            <el-table-column prop="category" label="所属类别" align="center">
            </el-table-column>
            <el-table-column prop="productName" label="产品名称" align="center">
            </el-table-column>
            <el-table-column
              prop="todayPrice"
              width="180px"
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
            >
            </el-table-column>
            <el-table-column prop="handle" label="处理" align="center">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{
                    scope.row.tag ? "启用" : "禁用"
                  }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
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
            <el-pagination background layout="prev, pager, next" :total="100">
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
    <pedit></pedit>
  </div>
</template>

<script>
import padd from "./components/proPrice/priceAddDialog.vue";
import pedit from "./components/proPrice/priceEidtDialog.vue";
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
      pickeList: [], //选中
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
    handleClick(value) {
      console.log(value);
    },
    handleSelectionChange(val) {
      this.pickeList = val;
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
    addCloseDialog(e, data) {
      console.log(e, data);
      this.showAddDataDialog = e;
      if (data) {
        data.num = "000" + (this.tableData.length + 1);
        this.tableData.push(data);
      }
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
