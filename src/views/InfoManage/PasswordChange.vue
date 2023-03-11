<!--
 * @Date: 2023-03-03 22:57:40
 * @LastEditTime: 2023-03-04 16:37:36
-->
<template>
  <div>
    <el-card>
      <el-breadcrumb>
        <el-breadcrumb-item 
          to="/info"
        >个人信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="password-inputs">
        <el-input
          show-password 
          v-model="oldPassword"
          type="password"
          placeholder="请输入旧密码" 
        />
        <el-input
          show-password
          v-model="password" 
          type="password"
          placeholder="请输入新密码" 
        />
        <el-input
          show-password 
          v-model="passwordConfirm"
          type="password"
          placeholder="请确认新密码" 
        />
        <el-button
          @click="passwordChange"
        >确认</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue'

export default ({
  setup() {
    const oldPassword = ref('')
    const password = ref('')
    const passwordConfirm = ref('')
    const userId = ref('')
    return {
      oldPassword,
      password,
      passwordConfirm,
      userId
    }
  },
  created() {
    this.userId = this.$route.query.userId
  },
  methods: {
    passwordChange() {
      if (this.password !== this.passwordConfirm) {
        console.log("两次密码不一致！")
        return 
      }
      this.$axios({
        method: 'post',
        url: "/user/update_password",
        data: {
          userId: Number(this.userId),
          oldPassword: this.oldPassword,
          password: this.password
        }
      }).then(res => console.log(res))
    }
  }
})
</script>

<style lang="scss" scoped>
.password-inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-input {
    padding: 8px;
    width: 260px;
  }
  .el-button {
    width: 80px;
  }
}

</style>