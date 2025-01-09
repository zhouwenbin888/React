<template>
  <div class="biaodan">
    <input class="input1" type="text" placeholder="账户" v-model="account" @focus="clearError('accountError')"
      ref="input1" />
    <div class="error1" ref="accountError"></div>
    <input class="input2" type="password" placeholder="密码" v-model="password" @focus="clearError('passwordError')"
      ref="input2" />
    <div class="error2" ref="passwordError"></div>
    <div class="fuxuan">
      <div class="input3" @click="check = !check" :class="{ active: check }"></div>
      <span>记住密码</span>
    </div>
    <button class="deng" @click="login">登录</button>
    <div style="display:inline-block;width: 100%;height: 100px;"></div>
  </div>
</template>
<style scoped>
.top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 320px;
  margin: 10px 0 20px 40px;
}

.qiye,
.geren {
  color: #303133;
  text-align: center;
  font-size: 14px;
  width: 50%;
  padding-bottom: 10px;
}

.qiye:hover,
.geren:hover {
  color: #c62922;
}

.fuxuan input[type=checkbox]:checked+span {
  color: rgb(0, 166, 255);
}

.fuxuan {
  display: flex;
  align-items: center;
  margin: 0;
  height: 20px;
  padding: 0;
}

span {
  height: 20px;
  font-size: 14px;
  color: #666;
}

.denglu2 {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  width: 100%;
  height: 100vh
}

h3 {
  font-weight: bold;
  font-size: 20px;
  margin-left: 40px;
  margin-top: 60px;
}

.denglu {
  margin-left: 40px;
}

.biaodan {
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 360px;
  border-radius: 10px;
  box-shadow: 4px 4px 20px #cccccc19;
}

.input1 {
  margin: 60px 20px 0 20px;
}

.input2 {
  margin: 0 20px;
}

.input3.active {
  background-color: rgb(0, 166, 255);
}

.input3.active::after {
  content: "√";
  color: white;
  font-size: 10px;
  display: flex;
  justify-content: center;
}

.input3 {
  display: inline-block;
  border: 1px solid#DCDFE6;
  border-radius: 4px;
  width: 12px;
  height: 12px;
  background-color: #FFF;
  margin: 0 10px 0 20px;
}

input {
  margin: 20px;
  outline: none;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  height: 48px;
}

input::placeholder {
  color: #999;
  text-indent: 10px;
}

input:focus {
  border-color: rgb(0, 174, 255);
}

.error1,
.error2 {
  display: inline-block;
  width: 50%;
  height: 20px;
  color: #F56C6C;
  padding-left: 20px;
  font-size: 12px;
}

.deng {
  background-color: #c62922;
  border: #979797;
  border-radius: 24.5px;
  color: #fff;
  height: 48px;
  letter-spacing: 5px;
  width: 320px;
  margin: 20px;
}

#comfooter {
  bottom: 20px;
  left: 77%;
  position: absolute;
  transform: translateX(-50%);
  width: 100%;
  margin-top: 20px;
}

.geren.active,
.qiye.active {
  border-bottom: 2px solid #c62922;
  color: #c62922;
}

.footer1 {
  box-sizing: border-box;
  margin: 0 auto;
  text-align: center;
}

.footertop a {
  height: 40px;
  line-height: 40px;
  margin: 0 10px;
}

input.error {
  border-color: #F56C6C;
}
</style>
<script>
import axios from 'axios';

export default {
  name: 'Biaodan2',
  data() {
    return {
      account: "",
      password: "",
      check: false
    };
  },
  methods: {
    clearError(refName) {
      this.$refs[refName].innerHTML = "";
    },
    addInputError(className, refName, errorMessage) {
      this.$refs[refName].innerHTML = errorMessage;
      this.$refs[className].classList.add('error');
    },
    removeInputError(className) {
      this.$refs[className].classList.remove('error');
    },
    login() {
      const formData = new FormData();
      formData.append('mgr_account', this.account);
      formData.append('mgr_password', this.password);

      axios.post('/api/admin/login', formData)
          .then(response => {
            console.log(response)
            if (response.data.msg === "success") {
              const storedToken = localStorage.getItem('token');
              if (storedToken) {
                if (storedToken !== response.data.data) {
                  // Remove old token and add new token
                  localStorage.removeItem('token');
                  localStorage.setItem('token', response.data.data);
                }
              } else {
                // Add new token
                localStorage.setItem('token', response.data.data);
              }
              this.$router.push('/adminhome');
            }
            else if(response.data.msg === "no exist")
            {
              this.addInputError('input1', 'accountError', '*账户不存在');
            }
            else if(response.data.msg === "password error")
            {
              this.addInputError('input2', 'passwordError', '*账户或密码错误');
            }
          })
          .catch(error => {
            console.log(error);
          });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      switch (true) {
        case (this.account === ""):
          this.addInputError('input1', 'accountError', '*请输入邮箱');
          break;
        case (!emailRegex.test(this.account)):
          this.addInputError('input1', 'accountError', '*请输入正确邮箱'); 
          break;
        default:
          this.removeInputError('input1');
      }
      switch (true) {
        case (this.password === ""):
          this.addInputError('input2', 'passwordError', '*请输入密码');
          break;
        case (this.password !== "" && this.account === ""):
          this.addInputError('input2', 'passwordError', '*请输入账户');
          break;
        default:
          this.removeInputError('input2');
      }
    },
  },
}
</script>