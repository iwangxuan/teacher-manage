<!--
 * @Date: 2023-02-08 15:45:47
 * @LastEditTime: 2023-03-04 16:42:20
-->
<template>
  <div className="card-container">
    <h1>欢迎登录xxx系统</h1>
    <el-card>
      <el-row>
          <span>账 号：</span>
          <el-input 
            v-model="phone" 
            placeholder="请输入账号" 
          />
      </el-row>
      <el-row>
        <span>密 码：</span>
        <el-input 
          v-model="password"
          placeholder="请输入密码" 
          show-password
        />
      </el-row>
      <el-row 
        className="bottom-button"
      >
        <el-button 
          type="primary"
          @click="loginHandler"
        >
          登录
        </el-button>
        <el-button>
          取消
        </el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue'

export default  ({
  setup() {
    const role = ref('')
    const phone = ref('')
    const password = ref('')
    return {
      role,
      password,
      phone
    }
  },
  methods: {
    loginHandler() {
      this.$axios.post("/user/login", {
        phone: this.phone,
        password: this.password
      }).then(res => {
        if (res.data.data === -1) {
          return
        }
        this.role = res.data.data
        sessionStorage.setItem("Token", res.headers.token) 
        sessionStorage.setItem("role",this.role)
        this.$router.push("/")
      })
    }
  }
})
</script>


<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bottom-button{
  padding-top: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.el-row {
  margin-bottom: 20px;
  justify-content: space-between;
}
.el-row:last-child {
  margin-bottom: 0;
}

.el-input {
  flex: 1;
}

span{
  width: 50px;
  text-align: right;
}

.logon-message {
  font-size: 12px;
  color: gray;
  display: flex;
  justify-content: flex-end;
}
.el-link {
  font-size: 12px;
}
</style>