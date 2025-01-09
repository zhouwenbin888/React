<template>
 <div>欢迎{{name}}登录</div>
</template>
<script>
 import axios from "axios";
 export default {
  data() {
   return {
    name: ''
   };
  },
  mounted() {
   this.fetchUserName();
  },
  methods: {
   fetchUserName() {
    // 从本地获取token
    const token = localStorage.getItem('token');
    // 发送请求到后端获取用户信息
    axios.get('/api/teacher/home', {
     headers: {
      'Authorization': ` ${token}`
     }
    })
            .then(response => {
             console.log(response)
             this.name = response.data.data; // 将获取到的用户姓名赋值给 name
             console.log('获取到的用户姓名:', this.name); // 添加控制台输出语句
            })
            .catch(error => {
             console.error('获取用户信息失败', error);
            });
   }}
 };
</script>
<style scoped>
div{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
}
</style>