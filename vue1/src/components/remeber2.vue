<template>
  <div class="num">
    <div className="nm">
      <h2 style="font-weight: 400;font-style: italic;">找回密码</h2>
      <el-input v-model="phone" placeholder="请输入手机号" clearable />
      <div  v-show="show" >{{ msg }}</div>
      <div v-if="!isPhoneValid && isTouched" style="color: red;">请输入正确手机号</div>
      <div v-if="!isRegistered && isTouched" style="color: red;">该账户未注册</div>
      <button className="deng" @click="login">登录</button>
    </div>
  </div>
</template>

<style scoped>
.deng {
  background-color: #c62922;
  border: #979797;
  border-radius: 24.5px;
  color: #fff;
  height: 48px;
  letter-spacing: 5px;
  width: 250px;
  margin: 0;
}
.num {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  background: url(../views/background.jpg);
  background-size: cover;
}
.nm {
  flex: 1;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 200px;
}

.el-input {
  margin: 15px;
  height: 40px;
  width: 250px !important;
}
.nm>div{
  margin-bottom: 10px;
}
</style>

<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue'

const phone = ref('')
const password = ref('')
const show = ref(false)
const isTouched = ref(false)
const isPhoneValid = ref(true)
const isRegistered = ref(true)
const msg=ref('')

const login = async () => {
  isTouched.value = true
  show.value = false
  isPhoneValid.value = /^1[3456789]\d{9}$/.test(phone.value)
  if (!isPhoneValid.value) {
    return
  }
  try {
    const res = await axios.post('/api/student/remember', { stu_account: phone.value })
    console.log(res)
    if (res.data) {
      password.value = res.data.password
      show.value = true
      isRegistered.value = true
      msg.value=res.data.msg
    } else {
      isRegistered.value = false
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
