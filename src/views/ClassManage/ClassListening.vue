<!--
 * @Date: 2023-03-04 20:51:40
 * @LastEditTime: 2023-03-13 10:07:43
-->
<template>
  <div>
    <el-date-picker 
      v-model="startTime"
      value-format="x"
      type="datetime"
    />
    <el-date-picker 
      v-model="endTime"
      value-format="x"
      type="datetime"
    />
    <el-input
       v-model="location"
       placeholder="听课教室"
    />
    <el-input
      v-model="teacherName"
      placeholder="教师名称" 
    />
    <el-input 
      v-model="courseName"
      placeholder="课程名称"
    />
    <el-button 
      type="primary"
      @click="addListeningRecord"
    >新增听课记录</el-button>
    <el-table
      stripe
      :data="listens"
    >
    <el-table-column
      align="center"
      sortable
      label="开始时间"
      prop="startTime"
    />
    <el-table-column
      align="center"
      label="结束时间"
      prop="endTime"
    />
    <el-table-column
      label="教师"
      align="center"
      prop="teacherName" 
    />
    <el-table-column
      align="center"
      label="教室"
      prop="location"
       
    /> 
    <el-table-column
      align="center"
      label="内容记录"
      prop="contentRecord"
       
    />
    <el-table-column
      align="center"
      label="操作"
    >
      <template #default="listens">
        <el-button
          link
          type="primary"
          :key="listens.row.listeningId"
          @click="getRecordDetail(listens.row.listeningId)"
        >详情</el-button>
        <el-button
          link
          type="danger"
          :key="listens.row.listeningId"
          @click="delVisitedRecord(listens.row.listeningId)"
        >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogFormVisible"
    >
    <div v-show="!isModify">
       <p>听课开始时间：{{ curListen.startTime }}</p>
       <p>听课开始时间：{{ curListen.endTime }}</p>
        <p>教师：{{ curListen.teacherName }}</p>
        <p>教室: {{ curListen.location }}</p>
        <p>内容记录: {{ curListen.contentRecord }}</p>
        <div>
          文件：
          <div
            v-for="file of files"
            class="file-icon"
            :key="file"
          > 
            <a :href="file">
              <img :src="getIcon(file)" />
            </a>
          </div>
        </div>
        <el-button @click="isModify = true">编辑</el-button>
      </div>
      <div v-show="isModify">
        <el-date-picker 
          v-model="curListen.startTime"
          value-format="x"
          type="datetime"
        /> 
        <el-date-picker 
          v-model="curListen.endTime"
          value-format="x"
          type="datetime"
        />
        <el-input
          v-model="curListen.teacherName"
          placeholder="教师姓名"
        />
        <el-input
          v-model="curListen.contentRecord"
          type="textarea"
          placeholder="关键内容记录"
        />
        <div
          v-for="(file,index) in files"
          class="file-icon"
          :key="file"
        >
          <img :src="getIcon(file)"/>
          <span
            @click="delFile(index)"
          >
            <svg t="1678457310643" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12702" width="200" height="200"><path d="M519.620465 0c-103.924093 0-188.511256 82.467721-192.083349 185.820279H85.015814A48.91386 48.91386 0 0 0 36.101953 234.686512a48.91386 48.91386 0 0 0 48.913861 48.866232h54.010046V831.345116c0 102.852465 69.822512 186.844279 155.909954 186.844279h439.200744c86.087442 0 155.909953-83.491721 155.909954-186.844279V284.100465h48.91386a48.91386 48.91386 0 0 0 48.913861-48.890046 48.91386 48.91386 0 0 0-48.913861-48.866233h-227.756651A191.559442 191.559442 0 0 0 519.620465 0z m-107.234232 177.080558c3.548279-49.771163 46.627721-88.540279 99.851907-88.540279 53.224186 0 96.327442 38.745302 99.351813 88.540279h-199.20372z m-111.997024 752.044651c-30.981953 0-65.083535-39.15014-65.083535-95.041488V287.744h575.488v546.839814c0 55.915163-34.077767 95.041488-65.059721 95.041488H300.389209v-0.500093z" fill="#D81E06" p-id="12703"></path><path d="M368.116093 796.814884c24.361674 0 44.27014-21.670698 44.27014-48.818605v-278.623256c0-27.147907-19.908465-48.818605-44.27014-48.818604-24.33786 0-44.27014 21.670698-44.27014 48.818604v278.623256c0 27.147907 19.360744 48.818605 44.293954 48.818605z m154.933581 0c24.361674 0 44.293953-21.670698 44.293954-48.818605v-278.623256c0-27.147907-19.932279-48.818605-44.293954-48.818604-24.33786 0-44.27014 21.670698-44.270139 48.818604v278.623256c0 27.147907 19.932279 48.818605 44.293953 48.818605z m132.810419 0c24.33786 0 44.27014-21.670698 44.27014-48.818605v-278.623256c0-27.147907-19.932279-48.818605-44.27014-48.818604s-44.27014 21.670698-44.27014 48.818604v278.623256c0 27.147907 19.360744 48.818605 44.27014 48.818605z" fill="#D81E06" p-id="12704"></path></svg>
          </span>   
        </div>
        <el-upload
          multiple
          drag
          name="uploadFile"
          action="https://3j783p6226.zicp.fun/student_manage/classDormitory/uploadFile"        
          :show-file-list="false"
          :on-success="setFiles"
          :headers="{
            'token': token
          }"
        >
          <template #default>
            点击或拖拽到此处添加文件
          </template>
        </el-upload>
        <el-button
          @click="modifyRecord"
        >
          确认
        </el-button> 
      </div>
    </el-dialog> 
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "ClassListening",
  props: {
    getIcon: {
      type: Function,
      default: () =>  {}
    },
    curTab: {
      type: String,
      default: ''
    }
  },
  setup() {
    const startTime = ref('')
    const endTime = ref('')
    const location = ref('')
    const teacherName = ref('')
    const courseName = ref('')
    const contentRecord = ref('')
    const listens = ref([])
    const dialogFormVisible = ref(false)
    const curRecordTime = ref()
    const uploadFile = ref('')
    const token = sessionStorage.getItem("Token")
    const curRecordId = ref(-1)
    const files = ref([])
    const curListen = ref('')
    const isModify = ref(false)
    return {
      startTime,
      endTime,
      location,
      teacherName,
      courseName,
      listens,
      dialogFormVisible,
      curRecordTime,
      contentRecord,
      uploadFile,
      token,
      curRecordId,
      files,
      curListen,
      isModify
    }
  },
  watch: {
    curTab: function() {
      if (this.curTab === '2') {
        this.getListeningRecords()
      }
    }
  },
  methods: {
    addListeningRecord() {
        this.$axios({
          method: 'post',
          url: '/classListening/add',
          data: {
            classId: this.$route.params.classId,
            startTime: this.startTime,
            endTime: this.endTime,
            location: this.location,
            teacherName: this.teacherName,
            courseName: this.courseName
          }
        }).then(res => this.getListeningRecords())
    },
    getListeningRecords() {
      this.$axios({
        method: 'get',
        url: '/classListening/list',
        params: {
          classId: this.$route.params.classId,
          page: 1,
          pageLimit: 100
        }
      }).then(({ data }) => {
        this.listens = data.data.listens
        console.log(data)
      })
    },
    getRecordDetail(listeningId) {
      this.dialogFormVisible = true
      this.curRecordId = listeningId
      this.$axios({
        method: 'get',
        url: '/classListening/get',
        params: {
          listeningId
        }
      }).then(({ data }) => {
        this.curListen = data.data
      })
    },
    delVisitedRecord(listeningId) {
      this.$axios({
        method: 'post',
        url: '/classListening/delete',
        data: {
          listeningId
        }
      }).then(res => {
        this.getListeningRecords()
      })
    },
    setFiles(res) {
      this.files.push(res.data)
    },
    delFile(index) {
      console.log(index)
    },
    modifyRecord() {
      // this.$axios({
      //   method: 'post',
      //   url: '/classDormitory/modify',
      //   data: {
      //     listeningId: this.curRecordId,
      //     time: this.curRecordTime,
      //     subject: this.subject,
      //     contentRecord: this.contentRecord,
      //     files: JSON.stringify(this.files)
      //   }
      // }).then(() => {
      //   this.isModify = false
      //   this.files = []
      //   this.getListeningRecords()
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/record.scss';
</style>