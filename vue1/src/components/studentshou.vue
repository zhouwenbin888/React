<template>
    <div style="display: flex;flex-direction: row;align-items: center;">
        <div style="display: inline-block;">
            <div style="font-size: 24px;margin: 20px;display: inline-block;">系统公告</div>
            <div style="margin: 20px;">
                <img :src="currentImage" alt="Image" />
            </div>
        </div>
        <div class="sidebar-top">
            <laber class="lab">推荐课程</laber>
            <div class="z-container">
                <div class="z" v-for="(item, index) in rea2.slice(0, 3)" :key="item.course_id"
                @click="redirectToCourse(item.course_id)">
                    <div class="tu"></div>
                    <div class="hang1">
                        <div class="ke">{{ item.course_name }}</div>
                        <div class="lao">{{ item.teacher_name }}</div>
                    </div>
                    <div class="time">{{ item.course_time }}课时</div>
                    <div class="xuan">已选人数{{ item.course_choosed }}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="sidebar-top">
        <laber class="lab">我学习的课程</laber>
        <div class="z-container">
            <div class="z" v-for="(item, index) in rea.slice(0, 6)" :key="item.course_id"
            @click="redirectToCourse(item.course_id)">
                <div class="tu"></div>
                <div class="hang1">
                    <div class="ke">{{ item.course_name }}</div>
                    <div class="lao">{{ item.teacher_name }}</div>
                </div>
                <div class="time">{{ item.course_time }}课时</div>
                <div class="xuan">已选人数{{ item.course_choosed }}</div>
            </div>
        </div>
    </div>
</template>
  
<script>
import image1 from '../views/1.jpg';
import image2 from '../views/bk.jpg';
import image3 from '../views/background.jpg';
import axios from 'axios';
export default {
    data() {
        return {
            images: [
                image1,
                image2,
                image3
            ],
            currentIndex: 0,
            rea: [],
            rea2: [],
            stu_account: '17386150582',
        };

    },
    created() {
        this.mounted01()
        this.mounted02()
    },
    computed: {
        currentImage() {
            return this.images[this.currentIndex];
        }
    },
    mounted() {
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        }, 2000);
    },
    methods: {
        //我学习的课程
        mounted01() {
            const token = localStorage.getItem('token');
            if (token) {
                axios.get('/api/course/joined', {
                    headers: {
                        Authorization: ` ${token}`
                    },
                    params: {
                        stu_account: this.stu_account
                    }
                })
                    .then(response => {
                        console.log(response.data);
                        this.rea = response.data.data;
                    }).catch(error => {
                        console.error('A problem occurred while fetching data:', error);
                    });
            }
        },
        redirectToCourse(courseId) {
    this.$router.push(`/coursejump/${courseId}`);
    },
        mounted02() {
            axios.get('/api/course/tuijian')
                .then(response => {
                    console.log(response.data);
                    this.rea2 = response.data;
                }).catch(error => {
                    console.error('A problem occurred while fetching data:', error);
                });
        },
    }
};
</script>
<style scoped>
img {
    width: 600px;
    height: 250px;
}

.sidebar-top {
    min-width: 100%;
    min-height: 45%;
    margin-right: 16px;
    margin-left: 20px;
    /*background-color: white;*/
}

.lab {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*background-color: #008CBA;*/
    width: 200px;
    font-size: 30px;
    text-align: left;
    color: black;
    font-weight: bold;
}

.z-container {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.z {
    position: relative;
    width: 200px;
    height: 200px;
    background-color: white;
    box-shadow: 4px 4px 20px rgb(97, 96, 96);
    transition: transform 0.3s ease;
    border-radius: 8px;
    margin-right: 55px;
    /* 添加过渡效果 */
}

.z:hover {
    transform: translate(-5px, -5px);
}

.tu {
    width: 200px;
    height: 100px;
    background-image: url(../views/1.jpg);
    background-size: contain;
    border-radius: 8px;
}

.hang1 {
    display: flex;
    flex-direction: row;
}

.ke {
    margin: 5px;
    font-size: 15px;
    font-weight: bolder;
}

.time {
    margin: 5px;
}

.lao {
    flex: 1;
    margin: 5px;
    text-align: right;
    font-size: 15px;
    font-weight: bolder;
}

.xuan {
    position: absolute;
    bottom: 0;
}
</style>