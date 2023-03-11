<!--
 * @Date: 2023-02-24 18:16:27
 * @LastEditTime: 2023-03-11 22:02:02
-->
<template>
  <div>
    <el-card>
      <span>班级名称：{{ this.classInfo.className}}</span>
      <span>所属学院：{{ this.classInfo.department }}</span>
      <span>年级：{{ this.classInfo.grade }}</span>
      <span>专业：{{ this.classInfo.profession }}</span>
      <span>辅导员：{{ this.classInfo.userName }}</span>
    </el-card>
    <el-tabs
      v-model="curTab" 
      type="border-card"
    >
      <el-tab-pane
        label="查寝记录"
      >
        <class-dormitory
          :getIcon="getIcon"
          :curTab="curTab"
        />
      </el-tab-pane>
      <el-tab-pane
        label="班会记录"
      >
        <class-meeting 
          :getIcon="getIcon"
          :curTab="curTab"
        />
      </el-tab-pane>
      <el-tab-pane 
        label="听课记录"
      >
        <class-listening 
          :getIcon="getIcon"
          :curTab="curTab"
        />
      </el-tab-pane>
      <el-tab-pane
        label="谈话记录"
      >
        <class-interview
          :getIcon="getIcon"
          :curTab="curTab"
        />
      </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import { ref } from 'vue'
import ClassDormitory from './ClassDormitory.vue'
import ClassMeeting from './ClassMeeting.vue'
import ClassListening from './ClassListening.vue'
import ClassInterview from './ClassInterview.vue'
export default {
  components: { ClassDormitory,ClassMeeting, ClassListening, ClassInterview },
  setup() {
    const classInfo = ref({})
    const curTab = ref('0')
    return {
      classInfo,
      curTab
    }
  },
  created() {
    this.getClass()
  },
  methods: {
    getClass() {
      this.$axios({
        method: 'get',
        url: 'class/get',
        params: {
          classId: this.$route.params.classId
        }
      }).then(res => this.classInfo = res.data.data)
    },
    getIcon(file) {
      const filetype = file.substring(file.lastIndexOf(".")+1)
      switch (filetype) {
        case 'pdf':
          return 'http://localhost:3000/src/assets/pdf.png'
        case 'doc':
          return 'http://localhost:3000/src/assets/doc.png'
        case 'docx':
          return 'http://localhost:3000/src/assets/docx.png'
        case 'excel':
          return 'http://localhost:3000/src/assets/docx.png'
        default:
          return 'http://localhost:3000/src/assets/other.png'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 12px;
  .el-card__body {
    display: flex;
    justify-content: space-between;
    span {
      display: inline-flex;
    }
  }
}
.el-tabs {
  height: 70vh;
}
</style>