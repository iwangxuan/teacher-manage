<!--
 * @Date: 2023-02-10 19:04:58
 * @LastEditTime: 2023-02-23 21:31:54
-->
<template>
  <div>
    <div class="register-header">
      <el-input
        v-model="name"
        placeholder="姓名"
      />
      <el-input
        v-model="password"
        placeholder="密码"
      />
      <el-input
        v-model="phone"
        placeholder="电话号码"
      />
      <el-select 
        v-model="role"
        placeholder="请选择角色"
      >
        <el-option 
          v-for="role in roles"
          :key="role.value"
          :label="role.label"
          :value="role.value"
        />
      </el-select>
      <el-button 
        type="success"
        @click="logonAccount"
      >添加账号</el-button>
    </div>
    <el-table
      stripe
      max-height="250"
      :data="users"
    >
      <el-table-column 
        sortable        
        align="center"
        prop="userId"
        label="用户ID"
      />      
      <el-table-column        
        align="center" 
        prop="name" 
        label="姓名"
      />
      <el-table-column        
        align="center" 
        prop="phone" 
        label="电话号码"
      />
      <el-table-column        
        align="center" 
        label="角色"
        prop="role"
        :formatter="getRole"
      />
      <el-table-column label="操作">
        <template #default="users">
          <el-button
            type="danger"
            @click="deleteUser(users.row.userId)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { ref } from "vue"
export default {
  setup() {
    const name = ref('')
    const phone = ref('')
    const password = ref('')
    const role = ref('')
    const roles = [
      {
        label: "辅导员",
        value: 1
      },
      {
        label: "班主任",
        value: 2
      }
    ]
    const users = ref([])
    return {
      name,
      phone,
      password,
      role,
      roles,
      users
    }
  },
  created() {
    this.getUserlist()
  },
  methods: {
    logonAccount() {
      this.$axios.post('/user/register', {
        name: this.name,
        phone: this.phone,
        password: this.password,
        role: this.role
      }).then(res => {
        this.getUserlist()
      })
    },
    getUserlist() {
      this.$axios({
        method: 'get',
        url: 'user/list',
        params: {
          page: 1,
          pageLimit: 10
        }
      }).then(({ data }) => {
        this.users = data.data.users
      })
    },
    deleteUser(userId) {
      console.log(userId)
      this.$axios({
        method: 'post',
        url: '/user/delete',
        data: {
          userId
        }
      }).then(res => this.getUserlist())
    },
    getRole(row, column, cellValue, index) {
      switch (cellValue) {
        case 0: return "管理员"
        case 1: return "辅导员"
        default: return "班主任"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/universal.scss'
</style>