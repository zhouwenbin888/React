<template>
  <div>
    <el-header class="header">
      <div>八仙过海教育平台</div>
    </el-header>
    <el-container>
      <el-container>
        <el-aside width="200px" class="aside">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="!handleOpen" background-color="#333"
            text-color="#fff" @close="handleClose" router>
            <el-sub-menu>
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>后台管理员</span>
              </template>
              <el-menu-item index="/adminhome/course">课程管理</el-menu-item>
              <el-menu-item index="/adminhome/class">班级管理</el-menu-item>
              <el-menu-item index="/adminhome/teacher">老师管理</el-menu-item>
              <el-menu-item index="/adminhome/student">学生管理</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log("onMounted 执行")
})
</script>

<style scoped>
.header>div {
  width: 199px;
  height: 98%;
  border-bottom: 1px solid #fff;
  border-right: 1px solid #fff;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header {
  background-color: #333;
  color: #fff;
  height: 40px;
  padding: 0;
  margin: 0;
}

.aside {
  background-color: #333;
  color: #fff;
  height: calc(100vh);
}

.el-menu-header {
  background-color: #333;
  color: #fff;
  border-bottom: 0px;
}

.flex-grow {
  flex-grow: 1;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>