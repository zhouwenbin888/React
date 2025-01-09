<template>
  <div class="example-pagination-block">
    <el-button class="button1" type="primary" @click="open1">添加课程</el-button>

    <el-table :data="coursedata" style="width: 100%">
      <el-table-column fixed prop="course_name" label="课程名称" width="200"></el-table-column>
      <el-table-column prop="course_desc" label="课程类型" width="200"></el-table-column>
      <el-table-column prop="teacher_name" label="授课老师" width="200"></el-table-column>
      <el-table-column prop="course_time" label="课时" width="200"></el-table-column>
      <el-table-column prop="course_choosed" label="已选人数" width="600"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="delStu(row.course_id)">删除</el-button>
          <el-button link type="primary" size="small" @click="showEditDialog(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="page" :page-size="size"
      :page-sizes="pageSizes" layout="prev, pager, next" :total="total"></el-pagination>

    <el-dialog v-model="dialogVisible" title="编辑课程" width="30%">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="课程名称" prop="course_name">
          <el-input v-model="form.course_name"></el-input>
        </el-form-item>
        <el-form-item label="课程类型" prop="course_desc">
          <el-input v-model="form.course_desc"></el-input>
        </el-form-item>
        <el-form-item label="授课老师" prop="teacher_name">
          <el-input v-model="form.teacher_name"></el-input>
        </el-form-item>
        <el-form-item label="课时" prop="course_time">
          <el-input v-model="form.course_time"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog v-model="dialogVisible1" title="课程" width="30%">
      <el-form :model="form1" ref="form1" :rules="rules" label-width="100px">
        <el-form-item label="班级id" prop="class_id">
          <el-input v-model="form1.class_id"></el-input>
        </el-form-item>
        <el-form-item label="班级名称" prop="course_name">
          <el-input v-model="form1.course_name"></el-input>
        </el-form-item>
        <el-form-item label="课程类型" prop="course_desc">
          <el-input v-model="form1.course_desc"></el-input>
        </el-form-item>
        <el-form-item label="课时" prop="course_time">
          <el-input v-model="form1.course_time"></el-input>
        </el-form-item>
        <el-form-item label="一节课时长" prop="course_cap">
          <el-input v-model="form1.course_cap"></el-input>
        </el-form-item>
        <el-form-item label="教师id" prop="teacher_id">
          <el-input v-model="form1.teacher_id"></el-input>
        </el-form-item>
        <el-form-item label="课程id" prop="course_id">
          <el-input v-model="form1.course_id"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      id: '',

      coursedata: [],
      page: 1,
      size: 10,
      pageSizes: [10, 20, 30],
      total: 0,
      dialogVisible: false,
      dialogVisible1: false,
      form: {
        course_id: '',
        course_name: '',
        course_desc: '',
        teacher_name: '',
        course_time: ''
      },
      form1: {
        class_id: '',
        course_name: '',
        course_desc: '',
        teacher_name: '',
        teacher_id: '',
        course_time: '',
        course_id:''
      },
      rules: {
        course_name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        course_desc: [
          { required: true, message: '请输入课程类型', trigger: 'blur' }
        ],
        teacher_name: [
          { required: true, message: '请输入授课老师', trigger: 'blur' }
        ],
        course_time: [
          { required: true, message: '请输入课时', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.getCourseData();
  },
  methods: {
    async getCourseData() {
      try {
        await axios.get('/api/admin/getteacher').then(response => {
          const teacher_account = this.$route.params.id;
          const data = response.data;


          data.forEach(objArray => {
            const { teacherPhone: objAccount, teacherID } = objArray;
            if (objAccount === teacher_account) {
              this.id = teacherID;
              console.log(this.id)
            }
          });

          // 对id进行进一步操作
          console.log(this.id);
        });

        const response = await axios.get(`/api/teacher/getcourse/${this.id}`);
        console.log(response)
        this.coursedata = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    delStu(course_id) {
      axios
        .delete(`/api/teacher/delecourse/${course_id}`)
        .then(() => {
          this.getCourseData();
        })
        .catch(error => {
          console.error(error);
        });
    },
    showEditDialog(row) {
      this.form = { ...row };
      console.log(this.form)
      this.dialogVisible = true;
    },
    saveEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios
            .put(`/api/teacher/recourse/`, this.form)
            .then(() => {
              this.dialogVisible = false;
              this.getCourseData();
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          return false;
        }
      });
    },
    open1() {
      this.dialogVisible1 = true;
      this.dialogVisible = false;
    },
    saveAdd() {
      this.$refs.form1.validate(valid => {
        console.log(this.form1)
        if (valid) {
          axios
            .post(`/api/teacher/addcourse`, this.form1)
            .then(() => {
              this.dialogVisible1 = false;
              this.getCourseData();
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          return false;
        }
      });
    },
    sizeChange(size) {
      this.size = size;
      this.getCourseData();
    },
    currentChange(page) {
      this.page = page;
      this.getCourseData();
    }
  }
};
</script>