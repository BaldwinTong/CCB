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
             <el-form-item label="产品名称：">
              <el-input
                v-model="searchForm.productName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <div class="search-item">
            <el-form-item label="当日价格：">
               <el-input
                v-model="searchForm.todayPrice"
                placeholder="请输入"
              ></el-input>
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
            <el-form-item label="年龄：">
              <el-input
                v-model="searchForm.age"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <div class="search-item">
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
    };
  },
  components: {},
  created() {},
  methods: {
    search() {},
    clearForm() {},
    addData() {},
  },
  computed: {},
};
</script>

<style >
</style>
