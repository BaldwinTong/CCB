<template>
  <div>
    <div class="login">
      <div class="logo">管理登录</div>
      <div class="login-info">
        <div class="inputs">
          <el-form
            :model="loginForm"
            label-position="top"
            :rules="loginRules"
            ref="loginForm"
            label-width="100px"
            class="demo-loginForm"
            size="medium "
            hide-required-asterisk
          >
            <el-form-item label="用户名" prop="userName">
              <el-input
                v-model="loginForm.userName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="forgetPassword">
          <div>忘记密码？</div>
        </div>
        <div class="login-btns">
          <el-checkbox v-model="KeepInfo" @change="picker">记住</el-checkbox>
          <input
            type="button"
            class="sub-btn"
            value="登录"
            @click="loginConfirm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import api from '../api/index'
export default {

  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
      },
      KeepInfo: false,
      loginRules: {
        userName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  beforeMount() {
    var str = localStorage.getItem('userInfo');
    if (str) {
     this.loginForm = JSON.parse(str);
    }
  },
  mounted(){
  },
  methods: {
    picker(e) {
      this.KeepInfo = e;
    },
    loginConfirm() {
      if (this.KeepInfo) {
        localStorage.setItem("userInfo", JSON.stringify(this.loginForm));
      }
      this.$refs['loginForm'].validate((valid)=>{
        if (valid) {
          this.$router.push('/home')
        }else{
          alert('登录失败')
        }
      })
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  background:  #5272d8;
}

.login {
  width: 403px;
  height: 375px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.logo {
  width: 100%;
  color: #ffff;
  text-align: center;
  margin: 0;
}

.login-info {
  width: 100%;
  height: 302px;
  background-color: #ffff;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0px 0px 15px #545454;
  padding: 28px 47px 20px 47px;
  box-sizing: border-box;
}

.forgetPassword {
  width: 100%;
  font-size: 12px;
  color: #8c8e91;
  display: flex;
  justify-content: flex-end;
}
.forgetPassword > div {
  cursor: pointer;
}

.login-btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.sub-btn {
  width: 122px;
  height: 32px;
  border: none;
  color: #fff;
  padding-bottom: 2px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  background-image: linear-gradient(#78bbf1, #5e9de9);
}

.sub-btn:hover {
  background-image: linear-gradient(#5e9de9, #78bbf1);
}

/* element UI修改 */
.el-checkbox__label {
  padding-left: 7px;
  font-size: 12px;
}
.el-form-item {
  margin-bottom: 15px;
}
.el-form--label-top .el-form-item__label {
  padding: 0 !important;
}
</style>