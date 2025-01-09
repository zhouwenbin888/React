<template>
  <div class="example-pagination-block">
    <el-button type="primary" @click="open1">添加班级</el-button>

    <el-table :data="coursedata" style="width: 100%">
      <el-table-column fixed prop="className" label="班级名称" width="200"></el-table-column>
      <el-table-column prop="classFlag" label="班级口号" width="200"></el-table-column>
      <el-table-column prop="teacherName" label="班主任" width="200"></el-table-column>
      <el-table-column prop="numOfStudents" label="已选人数" width="600"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="delStu(row.classId)">删除</el-button>
          <el-button link type="primary" size="small" @click="showEditDialog(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="page" :page-size="size"
      :page-sizes="pageSizes" layout="prev, pager, next" :total="total"></el-pagination>

    <el-dialog v-model="dialogVisible" title="课程" width="30%">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="班级名称" prop="className">
          <el-input v-model="form.className"></el-input>
        </el-form-item>
        <el-form-item label="班级口号" prop="classFlag">
          <el-input v-model="form.classFlag"></el-input>
        </el-form-item>
        <el-form-item label="班主任" prop="teacherNamee">
          <el-input v-model="form.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="已选人数" prop="numOfStudents">
          <el-input v-model="form.numOfStudents"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog v-model="dialogVisible1" title="课程" width="30%">
      <el-form :model="form1" ref="form1" :rules="rules" label-width="100px">
        <el-form-item label="班级名称" prop="className">
          <el-input v-model="form1.className"></el-input>
        </el-form-item>
        <el-form-item label="班主任" prop="teacherName">
          <el-input v-model="form1.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="班级口号" prop="classFlag">
          <el-input v-model="form1.classFlag"></el-input>
        </el-form-item>
        <el-form-item label="班级ID" prop="classId">
          <el-input v-model="form1.classId"></el-input>
        </el-form-item>
        <el-form-item label="教师id" prop="teacherId">
          <el-input v-model="form1.teacherId"></el-input>
        </el-form-item>
        <el-form-item label="课程描述" prop="classDesc">
          <el-input v-model="form1.classDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addEdit">确 定</el-button>
      </span>
    </el-dialog>

</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      id: '',
      cid: '',
      coursedata: [],
      page: 1,
      size: 10,
      pageSizes: [10, 20, 30],
      total: 0,
      dialogVisible: false,
      dialogVisible1: false,
      form: {
        className: '',
        classFlag: '',
        teacherName: '',
        numOfStudents: ''
      },
      form1: {
        className: '',
        teacherName: '',
        classFlag:'',
        classId:'',
        teacherId:'',
        classDesc:''
      },
      rules: {
        course_name: [
          { required: true, message: '请输入班级名称', trigger: 'blur' }
        ],
        course_desc: [
          { required: true, message: '请输入课程', trigger: 'blur' }
        ],
        teacher_name: [
          { required: true, message: '请输入班主任', trigger: 'blur' }
        ],
        course_time: [
          { required: true, message: '请输入渲染数', trigger: 'blur' }
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

        const response = await axios.get(`/api/teacher/getclass/${this.id}`);
        console.log(response)
        this.coursedata = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    delStu(classId) {
      axios
        .delete(`/api/teacher/deleclass/${classId}`)
        .then(() => {
          this.getCourseData();
        })
        .catch(error => {
          console.error(error);
        });
    },
    showEditDialog(row) {
      this.form = { ...row };
      console.log("得到的数据",this.form)
      this.dialogVisible = true;
      this.dialogVisible1 = false;
    },
    saveEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form1)
          axios
            .put(`/api/teacher/reclass`, this.form)
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
    addEdit() {
      this.$refs.form1.validate(valid => {
        console.log(this.form1)
        if (valid) {
          axios
            .post(`/api/teacher/addclass`, this.form1)
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