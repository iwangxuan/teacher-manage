<!--
 * @Date: 2023-02-14 14:50:48
 * @LastEditTime: 2023-03-04 00:03:10
-->
<template>
  <div>
    <el-card>      
      <span>用户名：{{ this.name }}</span>
      <span>身份：{{ this.getRole }}</span>
      <span>账号：{{ this.phone }}</span>
      <router-link 
        :to="{ path: 'password', query: { userId: this.userId}}"
      >修改密码</router-link>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const userId = ref('')
    const phone = ref('')
    const role = ref('')
    const name = ref('')
    const password = ref('')
    const classList = ref([])
    return {
      userId,
      phone,
      role,
      name,
      classList
    }
  },
  computed: {
    getRole() {
      switch (this.role) {
        case 0: return "管理员"
        case 1: return "辅导员"
        case 2: return "班主任"
        default: return ""
      }
    }
  },
  created() {
    this.$axios({
      method: 'get',
      url: '/user/inform/get'
    }).then(({ data }) => {
      this.userId = data.data.userId
      this.phone = data.data.phone
      this.role = data.data.role
      this.name = data.data.name
      this.password = data.data.password
      this.classList = data.data.classList
    })
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  span {
    display: block;
    padding-bottom: 12px;
  }
  .el-button {
    padding: 0;
    font-size: 16px;
  }
}
</style>
