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
                <span >教师后台</span>
              </template>
              <el-menu-item :index="$router.resolve(`/teacherhome/:id/course/${id}`).href">课程管理</el-menu-item>
<el-menu-item :index="$router.resolve(`/teacherhome/:id/class/${id}`).href">班级管理</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main style="padding-right: 0px;">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// 获取父组件传递的路由参数 id
const id = route.params.id;

onMounted(() => {
  console.log("onMounted 执行");
});
</script>

<style scoped>
/* 样式内容 */

.header>div{
  width: 198px;
  height: 99%;
  border-bottom:1px solid #fff;
  border-right:1px solid #fff;
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