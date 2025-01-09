<template>
    <div class="container">
        <div class="bg-image"></div>
        <div class="logo">八仙过海在线教育平台</div>
        <div class="class1">
            <div v-for="(classInfo, index) in classInfos" :key="classInfo.id">
                <div class="classname">{{ classInfo.class_name }}
                </div>
                <div class="coursename">{{ classInfo.class_desc }}
                    <div class="teachername">{{ classInfo.teacher_name }}
                    </div>
                </div>
                <div class="flag">班级宣言栏<div class="write">{{ classInfo.class_flag }}</div>
                </div>
            </div>
        </div>
        <div class="class_student">班级成员</div>
        <div class="information">
            <div class="name">姓名</div>
            <div class="age">年龄</div>
            <div class="sex">性别</div>
            <div class="if" style="display: inline-block;flex-direction: column;">
                <div v-for="(student, index) in students" :key="student.stu_id">
                    <div style="display: flex;flex-direction: row;">
                        <div style="width: 265px;">{{ student.stu_name }}</div>
                        <div style="width: 265px;">{{ student.stu_age }}</div>
                        <div>{{ student.stu_sex }}</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            classInfos: {},
            students: [],
            class_id: "3"
        }
    },
    mounted() {
        const class_id = this.$route.params.id;
        axios.post('/api/class/main', { class_id: class_id }).then(response => {
            console.log(response)
            this.classInfos = response.data.data;
            this.students = response.data.data[0].students;
            console.log(this.students)
        }).catch(error => {
            console.error('A problem occurred while fetching data:', error);
        });
    }
}


</script>

<style scoped>
.class1 {
    display: flex;

}

.classname {
    display: flex;
    position: absolute;
    top: 50px;
    left: 570px;
    font-size: 45px;
}

.coursename {
    display: flex;
    position: absolute;
    top: 100px;
    left: 570px;
    font-size: 25px;
}

.teachername {
    display: flex;
    position: relative;
    top: 0px;
    left: 150px;
    font-size: 25px;
}

.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 100%;
    /* 设置最小宽度，确保容器元素与内容区域大小相符 */
    min-height: 300px;

}

.bg-image {
    position: absolute;
    /* 绝对定位 */
    top: 0;
    /* 顶部对齐 */
    left: 0;
    /* 左侧对齐 */
    width: 100%;
    /* 宽度铺满 */
    height: 100%;
    /* 高度铺满 */
    background-image: url(../views/bk.jpg);
    /* 背景图路径 */
    background-size: cover;
    /* 按比例缩放背景图 */
    background-position: center;
    /* 背景图居中 */
    z-index: -1;
    /* 确保内容在背景图上方显示 */
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




.flag {
    display: flex;
    position: absolute;
    font-size: 25px;
    top: 200px;
    left: 20px;
    justify-content: space-between;
    background-color: greenyellow;
}

.write {
    display: flex;
    position: absolute;
    font-size: 25px;
    top: 50px;
    left: 0px;
    justify-content: center;
    background-color: white;
    align-items: center;
    width: 260%;
    height: 135x;
    padding: 130px;
}

.class_student {
    display: flex;
    position: absolute;
    top: 200px;
    left: 1050px;
    font-size: 20px;
    justify-content: center;
    background-color: yellow;
    width: 7%;
    height: 30px;

}

.information {
    display: flex;
    position: absolute;
    top: 250px;
    left: 800px;
    font-size: 20px;
    justify-content: space-between;
    background-color: #DDDDDD;
    width: 36%;
    height: 30px;
    padding: 0px 25px 0px;
}

.if {
    display: flex;
    position: absolute;
    top: 30px;
    left: 0px;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.75);
    width: 91.8%;
    height: 240px;
    padding: 0px 25px 0px;

}
</style>