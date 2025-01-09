<template>
    <div>
        <div class="content-left">
            <div class="sidebar-top">
                <laber class="lab">我学习的课程</laber>
                <div class="z-container">
                    <div class="z" v-for="(item, index) in rea.slice(0, 4)" :key="item.course_id"
                        @click="redirectToCourse(item.course_id)">
                        <div class="tu"></div>
                        <div class="hang1">
                            <div class="ke">{{ item.course_name }}</div>
                            <div class="lao">{{ item.teacher_name }}</div>
                        </div>
                        <div class="time">{{ item.course_time }}课时</div>
                        <div class="xuan">已选人数{{ item.course_choosed }}</div>
                        <div @click.stop><button class="de" @click="deleteCourse(item.course_id)">删除</button></div>
                    </div>
                </div>
            </div>
            <div class="sidebar">
                <laber class="lab">我加入的班级</laber>
                <div class="conter_mineclass">
                    <div class="z" v-for="(minecls, index) in joinedClasses.slice(0, 4)" :key="stu_id"
                        @click="redirectToClass(minecls.class_id)">
                        <div class="tu"></div>
                        <div>
                            <div class="ke_t">{{ minecls.class_name }}</div>
                            <div class="ke_t">{{ minecls.class_desc }}</div>
                            <div class="lao_t">{{ minecls.teacher_name }}</div>
                        </div>
                        <div @click.stop><button class="de" @click="deleteClass(minecls.class_id)">删除</button></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="content-right">
            <div class="form-group">
                <label>姓名：</label>
                <div class="input1">{{ stu.stuName }}</div>
            </div>
            <div class="form-group">
                <label>年龄：</label>
                <div class="input1">{{ stu.stuAge }}</div>
            </div>
            <div class="form-group">
                <label>性别：</label>
                <div class="input1">{{ stu.stuSex }}</div>
            </div>
            <div class="form-group">
                <label>手机号：</label>
                <div class="input1">{{ stu.stuTelephone }}</div>
            </div>
            <div class="form-group">
                <label>密码：</label>
                <div class="input1">{{ stu.stuPassword }}</div>
            </div>
            <el-row class="mb-4 ">
                <el-button class="button-c" text @click="fillFormData" type="button.type" color="#ccc" size="large">
                    <h1>编辑资料</h1>
                </el-button>
            </el-row>

        </div>
        <!--弹出框的表单-->
        <el-dialog v-model="dialogVisible" title="请修改具体信息" width="30%">
            <el-form :model="formData" status-icon label-width="120px">
                <el-form-item label="姓名" prop="stuName">
                    <el-input v-model.number="formData.stuName" />
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="formData.stuAge" />
                </el-form-item>
                <el-form-item label="性别" prop="gen">
                    <el-select v-model="formData.stuSex" placeholder="性别选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model.number="formData.stuTelephone" />
                </el-form-item>
                <el-form-item label="密码" prop="pas">
                    <el-input v-model.number="formData.stuPassword" type="password" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="handleSubmit()" round>提交</el-button>
                    <el-button @click="dialogVisible = false" type="danger" round>关闭</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            //个人信息
            studentData: [],
            stu: {
                stuName: '',
                stuAge: '',
                stuSex: '',
                stuTelephone: '',
                stuPassword: '',
            },
            isMounted: false,
            searchTerm: '',
            filteredUserData: [],
            userData: {
                stuName: '',
                stuAge: '',
                stuSex: '',
                stuTelephone: '',
                stuPassword: '',
            },

            //提交表单
            dialogVisible: false,
            formData: {
                stuName: '',
                stuAge: '',
                stuSex: '',
                stuTelephone: '',
                stuPassword: '',
            },
            recommend: {},
            mineclass: {
                class: '大数据',
                course: 'java',
                teacher: '孙斌',
            },
            name: '',
            age: '',
            gender: '',
            phone: '',
            password: '',
            options: [{
                value: '男',
                label: '男'
            }, {
                value: '女',
                label: '女'
            }],

            //我的课程数据
            rea: [],
            stu_account: this.$route.params.id,
            //我的班级数据
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
        this.mounted03()
    },

    methods: {
        deleteCourse(courseId) {
            // 获取localstorage里的token
            const token = localStorage.getItem('token');

            console.log(courseId);

            // 向后端发送请求
            axios.delete("/api/student/deleteCourse", {
                params: {
                    course_id: courseId
                },
                headers: {
                    Authorization: `${token}`
                }
            })
                .then(response => {
                    // 处理返回的数据
                    console.log(response.data);
                    alert(response.data.msg);
                    // 进行其他操作
                    location.reload()
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        },
        deleteClass(classId) {
            // 获取localstorage里的token
            const token = localStorage.getItem('token');

            console.log(classId);

            // 向后端发送请求
            axios.delete("/api/student/deleteClass", {
                params: {
                    class_id: classId
                },
                headers: {
                    Authorization: `${token}`
                }
            })
                .then(response => {
                    // 处理返回的数据
                    console.log(response.data);
                    alert(response.data.msg);
                    // 进行其他操作
                    location.reload()
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        },
        redirectToClass(classId) {
            this.$router.push(`/classjump/${classId}`);
        },
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
        //在course里面的内容做修改，为组件插到这。
        //我的班级
        mounted02() {
            // 从localStorage获取token
            const token = localStorage.getItem('token');
            console.log(token)
            // 发送具有授权标头和查询字符串参数的请求
            axios.get('/api/class/joined', {
                headers: { 'Authorization': ` ${token}` },
                params: { stu_account: this.stu_account }
            })
                .then(response => {
                    this.joinedClasses = response.data.data;
                    console.log('成功获取我的班级数据:', this.joinedClasses);
                })
                .catch(error => {
                    console.error('获取我的班级数据失败:', error);
                });
        },
        //点击编辑资料按钮
        fillFormData() {
            // 从localStorage获取token
            const token = localStorage.getItem('token');
            console.log(token)
            // 发送具有授权标头和查询字符串参数的请求
            axios.get(`/api/student/center/getOne/${this.stu_account}`, {
                headers: { 'Authorization': ` ${token}` }
            })
                .then(response => {
                    this.studentData = response.data.data;
                    console.log('成功获取个人信息:', response.data);
                })
                .catch(error => {
                    console.error('获取个人信息失败:', error);
                });
            // 将默认学生信息添加到表单中
            this.formData.stuName = this.studentData.stu_name;
            this.formData.stuAge = this.studentData.stu_age;
            this.formData.stuSex = this.studentData.stu_sex;
            this.formData.stuTelephone = this.studentData.stu_telephone;
            this.formData.stuPassword = this.studentData.stu_password;

            // 显示对话框
            this.dialogVisible = true;
        },
        //编辑数据的提交
        handleSubmit() {
            const student = {
                stu_name: this.formData.stuName,
                stu_age: this.formData.stuAge,
                stu_sex: this.formData.stuSex,
                stu_password: this.formData.stuPassword,
                stu_telephone: this.formData.stuTelephone,
                stu_account: this.stu_account
            };
            const token = localStorage.getItem('token'); // 从本地获取token
            // 将表单数据通过JSON.stringify()方法打包成JSON文件
            const stuCenter = JSON.stringify(student);
            // 发送formData到后台接口
            fetch('/api/student/center/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: stuCenter
            }).then(response => {
                // 处理后台响应结果
                console.log(response)
                if (response.ok) {
                    console.log('提交成功')
                } else {
                    console.log('提交失败')
                }
            }).catch(error => {
                // 处理请求出错情况
                console.error('请求出错', error);
            });
            //关闭弹出框
            this.dialogVisible = false
            location.reload()
        },

        // 显示我的数据
        mounted03() {
            // 只执行一次
            if (!this.isMounted) {
                this.isMounted = true;
                // 从localStorage获取token
                const token = localStorage.getItem('token');
                console.log(token)
                console.log("stu_account==>", this.stu_account)
                // 发送具有授权标头和查询字符串参数的请求
                axios.get(`/api/student/center/getOne/${this.stu_account}`, {
                    headers: { 'Authorization': ` ${token}` }
                })
                    .then(response => {
                        this.studentData = response.data.data;
                        console.log('成功获取个人信息:', response.data);
                        this.stu.stuName = this.studentData.stu_name;
                        this.stu.stuAge = this.studentData.stu_age;
                        this.stu.stuSex = this.studentData.stu_sex;
                        this.stu.stuTelephone = this.studentData.stu_telephone;
                        this.stu.stuPassword = this.studentData.stu_password;
                    })
                    .catch(error => {
                        console.error('获取个人信息失败:', error);
                    });

            }

        },
        redirectToCourse(courseId) {
            this.$router.push(`/coursejump/${courseId}`);
        }
    },
    computed: {
        filteredUserData() {
            if (!this.searchTerm) {
                // 如果搜索条件为空，则返回所有数据
                return this.userData;
            } else {
                // 使用 Array.prototype.filter() 方法过滤出符合条件的数据
                return this.userData.filter((item) =>
                    item.stuName.toLowerCase().includes(this.searchTerm.toLowerCase())
                );
            }
        },
        filteredClasses() {
            // 按照class_id从小到大排序，并截取前三个元素
            return this.rea.sort((a, b) => a.course_id - b.course_id).slice(0, 3)
        }
    }
}
</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', sans-serif;
    color: black;
    font-weight: bold;
}

.mb-4 {
    margin-top: 70px;
    border: 3px solid #008CBA;
    width: 140px;
}

.nav a {
    margin: 0 auto;
    font-size: 25px;
    font-weight: bolder;
    color: black;
    font-family: STKaiti, serif;
    text-decoration: none;
    margin-right: 60px;
    z-index: 2;
}

.content-left {
    float: left;
    width: 60%;
    height: 80%;
    flex-grow: 1;
    padding: 14px;
    z-index: 2;
}

.sidebar-top {
    min-width: 100%;
    min-height: 45%;
    margin-right: 16px;
    padding-top: 50px;
    /*background-color: white;*/
}

.sidebar {
    margin-top: 20px;
    min-width: 100%;
    min-height: auto;
    margin-right: 16px;
    /*background-color: white;*/
}

.lab {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*background-color: #008CBA;*/
    width: 200px;
    margin-top: 0;
    font-size: 30px;
    text-align: left;
    color: black;
    font-weight: bold;
}

.conter_mineclass {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: flex-start;
}

.content-right {
    margin-top: 50px;
    float: right;
    width: 30%;
    height: 400px;
    margin-right: 30px;
    background-color: rgba(255, 255, 255, 0);
    padding: 20px;
    border-radius: 10px;
    color: black;
    z-index: 2;
}

.button-c {
    padding: 10px 20px;
    text-align: left;
}

h1 {
    font-size: 25px;
    font-weight: bold;
    margin-top: 10px;
    margin-left: 0px;
}


label {
    display: inline-block;
    width: 100px;
    padding-left: 20px;
    font-size: 25px;
    font-weight: bold;
    margin-right: 10px;
    margin-top: 10px;
}

input {
    margin-bottom: 8px;
    padding-left: 20px;
    font-size: 14px;
    border: none;
    box-shadow: none;
    width: 95%;
    height: 55px;
    border-radius: 8px;
    box-sizing: border-box;
    opacity: 0.9;
}

.input1 {
    background-color: white;
    border-radius: 15px;
    width: 95%;
    float: right;
    height: 45px;
    text-align: center;
    font-size: 30px;
    opacity: 0.8;
}

button[type="submit"] {
    background-color: #008CBA;
    border: none;
    color: #fff;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: #004455;
}

.z-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    position: relative;
}

.de {
    border-radius: 3px;
    border: none;
    background-color: #11b3e9;
    bottom: 10px;
    right: 10px;
    position: absolute;
}

.z {
    position: relative;
    width: 200px;
    height: 200px;
    background-color: white;
    box-shadow: 4px 4px 20px rgb(97, 96, 96);
    transition: transform 0.3s ease;
    border-radius: 8px;
    margin-right: 50px;
    /* 添加过渡效果 */
}

.z:hover {
    transform: translate(-5px, -5px);
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

.tu {
    width: 200px;
    height: 100px;
    background-image: url(../views/1.jpg);
    background-size: contain;
    border-radius: 8px;
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

.xuan {
    position: absolute;
    bottom: 0;
}
</style>


























