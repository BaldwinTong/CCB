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
        >
          <div class="search-item">
            <el-form-item label="所属类别：">
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
            <el-form-item label="录入时间：">
              <el-date-picker
                v-model="searchForm.date1"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="search-item">
            <el-form-item label="产品名称：">
              <el-input
                v-model="searchForm.productName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="录入时间：">
              <el-date-picker
                v-model="searchForm.date2"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="search-item">
            <el-form-item label="当日价格：">
              <el-input
                v-model="searchForm.todayPrice"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="录入人员：">
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
              <el-button class="P-btn" @click="clearForm">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>

    <div class="W-content">
      <div class="W-box">
        <div class="W-btns">
          <div class="addData">
            <i class="el-icon-plus addIcon"></i>
            <span>添加数据</span>
          </div>
          <div class="handle-btns">
            <div class="handle-item one">
              <i class="el-icon-edit-outline"></i>
              <span class="title">修改</span>
            </div>
            <div class="handle-item two">
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
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              prop="num"
              label="编号"
              align="center"
              width="80px"
            >
            </el-table-column>
            <el-table-column prop="type" label="所属类别" align="center">
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
                  <el-tag size="medium">{{ scope.row.tag }}</el-tag>
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
  </div>
</template>

<script>
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
          type: "蔬菜类",
          productName: "小白菜",
          todayPrice: "1.40",
          priceDate: "2021-06-20",
          getInDate: "2021-06-22",
          getInPersonal:"王大锤",
          tag: "启用",
        },
      ],
    };
  },
  components: {},
  created() {},
  methods: {
    search() {},
    clearForm() {},
    addData() {},
    handleClick(value) {
      console.log(value);
    },
  },
  computed: {},
};
</script>

<style >
.P-btn {
  width: 72px;
}
.P-btn:last-child {
  margin-top: 20px;
}
</style>
