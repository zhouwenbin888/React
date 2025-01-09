
<template>
  <div class="example-pagination-block">
<!--    <el-button class="button1"  type="primary" @click="open1">添加课程</el-button>-->
    <el-table :data="coursedata" style="width: 100%">
      <el-table-column fixed prop="course_name" label="课程名称" width="200" />
      <el-table-column prop="course_desc" label="课程类型" width="200" />
      <el-table-column prop="teacher_name" label="授课老师" width="200" />
      <el-table-column prop="course_time" label="课时" width="200" />
      <el-table-column prop="course_cap" label="每节课时间" width="200" />
      <el-table-column prop="course_choosed" label="已选人数" width="600" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{row}">
          <el-button link type="primary" size="small" @click="delStu(row.course_id)">删除</el-button>
          <el-button class="button2" link type="success" size="small" @click="showEditDialog(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="sizeChange" @current-change="currentChange"
                   :current-page="page" :page-size="size" :page-sizes="pageSizes"
                   layout="prev, pager, next" :total="total">
    </el-pagination>

  </div>

  <!--编辑资料弹出框表单-->
  <el-dialog v-model="dialogVisible"
             title="编辑课程资料"
             width="25%">
    <el-form
            :model="formData"
            status-icon
            label-width="100px"
    >
      <el-form-item label="课程名称" prop="course_name">
        <el-input  v-model.number="formData.course_name"/>
      </el-form-item>
      <el-form-item label="课程描述" prop="course_desc">
        <el-input v-model.number="formData.course_desc"/>
      </el-form-item>
      <el-form-item label="课时" prop="course_time">
        <el-input v-model.number="formData.course_time" />
      </el-form-item>
      <el-form-item label="每节课时间" prop="course_cap">
        <el-input v-model.number="formData.course_cap" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit()" round>提交</el-button>
        <el-button @click="dialogVisible = false" type="danger" round>关闭</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>



<script  >
  import axios from "axios";
  import {reactive} from "vue";

  export default {
    data() {
      return {
        //get后台数据存放
        coursedata: reactive([]),
        //添加的新数据
        newData: {
          course_name: '1',
          course_desc: '2',
          teacher_name: '3',
          course_time: '4',
          course_choosed:'5',
          class_id: ''
        },
        row:{
          course_id:"",
          course_name: '',
          course_desc: '',
          teacher_name: '',
          course_time: '',
          course_choosed:'',
        },
        dialogVisible: false, // 弹出框是否可见
        dialogVisible1: false,
        classInfo: { // 弹出框表单数据绑定
          course_name: '1',
          course_desc: '2',
          teacher_name: '3',
          course_time: '4',
          course_choosed:'5',
          class_id: ''
        },
        //弹出框数据
        formData: {
          course_name: '',
          course_desc: '',
          teacher_name: '',
          course_time: '',
          course_choosed:'',
          course_cap:'',
          course_id: ''
        },
        //  分页
        page: 1, //第几页
        size: 10, //一页多少条
        total: 1000, //总条目数
        pageSizes: [3, 5, 10, 20, 50, 100, 200, 300, 400, 500, 1000], //可选择的一页多少条
        tableData: [], //表格绑定的数据
      };
    },
    created() {
      this.getCourseData();
    },
    methods: {
      //删除课程数据
      delStu(courseId) {
        console.log("courseId:", courseId);
        axios.delete(`/api/admin/delecourse/${courseId}`)
                .then(response => {
                  const index = this.coursedata.findIndex(
                          (coursedata) =>
                                  coursedata.course_id === courseId
                  );
                  if (index !== -1) {
                    this.coursedata.splice(index, 1);
                  }
                  // 刷新页面
                  location.reload();
                })
                .catch(error => {
                  // 处理删除失败的逻辑
                });
      },

      //得到后台班级数据
      getCourseData() {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        axios.get('/api/admin/getcourse', config)
                .then(response => {
                  // 将从后端获取的数据放入coursedata)数组中
                  this.coursedata = response.data;
                  console.log('成功获取数据', this.coursedata);
                  this.getTabelData2();
                })
                .catch(error => {
                  console.error('获取数据失败', error);
                });
      },

      // 编辑按钮点击事件
      open() {
        this.dialogVisible = true;
      },
      beforeDialogClose(done) {
        done(false); // prevent closing dialog directly when clicking outside or pressing ESC
      },

      // 点击编辑按钮
      showEditDialog(row) {
        this.formData = { ...row };
        console.log("form得到数据",this.formData);
        this.dialogVisible = true;
      },

      //编辑数据的提交
      handleSubmit() {
        const courselist = {
          course_name: this.formData.course_name,
          course_desc: this.formData.course_desc,
          course_time: this.formData.course_time,
          course_id: this.formData.course_id,
          choose_enable: this.formData.choose_enable,
          class_id: this.formData.class_id,
          course_cap: this.formData.course_cap,
          course_choosed: this.formData.course_choosed,
          teacher_id: this.formData.teacher_id,
          teacher_name: this.formData.teacher_name,
        };
        console.log('提交的数据',courselist)
        // 从本地获取token
        const token = localStorage.getItem('token');
        // 将表单数据通过JSON.stringify()方法打包成JSON文件
        const course = JSON.stringify(courselist);
        console.log("course:", course)
        // 发送formData到后台接口
        fetch('/api/admin/recourse', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: course
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
        location.reload();
      },


      //分页
      //获取表格数据，自行分页（splice）
      getTabelData2() {
        let data = JSON.parse(JSON.stringify(this.coursedata));
        this.tableData = data.splice((this.page - 1) * this.size, this.size);
        this.total = this.coursedata.length;

        console.log('原始数据:', this.coursedata);
        console.log('分页后的数据:', this.tableData);
        console.log('总数据量:', this.total);
      },

      //page改变时的回调函数，参数为当前页码
      currentChange(val) {
        console.log("翻页，当前为第几页", val);
        this.page = val;
        this.getTabelData2();
      },
      //size改变时回调的函数，参数为当前的size
      sizeChange(val) {
        console.log("改变每页多少条，当前一页多少条数据", val);
        this.size = val;
        this.page = 1;
        this.getTabelData2();
      },
    },

  };
</script>

<style scoped>
  .example-pagination-block + .example-pagination-block {
    margin-top: 10px;
    color: #4dba24;
  }
  .example-pagination-block .example-demonstration {
    margin-bottom: 16px;
  }
  .button1{
    width: 5%;
    float: right;
  }
</style>




