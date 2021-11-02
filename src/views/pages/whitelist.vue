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
        >
          <div class="search-item">
            <el-form-item label="姓名：">
              <el-input
                v-model="searchForm.name"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="身份证号：">
              <el-input
                v-model="searchForm.userID"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <div class="search-item">
            <el-form-item label="性别：">
              <el-select v-model="searchForm.gender" placeholder="请选择">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="银行卡号：">
              <el-input
                v-model="searchForm.bankNumber"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <div class="search-item">
            <el-form-item label="年龄：">
              <el-input
                v-model="searchForm.age"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search"
                >搜索 <i class="el-icon-search"></i
              ></el-button>
              <el-button @click="clearForm">清空</el-button>
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
    };
  },
  components: {},
  created() {
    this.getData();
  },
  methods: {
    search() {},
    clearForm() {},
    addData() {},
    getData() {
      // this.$http.get('http://test.com/api/detailData').then(res=>{
      //   console.log(res);
      // })
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
.addIcon{
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
.pagination{
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
