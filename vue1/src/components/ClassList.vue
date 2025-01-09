<template>
  <div class="example-pagination-block">
<!--    <el-button class="button1" type="primary" @click="open1">添加班级</el-button>-->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="className" label="班级名称" width="200" />
      <el-table-column prop="classDesc" label="课程描述" width="200" />
      <el-table-column prop="classFlag" label="课程目的" width="200" />
      <el-table-column prop="teacherName" label="班主任" width="200" />
      <el-table-column prop="numOfStudents" label="已选人数" width="600" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="delStu(row.classId)">删除</el-button>
          <el-button class="button2" link type="success" size="small" @click="showEditDialog(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="page" :page-size="size"
      :page-sizes="pageSizes" layout="prev, pager, next" :total="total">
    </el-pagination>
  </div>


  <!--编辑资料弹出框表单-->
  <el-dialog v-model="dialogVisible" title="编辑课程资料" width="25%">
    <el-form :model="formData" status-icon label-width="100px">
      <el-form-item label="班级名称" prop="className">
        <el-input v-model.number="formData.className" />
      </el-form-item>
      <el-form-item label="课程描述" prop="classDesc">
        <el-input v-model.number="formData.classDesc" />
      </el-form-item>
      <el-form-item label="课程目标" prop="classFlag">
        <el-input v-model.number="formData.classFlag" />
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
import { reactive } from "vue";
export default {
  data() {
    return {
      //get后台数据存放
      classdata: reactive([]),
      dialogVisible: false, // 弹出框是否可见
      dialogVisible1: false,
      row: {

        classname: '',
       class_desc:'',
        bzr: '',
        num: ''
      },
      //弹出框数据
      formData: {
        className: '',
        classDesc:'',
        classFlag:'',
        teacherName: '',
        classId:''
      },
      //  分页
      page: 1, //第几页
      size: 10, //一页多少条
      total: 1000, //总条目数
      pageSizes: [3, 5, 10, 20, 50, 100, 200, 300, 400, 500, 1000], //可选择的一页多少条
      tableData: [], //表格绑定的数据
    };
  },

  mounted() {
    const token = localStorage.getItem('token');
    const config = {
    headers: {
      Authorization: `Bearer ${token}`
      }
    };
    axios.get('/api/admin/getclass', config)
          .then(response => {
            // 将从后端获取的数据放入classdata数组中
            this.classdata = response.data;
            console.log('成功获取数据', this.classdata);
            this.getTabelData2();
          })
          .catch(error => {
            console.error('获取数据失败', error);
          });
},

  methods: {
    //删除班级数据
    delStu(classId) {
      console.log("courseId:", classId);
      axios.delete(`/api/admin/deleclass/${classId}`)
              .then(response => {
                const index = this.classdata.findIndex(
                        (classdata) =>
                                classdata.classId === classId
                );
                if (index !== -1) {
                  this.classdata.splice(index, 1);
                }
                // 刷新页面
                location.reload();
                // alert(response.data.msg);
              })
              .catch(error => {
                // 处理删除失败的逻辑
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
      console.log("row:", row);
      this.formData = { ...row };
      console.log("form得到数据",this.formData);
      this.dialogVisible = true;
    },

    //编辑数据的提交
    handleSubmit() {
      const classlist = {
        class_name: this.formData.className,
        class_desc: this.formData.classDesc,
        class_flag: this.formData.classFlag,
        class_id: this.formData.classId,
      };
      // 从本地获取token
      const token = localStorage.getItem('token');
      // 将表单数据通过JSON.stringify()方法打包成JSON文件
      const class1 = JSON.stringify(classlist);
      console.log("classlist的数据",classlist)
      // 发送formData到后台接口
      fetch('/api/admin/reclass', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ` ${token}`
        },
        body: class1
      }).then(response => {
        // 处理后台响应结果
        console.log("resspon的shuju",response)
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
      let data = JSON.parse(JSON.stringify(this.classdata));
      this.tableData = data.splice((this.page - 1) * this.size, this.size);
      this.total = this.classdata.length;

      console.log('原始数据:', this.classdata);
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
.example-pagination-block+.example-pagination-block {
  margin-top: 10px;
  color: #4dba24;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

.button1 {
  width: 5%;
  float: right;
}
</style>
