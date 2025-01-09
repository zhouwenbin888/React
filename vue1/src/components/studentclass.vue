<template>
    <div>
        <div class="main">

            <div class="box1">
                <div class="sidebar-top">
                    <laber class="truncate">我的班级</laber>

                    <div class="conter_mineclass">
                        <div class="z" v-for="(minecls, index) in joinedClasses.slice(0, 4)" :key="stu_id"
                            @click="redirectToClass(minecls.class_id)">
                            <div class="tu"></div>
                            <div>
                                <div class="ke_t">{{ minecls.class_name }}</div>
                                <div class="ke_t">{{ minecls.class_desc }}</div>
                                <div class="lao_t">{{ minecls.teacher_name }}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="sidebar">
                    <laber class="truncate">推荐班级</laber>
                    <div class="conter_tuijian">
                        <div class="z" v-for="(cls, index) in classes_t.slice(0, 4)" :key="cls.id"
                            @click="redirectToClass(cls.class_id)">
                            <div class="tu"></div>
                            <div>
                                <div class="ke_t">{{ cls.class_name }}</div>
                                <div class="ke_t">{{ cls.class_desc }}</div>
                                <div class="lao_t">{{ cls.teacher_name }}</div>
                            </div>
                            <div @click.stop>
                                <div class="add-button" @click="addclass(cls.class_id)">+</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="box4">
                <div class="truncate2">
                    <laber>班级排行榜</laber>
                </div>
                <div class="contain">
                    <div v-for="(classes, index) in classList" :key="index">
                        <h1 v-if="classes.class_id == 1">{{ "NO1:" + classes.class_name }}</h1>
                        <h2 v-if="classes.class_id == 2">{{ "NO2:" + classes.class_name }}</h2>
                        <h3 v-if="classes.class_id == 3">{{ "NO3:" + classes.class_name }}</h3>
                        <h4 v-if="classes.class_id >= 4 && classes.class_id < 10">{{ "NO" + (index + 1) + ":" +
                            classes.class_name
                        }}</h4>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.add-button {
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 20px;
    height: 20px;
    background-color: white;
    color: green;
    text-align: center;
    line-height: 20px;
    font-size: 18px;
    cursor: pointer;
}

body {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', sans-serif;
    color: black;
    font-weight: bold;
}

.conter_mineclass {
    width: 100%;
    height: 40%;
    display: flex;

}

.nav a {
    margin: 0 auto;
    font-size: 25px;
    font-weight: bolder;
    /*width: 40px;*/
    color: black;
    font-family: STKaiti, serif;
    text-decoration: none;
    margin-right: 60px;
    z-index: 2;
}

.main {
    display: flex;
    height: 100%;
}

.box1 {
    flex-basis: 60%;
    height: 100%;
    /* 对子元素的高度进行设置 */
    padding-top: 30px;
    margin-left: 0px;
    /*background-color: #979797;*/
    flex-grow: 1;
}

.sidebar-top {
    min-width: 100%;
    min-height: 40%;
    /*margin-right: 16px;*/
    margin-top: 10px;
    padding-top: 20px;
    padding-left: 10px;
    /*background-color: white;*/
}

.sidebar {
    min-width: 100%;
    min-height: auto;
    margin-left: 10px;
    margin-top: 40px;
    /*background-color: white;*/
}

.box4 {
    flex-basis: 30%;
    height: 100%;
    padding: 10px;
    /*text-align: center;*/
    margin-top: 50px;
    margin-right: 50px;
}

.contain {
    border: 5px solid #20f2f9;
    height: 500px;
    background-color: white;
    opacity: 0.8;
    font-size: 20px;
    font-family: "Microsoft YaHei", sans-serif;
    color: black;
    font-weight: bolder;
}


.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 0;
    font-size: 30px;
    color: black;
    font-weight: bold;

}

.truncate2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    font-size: 40px;
    color: black;
    font-weight: bold;


}

.conter_tuijian {
    width: 95%;
    height: 40%;
    display: flex;
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

.ke_t {
    margin: 5px;
    margin-top: 10px;
    text-align: center;
    font-size: 15px;
    font-weight: bolder;

}

.lao_t {
    flex: 1;
    margin: 5px;
    text-align: center;
    margin-top: 10px;
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
    border-radius: 8px;
}
</style>

<script>
import axios from 'axios';

export default {
    name: 'studentclass',
    data() {
        return {
            classes_t: [],
            cls: {
                class_id: 0,
                class_name: '',
                teacher_id: '',
                teacher_name: '',
                class_flag: '',
                students: '',
                class_desc: ''
            },
            classList: [],
            classes: {
                class_id: 0,
                class_name: '',
                class_flag: '',
                class_desc: ''
            },
            recommend: {},
            stu_id: null,
            joinedClasses: [],
            minecls: {
                class_name: '',
                class_desc: '',
                teacher_name: '',
            },
        }
    },
    created() {
        this.mounted01()
        this.mounted02()
    },
    methods: {
        addclass(classid) {
            const token = localStorage.getItem('token');
            console.log(classid);
            axios.post('/api/student/addclass', null, {
                params: {
                    class_id: classid
                },
                headers: {
                    Authorization: `${token}`
                }
            })
                .then(response => {
                    alert(response.data.msg)
                    location.reload()
                })
                .catch(error => {
                    console.error('失败:', error);
                });

        },
        redirectToClass(classId) {
            this.$router.push(`/classjump/${classId}`);
        },
        //向后端请求排行榜数据。
        mounted01() {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('未找到token.');
            } else {
                axios.get('/api/class/tuijian', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then((data) => {
                        this.classList = data.data.data;
                        console.log('成功获取排行榜数据:', this.classList);
                    })
                    .catch(error => {
                        console.error('获取排行榜数据失败:', error);
                    });
            }
        },
        //获取推荐班级数据
        mounted02() {
            // 从本地存储获取token
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('未找到token.');
            } else {
                axios.get('/api/class/tuijian', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(response => {
                        this.classes_t = response.data.data;
                        console.log('成功获取推荐班级数据:', response.data.data);
                    })
                    .catch(error => {
                        console.error('获取推荐班级数据失败:', error);
                    });
            }
        }
    },
    computed: {
        filteredClasses() {
            // 按照class_id从小到大排序，并截取前三个元素
            return this.classes_t.sort((a, b) => a.class_id - b.class_id).slice(0, 3)
        }
    },

    //我的班级
    mounted() {
        // 从localStorage获取token
        const token = localStorage.getItem('token');
        console.log(token)
        // 发送具有授权标头和查询字符串参数的请求
        axios.get('/api/class/joined', {
            headers: { 'Authorization': ` ${token}` },

        })
            .then(response => {
                this.joinedClasses = response.data.data;
                console.log('成功获取我的班级数据:', response.data);
            })
            .catch(error => {
                console.error('获取我的班级数据失败:', error);
            });
    },
}
</script>