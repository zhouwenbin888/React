<template>
  <div class="bk">
    <div class="bq">
      八仙过海教育平台
    </div>
    <div class="top">
      <div class="lei" @click="showComponent('Studentshou')">
        <div>首页</div>
        <div class="tiao" v-if="show === 'Studentshou'"></div>
      </div>
      <div class="lei" @click="showComponent('Studentcourse')">
        <div>课程学习</div>
        <div class="tiao" v-if="show === 'Studentcourse'"></div>
      </div>
      <div class="lei" @click="showComponent('Studentclass')">
        <div>班级交流</div>
        <div class="tiao" v-if="show === 'Studentclass'"></div>
      </div>
      <div class="lei" @click="showComponent('Studentmine')">
        <div>我的</div>
        <div class="tiao" v-if="show === 'Studentmine'"></div>
      </div>
    </div>
    <component :is="currentComponent" style="margin: 20px;"></component>
  </div>
</template>

<script>
import Studentcourse from '../components/studentcourse.vue'
import Studentmine from './studentmine.vue';
import Studentclass from './studentclass.vue';
import Studentshou from './studentshou.vue';
export default {
  name: 'Home',
  components: {
    Studentcourse,
    Studentmine,
    Studentclass,
    Studentshou,
  },
  data() {
    return {
      currentComponent: 'Studentshou',
      show:'Studentshou'
    }
  },
  methods: {
    showComponent(component) {
      this.currentComponent = component;
      this.show=component
    }
  }
}
</script>
  
<style scoped>
.bk {
  width: 100vw;
  height: 100vh;
  background-image: url(../views/bk.jpg);
  background-size: cover;
  position: absolute;
}

.top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
}


.lei {
  margin-right: 40px;
  margin-left: 80px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.bq {
  font-size: 20px;
  margin: 10px;
  margin-top: 5px;
  display: inline-block;
}

.tiao {
  margin-top: 5px;
  height: 1.5px;
  width: 100px;
  background-color: red;
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
}
</style>