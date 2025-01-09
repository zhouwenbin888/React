<template >
  <div style="display: flex;align-items:center;flex-wrap: wrap;">
    <div v-for="(course, index) in courses" :key="course.course_id" class="z" @click="redirectToCourse(course.course_id)" style="margin-top:80px;">
      <div class="tu"></div>
      <div class="hang1">
        <div class="ke">{{ course.course_name }}</div>
        <div class="lao">{{ course.teacher_name }}</div>
      </div>
      <div class="time">{{ course.course_time }}课时</div>
      <div class="xuan">已选人数{{ course.course_choosed }}</div>
      <div @click.stop><div class="add-button" @click="addCourse(course.course_id)">+</div></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'studentcourse',
  data() {
    return {
      stu_account: this.$route.params.id,
      studentId:'',
      courses: []
    }
  },
  mounted() {
    this.fetchCourses();
  },
  methods: {
    fetchCourses() {
      axios.get('/api/course')
        .then(response => {
          this.courses = response.data.data;
          console.log(this.courses)
        })
        .catch(error => {
          console.log(error);
        });
    },
    addCourse(courseId) {
      const token = localStorage.getItem('token');
      axios.get(`/api/student/center/getOne/${this.stu_account}`, {
                    headers: { 'Authorization': ` ${token}` }
                })
                    .then(response => {
                      console.log(response)
                       this.studentId=response.data.data.stu_id
                       console.log(this.studentId)
                    })
                    .catch(error => {
                  
                    });
      // Replace with the actual student id
      axios.post('/api/course/myadd', {course_id:courseId,stu_id:this.studentId})
        .then(response => {
          console.log(response)
          alert(response.data.msg);
          location.reload()
          // 这里可以根据后端返回的数据进行相关操作
        })
        .catch(error => {
          console.log(error);
        });
    },
    redirectToCourse(courseId) {
    this.$router.push(`/coursejump/${courseId}`);
  }
  }
}
</script>

<style scoped>
.z {
  position: relative;
  width: 200px;
  height: 200px;
  background-color: white;
  box-shadow: 4px 4px 20px rgb(97, 96, 96);
  transition: transform 0.3s ease;
  border-radius: 4px;
  /* 添加过渡效果 */
  display: inline-block; /* 将课程信息模块变为内联块元素，使其在同一行内显示 */
  margin-right: 40px; /* 设置课程信息模块之间的右侧间距 */
  margin-left: 40px;
  margin-bottom: 20px; /* 设置课程信息模块之间的下方间距 */
}

.hang1 {
  display: flex;
  flex-direction: row;
}

.ke{
  margin: 5px;
  font-size: 15px;
  font-weight: bolder;
}

.time{
  margin: 5px;
}

.lao{
  flex: 1;
  margin: 5px;
  text-align: right;
  font-size: 15px;
  font-weight: bolder;
}

.z:hover {
  transform: translate(-5px, -5px);
}

.tu {
  width: 200px;
  height: 100px;
  background-image: url(../views/1.jpg);
  background-size: contain;
  border-radius: 4px 4px 0px 0px;
}

.xuan {
  position: absolute;
  bottom: 0;
}

.add-button {
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 30px;
  height: 30px;
  background-color: white;
  color: green;
  text-align: center;
  line-height: 20px;
  font-size: 18px;
  cursor: pointer;
}
</style>
