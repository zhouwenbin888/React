import { createRouter, createWebHistory } from 'vue-router'
import Denglu from '../components/denglu.vue'
import Remeber1 from '../components/remeber1.vue'
import Remeber2 from '../components/remeber2.vue'
import Adminhome from '../components/adminhome.vue'
import Studentregist from '../components/studentregist.vue'
import Teacheregist from '../components/teacheregist.vue'
import Studenthome from '../components/studenthome.vue'
import Teacherhome from '../components/Teacherhome.vue'
import Studentmine from '../components/studentmine.vue'
import Coursejump from '../components/coursejump.vue'
import Classjump from '../components/classjump.vue'
import StudentList from '../components/StudentList.vue'
import CourseList from '../components/courseList.vue'
import ClassList from '../components/ClassList.vue'
import TeacherList from '../components/TeacherList.vue'
import TCourseList from '../components/tcourseList.vue'
import TClassList from '../components/tClassList.vue'
import HomeList from '../components/homelist.vue'
import ThomeList from '../components/thomelist.vue'
const routes = [
    {
        path: '/',
        component: Denglu
    },
    {
        path: '/denglu',
        component: Denglu
    },
    {
        path: '/remeber1',
        component: Remeber1
    },
    {
        path: '/remeber2',
        component: Remeber2
    },
    {
        path: '/studentregist',
        component: Studentregist
    },
    {
        path: '/teacheregist',
        component: Teacheregist
    },
    {
        path: '/studenthome/:id',
        component: Studenthome
    },
    {
        path: '/studentmine',
        component: Studentmine
    },
    {
        path: '/coursejump/:id',
        component: Coursejump
    },
    {
        path: '/classjump/:id',
        component: Classjump
    },
    {
        path: '/adminhome',
        component: Adminhome,
        children: [
            {
                path: '',
                component: HomeList
            },
            {
                path: 'course',
                component: CourseList
            },
            {
                path: 'class',
                component: ClassList
            },
            {
                path: 'teacher',
                component: TeacherList
            },
            {
                path: 'student',
                component: StudentList
            }
        ]
    },
    {
        path: '/teacherhome/:id',
        component: Teacherhome,
        props:true,
        children: [
            {
                path: '',
                component: ThomeList
            },
            {
                path: 'course/:id',
                component: TCourseList,
                props: true // 将路由参数传递给子组件
            },
            {
                path: 'class/:id',
                component: TClassList,
                props: true // 将路由参数传递给子组件
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router