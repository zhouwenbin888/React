
<template>
  <div class="example-pagination-block">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="stuName" label="姓名" width="200" />
        <el-table-column prop="stuPhone" label="手机号" width="200" />
        <el-table-column prop="stuPassword" label="密码" width="200" />
        <el-table-column prop="numOfSelectedCourses" label="已选课程数" width="200" />
        <el-table-column prop="numOfJoinedClasses" label="已加入班级数" width="600" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="{row}">
            <el-button link type="primary" size="small" @click="delStu(row.stuid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    <el-pagination @size-change="sizeChange" @current-change="currentChange"
                   :current-page="page" :page-size="size" :page-sizes="pageSizes"
                   layout="prev, pager, next" :total="total">
    </el-pagination>
  </div>
</template>


<script >
  import axios from "axios";
  import {reactive} from "vue";

  export default {
    data() {
      return {
        //get后台数据存放
        studata: reactive([]),
        row:{
          stuid:'',
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
      this.getStuData();
    },
    methods: {
      //得到后台班级数据
      getStuData() {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        axios.get('/api/admin/getstudent', config)
                .then(response => {
                  // 将从后端获取的数据放入coursedata)数组中
                  this.studata = response.data;
                  console.log('成功获取数据', this.studata);
                  this.getTabelData2();
                })
                .catch(error => {
                  console.error('获取数据失败', error);
                });
      },



      //删除学生数据
      delStu(studentId) {
        console.log("studentId:", studentId);
        axios.delete(`/api/admin/deletestudent/${studentId}`)
                .then(response => {
                  const index = this.studata.findIndex(
                          (studata) =>
                                  studata.stuid === studentId
                  );
                  if (index !== -1) {
                    this.studata.splice(index, 1);
                  }
                  location.reload();
                  // alert(response.data.msg);
                  // 刷新页面

                })
                .catch(error => {
                  // 处理删除失败的逻辑
                });
      },


      //分页
      //获取表格数据，自行分页（splice）
      getTabelData2() {
        let data = JSON.parse(JSON.stringify(this.studata));
        this.tableData = data.splice((this.page - 1) * this.size, this.size);
        this.total = this.studata.length;

        console.log('原始数据:', this.studata);
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
</style>