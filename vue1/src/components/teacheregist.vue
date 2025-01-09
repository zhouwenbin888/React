<template>
  <div class="container">
    <div class="form-container">
      <h2 class="tab">教师注册</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <!-- <label>工号</label> -->
          <input type="text" v-model="account" class="custom-input" placeholder="请输入账号" />
        </div>
        <div class="form-group">
          <!-- <label>邮箱</label> -->
          <input type="password" v-model="password" class="custom-input" placeholder="请输入密码" />
        </div>
        <div class="form-group">
          <!-- <label>密码</label> -->
          <input type="password" v-model="confirmpassword" class="custom-input" placeholder="请确认密码" />
        </div>

        <div class="center">
          <button class="custom-button">注册</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      account: '',
      password: '',
      confirmpassword: ''
    };
  },
  methods: {
    register() {
      const formData = new FormData();
      formData.append('teacher_account', this.account);
      formData.append('teacher_password', this.password);
      formData.append('confirmPassword', this.password);


      axios.post('/api/teacher/register', formData)
        .then((response) => {
          console.log(response.data);
          if (response.data.msg === '注册成功') {
            alert(response.data.msg)
            this.$router.push('/denglu');
          }
          else{
            alert(response.data.msg)
          }
        })
        .catch((error) => {
          console.log(error);
          // 处理错误响应
        });
    }
  }
};
</script>



<style scoped>
body {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(../views/background.jpg);
  background-size: cover;
}


.form-container {
  width: 27%;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form-group {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

.tab {
  font-size: 30px;
  vertical-align: middle;
  text-align: center;
  color: rgb(0, 0, 0);
  font-weight: bold;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

}

.custom-input {
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 16px;
  transition: border-color 0.2s ease-in-out;
  background-color: white;
  opacity: 0.8;
  margin: 0 20px;
}

.custom-input:focus {
  border-color: #0078d7;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-button {
  width: 60%;
  height: 50px;
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease-in-out;
  background-color: #ec5555;
  color: #fff;
  margin-bottom: 80px;
  margin-top: 20px;
}

.custom-button:hover {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.custom-button:active {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>


