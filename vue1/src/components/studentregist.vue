<template>
    <div class="container">
        <div class="background"></div>
        <div class="login-wrapper">
            <div class="header">学生注册</div>
            <div class="form-wrapper">
                <div class="input-container">
                    <input v-model="username" type="text" name="username" placeholder="账户" class="input-item"
                        @blur="checkUsername" @focus="clearUsernameError">
                    <span class="error-message" v-if="showUsernameError">请输入账号</span>
                </div>
                <div class="input-container">
                    <input v-model="password" type="password" name="password" placeholder="密码" class="input-item"
                        @blur="checkPassword" @focus="clearPasswordError">
                    <span class="error-message" v-if="showPasswordError">请输入密码</span>
                </div>
                <div class="input-container">
                    <input v-model="confirmPassword" type="password" name="confirmPassword" placeholder="确认密码"
                        class="input-item" @blur="checkConfirmPassword" @focus="clearConfirmPasswordError">
                    <span class="error-message" v-if="showConfirmPasswordError">密码不一致</span>
                </div>
                <div class="btn" @click="register">注册</div>
            </div>
        </div>
    </div>
</template>
    
<script>
import axios from 'axios';

export default {
    name: "Reg",
    data() {
        return {
            username: '',
            password: '',
            confirmPassword: '',
            role: '学生',
            showUsernameError: false,
            showPasswordError: false,
            showConfirmPasswordError: false
        }
    },
    methods: {
        checkUsername() {
            if (this.username === '') {
                this.showUsernameError = true;
            } else {
                this.showUsernameError = false;
            }
        },
        checkPassword() {
            if (this.password === '') {
                this.showPasswordError = true;
            } else {
                this.showPasswordError = false;
            }
        },
        checkConfirmPassword() {
            if (this.confirmPassword !== this.password) {
                this.showConfirmPasswordError = true;
            } else {
                this.showConfirmPasswordError = false;
            }
        },
        clearUsernameError() {
            this.showUsernameError = false;
        },
        clearPasswordError() {
            this.showPasswordError = false;
        },
        clearConfirmPasswordError() {
            this.showConfirmPasswordError = false;
        },
        register() {
            // 创建 FormData 对象
            const formData = new FormData();
            // 将表单数据添加到 FormData 对象中
            formData.append('stu_account', this.username);
            formData.append('stu_password', this.password);
            formData.append('confirmPassword', this.confirmPassword);

            // 输出要发送的 FormData 对象到控制台
            console.log(formData);

            // 发送 POST 请求，并将 FormData 对象作为请求体
            axios.post('/api/student/register', formData)
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    // 在此可以根据后端响应进行相应的处理，例如显示成功消息或错误消息
                    // 如果注册成功，进行页面跳转
                    if (response.data.msg === '注册成功') {
                        this.$router.push('/denglu');
                        alert(response.data.msg)
                    }
                    else{
                        alert(response.data.msg)
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // 在此可以显示错误消息给用户
                });
        }
    }
}
</script>
 
<style scoped>
html {
    height: 100%;
}

body {
    height: 100%;
}

.container {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.error-message {
    color: red;
    position: absolute;
    top: 100%;
    left: 0;
}

.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(../views/background.jpg);
    background-size: cover;
}

.login-wrapper {
    /*background-color: #fff;*/
    background-color: rgba(255, 255, 255, 0.7);
    /* 虚化效果的背景颜色 */
    width: 320px;
    height: 420px;
    padding: 20px;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.header {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    line-height: 150px;
}

.input-container {
    position: relative;
    margin-bottom: 20px;
}

.input-item {
    display: block;
    width: 95%;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid rgb(128, 125, 125);
    font-size: 15px;
    outline: none;
}

.input-item:placeholder {
    text-transform: uppercase;
}

.btn {
    text-align: center;
    padding: 10px;
    width: 95%;
    margin-top: 40px;
    background-image: linear-gradient(to right, red, red);
    color: #fff;
    margin: 0 auto;
    border-radius: 20px;
}

.msg {
    text-align: center;
    line-height: 88px;
}

a {
    text-decoration-line: none;
    color: #abc1ee;
}
</style>