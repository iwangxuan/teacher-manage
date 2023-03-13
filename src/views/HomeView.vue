<!--
 * @Date: 2023-01-31 16:11:18
 * @LastEditTime: 2023-03-12 19:40:36
-->
<template>
  <el-container class="layout">
    <el-header>
      <h1>学工管理系统</h1>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
        >
          <router-link to="/info">
            <el-menu-item index="1">
              个人信息管理
            </el-menu-item>
          </router-link>
          <router-link to="/account">
            <el-menu-item index="2">
              账号管理
            </el-menu-item>
          </router-link>
          <router-link to="/classes" >
            <el-menu-item index="3">
                班级信息管理
            </el-menu-item>
          </router-link>
          <el-sub-menu index="4">
            <template #title>
              <span>学生信息管理</span>
            </template>
          <el-menu-item-group>
            <router-link to="/students/basic">
              <el-menu-item index="4-1">
                 基本学生信息
              </el-menu-item>
            </router-link>
            <router-link to="/students/destitute">
              <el-menu-item index="4-2">困难生信息</el-menu-item>
            </router-link>
            <router-link to="/students/prizewinner">
              <el-menu-item index="4-3">学生获奖情况</el-menu-item>
            </router-link>
            <router-link to="/students/infraction">
              <el-menu-item index="4-4">学生违规乱纪情况</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-sub-menu>
        <router-link to="/info">
          <el-menu-item index="5">助学金评定记录</el-menu-item>
        </router-link>
        <router-link to="/info">
          <el-menu-item index="6">奖学金评定记录</el-menu-item>
        </router-link>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
    </el-container>
  </el-container>
</template>
<script>
import {ref} from 'vue'
export default {
  setup() {
    const infos = ref('')
    return {
      infos
    }
  }
} 
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  .el-header {
    z-index: 6;
    h1 {
      text-align: center;
    }    
  }
  .el-aside{
    background-color: #545c64;
  }
  .el-main{
    background-color: rgb(226, 226, 223);
  }
}

</style>