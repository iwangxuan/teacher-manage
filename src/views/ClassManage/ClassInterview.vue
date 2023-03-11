<!--
 * @Date: 2023-03-04 20:51:40
 * @LastEditTime: 2023-03-11 21:09:09
-->
<template>
  <div>
    <el-date-picker 
      v-model="time"
      value-format="x"
      type="datetime"
    />
    <el-button 
      type="primary"
      @click="addDormitoryRecord"
    >新增查寝记录</el-button>
    <el-table
      stripe
      :data="visits"
    >
    <el-table-column
      align="center"
      sortable
      label="查寝时间"
      prop="time"
    />
    <el-table-column
      label="查寝目的"
      align="center"
      prop="subject" 
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
      <template #default="visits">
        <el-button
          link
          type="primary"
          :key="visits.row.dormitoryVisitId"
          @click="getRecordDetail(visits.row.dormitoryVisitId)"
        >详情</el-button>
        <el-button
          link
          type="danger"
          :key="visits.row.dormitoryVisitId"
          @click="delVisitedRecord(visits.row.dormitoryVisitId)"
        >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogFormVisible"
    >
      <div v-show="!isModify">
        <p>查寝时间：{{ curRecordTime }}</p>
        <p>查寝目的：{{ subject }}</p>
        <p>查寝记录：{{ contentRecord }}</p>
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
          v-model="curRecordTime"
          value-format="x"
          type="datetime"
        />
        <el-input
          v-model="subject"
          placeholder="请输入查寝目的"
        />
        <el-input
          v-model="contentRecord" 
          type="textarea"
          placeholder="请输入关键内容记录"
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
  name: "ClassInterview",
  props: {
    getIcon: {
      type: Function,
      default: () =>  {}
    }
  },
  setup() {
    const time = ref('')
    const visits = ref([])
    const subject = ref('')
    const contentRecord = ref('')
    const dialogFormVisible = ref(false)
    const curRecordTime = ref()
    const uploadFile = ref('')
    const token = sessionStorage.getItem("Token")
    const curRecordId = ref(-1)
    const files = ref([])
    const isModify = ref(false)
    return {
      time,
      visits,
      dialogFormVisible,
      curRecordTime,
      subject,
      contentRecord,
      uploadFile,
      token,
      curRecordId,
      files,
      isModify
    }
  },
  created() {
    // this.getDormitoryVisitList()
  },
  methods: {
    addDormitoryRecord() {
        this.$axios({
          method: 'post',
          url: '/classDormitory/add',
          data: {
            classId: this.$route.params.classId,
            time: this.time
          }
        }).then(res => this.getDormitoryVisitList())
    },
    getDormitoryVisitList() {
      this.$axios({
        method: 'get',
        url: '/classDormitory/list',
        params: {
          classId: this.$route.params.classId,
          page: 1,
          pageLimit: 100
        }
      }).then(({data}) => this.visits = data.data.visits)
    },
    getRecordDetail(dormitoryVisitId) {
      this.dialogFormVisible = true
      this.curRecordId = dormitoryVisitId
      this.$axios({
        method: 'get',
        url: '/classDormitory/get',
        params: {
          dormitoryVisitId
        }
      }).then(({ data }) => {
        this.curRecordTime = data.data.time
        this.subject = data.data.subject
        this.contentRecord = data.data.contentRecord
        this.files = JSON.parse(data.data.files) ? JSON.parse(data.data.files) : []
      })
    },
    delVisitedRecord(dormitoryVisitId) {
      this.$axios({
        method: 'post',
        url: '/classDormitory/delete',
        data: {
          dormitoryVisitId
        }
      }).then(res => {
        this.getDormitoryVisitList()
      })
    },
    setFiles(res) {
      this.files.push(res.data)
    },
    delFile(index) {
      console.log(index)
    },
    modifyRecord() {
      this.$axios({
        method: 'post',
        url: '/classDormitory/modify',
        data: {
          dormitoryVisitId: this.curRecordId,
          time: this.curRecordTime,
          subject: this.subject,
          contentRecord: this.contentRecord,
          files: JSON.stringify(this.files)
        }
      }).then(() => {
        this.isModify = false
        this.files = []
        this.getDormitoryVisitList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/record.scss';
</style>