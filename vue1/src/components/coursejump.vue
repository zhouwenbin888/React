<template>
    <div class="container">
      <div class="bg-image"></div>
      <div class="mv-image"></div>
      <div class="logo">八仙过海在线教育平台</div>
      <div class="names">{{ course.course_name }}</div>
      <div class="begin">开始学习</div>
      <div class="course">课程介绍
        <div class="coursewrite">{{ course.course_desc }}
          <div class="teacher">
            <div class="teacher-name">授课教师：<div class="name">{{ course.teacher_name }}</div></div>
            <div class="telephone">联系电话：<div class="ph">{{ course.teacher_telephone }}</div></div>
          </div>
        </div>
      </div>
      <div class="triangle"></div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        course: {}
      }
    },
    mounted() {
      this.fetchCourse();
    },
    methods: {
      fetchCourse() {
        const courseId = this.$route.params.id; // 从路由参数中获取课程ID
        axios.post('/api/course/main', { course_id: courseId })
          .then(response => {
            console.log(response)
            this.course = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
  </script>


<style scoped>
.names{
  width: 100%;
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
}
.body {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', sans-serif;
}
.course{
    display: flex;
    position: absolute;
    justify-content: space-between;
    top: 80px;
    left: 1100px;
    font-size:  24px;

}
.coursewrite{
    display: flex;
    position: absolute;
    top: 50px;
    left: 0px;
    font-size:  20px;
    justify-content: space-between;
    background-color: #999;
    align-items: top;
    width: 300%;
    height: 240px;
    padding: 13px;
  
}
.teacher{
    display: inline-block;
    position: absolute;
    top: 300px;
    left: 0px;
    font-size:  20px;
    justify-content: space-between;
    background-color: #FFFFFF;
    width: 100%;
    height: 60px;
}
.teachername{
    display: flex;
}
.name{
    display: inline-block;
}
.telephone{
    display: flex;
}
.ph{
    display: inline-block;
}

.begin{
    display: flex;
    position: absolute;
    top: 570px;
    left: 480px;
    justify-content:center;
    background-color: #00ffff;
    align-items: center;
    width: 7%;
    height: 25px;
    padding: 13px;
    color: #111;
    font-size:20px;
    margin-top: 70px;
    z-index: 2;
   
}
.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
 

}

.bg-image {
    position: absolute; /* 绝对定位 */
    top: 0; /* 顶部对齐 */
    left: 0; /* 左侧对齐 */
    width: 100%; /* 宽度铺满 */
    height: 100%; /* 高度铺满 */
    background-image: url(../views/bk.jpg); /* 背景图路径 */
    background-size: cover; /* 按比例缩放背景图 */
    background-position: center; /* 背景图居中 */
    z-index: -1; /* 确保内容在背景图上方显示 */
}
.mv-image {
    position: absolute; /* 绝对定位 */
    top:120px; /* 顶部对齐 */
    left: 80px; /* 左侧对齐 */
    width: 60%; /* 宽度铺满 */
    height: 70%; /* 高度铺满 */
    background-image: url(../views/1.jpg); /* 背景图路径 */
    background-size: cover; /* 按比例缩放背景图 */
    background-position: left; /* 背景图居中 */
    z-index: -1; /* 确保内容在背景图上方显示 */
}

.logo {
    font-size: 25px;
    flex-shrink: 0;
    font-weight: bold;
    padding-top: 0;
    padding-left: 0;
    color: black;
    z-index: 2;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 16px;
    padding-top: 0;
    color: white;
    z-index: 2;
}

.nav {
    /*width: 450px; !* 设置容器宽度 *!*/
    margin: 0 auto; /* 设置左右 margin 为 auto */
    z-index: 2;
    color: rgba(171, 221, 122, 0.91);

}

.nav a {
    font-size: 20px;
    font-weight: bolder;
    /*width: 40px;*/
    color: black;
    font-family: STKaiti, serif;
    text-decoration: none;
    margin-right: 60px;
    /*margin-left: 20px;*/
    z-index: 2;
}
.mine{
    border-bottom: 3px solid rgb(248, 29, 29);
    /* border-bottom-width: 0.2em; 用于控制边框宽度 */
    /* 用于控制下边距 */
    padding-bottom: 0.2em;
    margin-left: 20px;
}
h3 {
    margin-top: 0;
    font-size: 30px;
    color: black;
    font-weight: bold;
    font-family: "华文行楷", cursive;
}
.triangle {
    position: absolute; 
    width: 0;
    height: 0%;
    top: 320px; /* 顶部对齐 */
    left: 500px;
    border-top: 50px solid transparent;
    border-left: 100px solid white;
    border-bottom: 50px solid transparent;
}
</style>