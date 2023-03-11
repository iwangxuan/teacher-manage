<!--
 * @Date: 2023-02-10 19:51:23
 * @LastEditTime: 2023-03-06 12:23:10
-->
<template>
  <div>
    <div
      v-show="role==1" 
      class="register-header"
    >
      <el-input
        v-model="className"
        placeholder="班级名称"
      />
      <el-input
        v-model="department"
        placeholder="学院"
      />
      <el-input
        v-model="profession"
        placeholder="专业"
      />
      <el-input-number 
        v-model="grade"
        placeholder="年级"
      />
      <el-button 
        type="success"
        @click="registerClass"
      >添加班级</el-button>
    </div>
    <el-table
      :data="classes"
    >
      <el-table-column
        sortable
        label="班级ID" 
        prop="classId"
        align="center"
      />
      <el-table-column 
        label="班级名称"
        prop="className"
        align="center"
      />
      <el-table-column 
        label="学院"  
        align="center"
        prop="department"
      />
      <el-table-column 
        label="专业"  
        align="center"
        prop="profession"
      />
      <el-table-column 
        label="辅导员"  
        align="center"
        prop="userName"
      />
      <el-table-column label="操作">
        <template #default="classes">
          <el-button
            link 
            type="primary"
            :key="classes.row.classId"
            @click="toClassPage(classes.row.classId)"
          >详情</el-button>
          <el-button
            link
            type="danger"
            :key="classes.row.classId"
            @click="deleteClass(classes.row.classId)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const className = ref('')
    const department = ref('')
    const profession = ref('')
    const grade = ref(2019)
    const classes = ref([])
    const role = ref(0)
    
    return {
      className,
      department,
      profession,
      grade,
      classes,
      role
    }
  },
  mounted() {
    this.getClassList()
    this.role = sessionStorage.getItem('role')
  },
  methods: {
    registerClass() {
      this.$axios({
        method: 'post',
        url: '/class/register',
        data: {
          className: this.className,
          department: this.department,
          profession: this.profession,
          grade: this.grade,
          dormitory: '123'
        }
      }).then(() => this.getClassList())
    },
    deleteClass(classId) {
      this.$axios({                                                                   
        method: 'post',
        url: '/class/delete',
        data: {
          classId
        }
      }).then(() => this.getClassList())
    },
    toClassPage(classId) {
      console.log(classId)
      this.$router.push(`/classes/${classId}`)
    },
    getClassList() {
      this.$axios({
        method: 'get',
        url: '/class/list',
        params: {
          page: 1,
          pageLimit: 100,
        }
      }).then(({ data }) => this.classes = data.data.classes)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/universal.scss'
</style>