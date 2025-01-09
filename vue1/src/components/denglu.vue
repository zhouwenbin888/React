
<template>
  <div class="bak">
    <div class="denglu2">
      <h3>欢迎登录</h3>
      <div class="denglu" style="height:60%;">
        <div class="top">
          <div class="qiye" @click="showComponent = 'admin'" :class="{active: showComponent === 'admin'}">管理员</div>
          <div class="geren" @click="showComponent = 'teacher'" :class="{active: showComponent === 'teacher'}">老师</div>
          <div class="geren" @click="showComponent = 'student'" :class="{active: showComponent === 'student'}">学生</div>
        </div>
        <Biaodan1 v-if="showComponent === 'admin'"></Biaodan1>
        <Biaodan2 v-if="showComponent === 'teacher'"></Biaodan2>
        <Biaodan3 v-if="showComponent === 'student'"></Biaodan3>
      </div>
    </div>
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
  background-color: rgba(255, 255, 255, 0.6);
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
  ;
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
.bak {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  background: url(../views/background.jpg);
  background-size: cover;
  opacity: 1;
}
</style>
<script>
import Biaodan2 from './biaodan2.vue'
import Biaodan1 from './biaodan1.vue'
import Biaodan3 from './biaodan3.vue'
export default {
  name: 'Denglu1',
  data() {
    return {
      showComponent: 'admin'
    };
  },
  components:{
    Biaodan2,
    Biaodan1,
    Biaodan3,
  }
}
</script>