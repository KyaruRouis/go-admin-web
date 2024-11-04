<script setup lang="ts">
import {formatTime} from "@/utils/date";
import {ref, reactive, toRefs, onMounted} from 'vue'
import {delRoleApi, getRoleApi, getRoleListApi, updateIsAdminByIdApi} from "@/api/system/role/role.ts";
import { ElMessage,ElMessageBox } from 'element-plus'
import AddRole from "@/views/system/role/components/AddRole.vue";
import EditRole from "@/views/system/role/components/EditRole.vue";
import {exportExcel} from "@/utils/exportExcel";

const state = reactive({
  // 搜索关键字
  searchValue: '',
  // 表格数据
  tableData: [],
  // 总条数
  total: 0,
  // 当前页码
  pageIndex: 1,
  // 每页显示行数
  pageSize: 10,
  loading: false
})
const {tableData,pageSize,loading,total,searchValue} = toRefs(state)

// 获取角色列表数据
const loadData = async (state:any) => {
  state.loading = true
  // 先清空表格数据
  state.tableData = []
  const params = {
    'pageIndex':state.pageIndex,
    'pageSize':state.pageSize
  }
  const {data} = await getRoleListApi(params)
  state.tableData = data.result.list
  state.total = data.result.total
  state.loading = false
}
onMounted(()=> {
  loadData(state)
})

// 刷新
const refresh = () => {
  // 搜索关键字
  state.searchValue = ''
  loadData(state)
}

// 搜索
const search = () => {
  if(state.searchValue!=null &&state.searchValue!=''){
    loadData(state)
    ElMessage({
      type: 'success',
      message: `关键字“${state.searchValue}”搜索内容如下`
    })
  }
}

const params = {
  'pageIndex':state.pageIndex,
  'pageSize':state.pageSize,
  'keyword':state.searchValue
}

// 切换页码执行事件
const changePage = (val:number) => {
  state.pageIndex = val
  loadData(state)
}

// 处理列表序号
const Nindex = (index:number) => {
  // 当前页面
  const page = state.pageIndex
  // 每页显示行数
  const pageSize = state.pageSize
  return index+1+(page-1)*pageSize
}

// 更改超管状态
const handleChangeAdminState = async (row) => {
  ElMessageBox.confirm("确认修改当前角色身份吗？",{
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    confirmButtonClass: "btnConfirm",
    autofocus: false
  }).then(async ()=> {
    const { data } = await updateIsAdminByIdApi(row.id,row.is_admin==1?0:1)
    if (data.code===200){
      loadData(state)
      ElMessage.success(data.msg)
    }else {
      ElMessage.error(data.msg)
    }
  }).catch(()=> {
    console.log('----------')
  })
}

// 定义新增角色弹出框状态
const addRoleFormVisible = ref(false)
// 添加角色弹出框
const addRole = () => {
  addRoleFormVisible.value = true
}

// 关闭新增角色弹出框
const closeAddRoleForm = () => {
  addRoleFormVisible.value = false
}

// 提交表单回调函数
const success = () => {
  loadData(state)
  closeAddRoleForm()
  closeEditRoleForm()
}

// 定义编程角色弹出框状态
const editRoleFormVisible = ref(false)
// 角色信息
const roleInfo = ref()
// 编辑角色弹出框
const editRole = async (id:number) => {
  const { data } = await getRoleApi(id)
  roleInfo.value = data.result
  editRoleFormVisible.value = true
}

// 关闭编辑角色信息弹出框
const closeEditRoleForm = () => {
  editRoleFormVisible.value = false
}

// 删除角色信息
const delRole = async (id:number) => {
  const { data } = await delRoleApi(id)
  if (data.code === 200){
    ElMessage.success('删除成功')
    await loadData(state)
  }else {
    ElMessage.error('删除失败')
  }
}

// 导出列表
const column = [
  {name: 'id',label: '角色ID'},
  {name: 'name',label: '角色名称'},
  {name: 'sort',label: '角色排序'},
  {name: 'is_admin',label: '是否超管'},
  {name: 'remarks',label: '备注'}
]

// 导出Excel
const exportExcelAction = () => {
  exportExcel({
    column,
    data: state.tableData,
    filename: '角色信息数据',
    format: 'xlsx',
    autowidth: false
  })
}

</script>

<template>
  <el-card>
    <!--头部 Start-->
    <template #header>
      <div class="card-header">
        <h3>
          <el-icon style="margin-right: 10px;"><Stamp/></el-icon>角色管理
        </h3>

        <!--搜索区域 start-->
        <div class="card-search">
          <el-row :gutter="10">
            <el-col :span="10">
              <el-input prefix-icon="Search" v-model="searchValue" @keyup.enter.native="search()" placeholder="关键字搜索（回车）"/>
            </el-col>

            <el-col :span="11">
              <div class="my-button">
                <el-button plain style="width: 100%;" color="#e99d53" @click="addRole">
                  <el-icon><Plus/></el-icon>
                  添加角色
                </el-button>
                <el-button plain style="width: 100%;" color="#076613" @click="exportExcelAction">
                  <el-icon><Download/></el-icon>
                  导出Excel
                </el-button>
              </div>
            </el-col>

            <el-col :span="3" style="display: inline-flex;justify-content: center;align-items: center;cursor: pointer;">
              <el-icon style="font-size: 20px;color: #b3b6bc;" @click="refresh"><Refresh/></el-icon>
            </el-col>

          </el-row>
        </div>
        <!--搜索区域 end-->
      </div>
    </template>
    <!--头部 end-->
    <!--表格区域  start-->
    <div class="table-box">
      <el-table element-loading-text="数据加载中..." v-loading="loading" :data="tableData"
                style="width: 100%;text-align: center;" :cell-style="{textAlign:'center'}"
                :header-cell-style="{fontSize:'15px',background:'#e99d53',color: 'white',textAlign:'center'}">

        <el-table-column label="序号" width="100" type="index" :index="Nindex"/>

        <el-table-column label="角色名称">
          <template #default="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="角色排序">
          <template #default="scope">
            <span>{{scope.row.sort}}</span>
          </template>
        </el-table-column>

        <el-table-column label="是否超管">
          <template #default="scope">
            <el-switch v-model="scope.row.is_admin" :active-value="1" :inactive-value="0"  style="--el-switch-on-color: #e99d53;"
                       :before-change="handleChangeAdminState.bind(this,scope.row)"/>
          </template>
        </el-table-column>

        <el-table-column label="创建时间">
          <template #default="scope">
            <span>{{formatTime(scope.row.created_at,'yyyy-MM-dd')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="更新时间">
          <template #default="scope">
            <span>{{formatTime(scope.row.updated_at,'yyyy-MM-dd')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="editRole(scope.row.id)">
              <el-icon><Edit/></el-icon>
              编辑
            </el-button>

            <el-popconfirm width="200px" confirm-button-text="确定" cancel-button-text="取消" icon="Delete" icon-color="#626AEF"
                           :title="'确定要删除角色名为“'+scope.row.name+'”的角色吗？'" @confirm="delRole(scope.row.id)">
              <template #reference>
                <el-button size="small" type="danger">
                  <el-icon><Delete/></el-icon>
                  删除
                </el-button>
              </template>

            </el-popconfirm>

          </template>
        </el-table-column>

      </el-table>
      <!--分页插件 start-->
      <el-pagination background layout="total,sizes,prev,pager,next,jumper" :total="total"
                     v-model:page-size="pageSize" :page-sizes="[10,20,30,40]" @current-change="changePage"/>
      <!--分页插件 end-->
    </div>
    <!--表格区域  end-->
    <!--新增角色弹出框 start-->
    <el-dialog align-center v-model="addRoleFormVisible" width="45%" destroy-on-close>
      <template #header>
        <div class="my-header">
          <el-icon size="26px"><EditPen/></el-icon>
          <h1>新增角色</h1>
        </div>
      </template>

      <!--添加角色组件 start-->
      <AddRole @closeAddRoleForm="closeAddRoleForm" @success="success"/>
      <!--添加角色组件 end-->
    </el-dialog>
    <!--新增角色弹出框 end-->
    <!--编辑角色弹出框 start-->
    <el-dialog align-center v-model="editRoleFormVisible" width="50%" destroy-on-close>
      <template #header>
        <div class="my-header">
          <el-icon size="26px"><EditPen/></el-icon>
          <h1>编辑角色</h1>
        </div>
      </template>
      <!--编辑角色组件 start-->
      <EditRole :roleInfo="roleInfo" @closeEditRoleForm="closeEditRoleForm" @success="success"/>
      <!--编辑角色组件 end-->
    </el-dialog>
    <!--编辑角色弹出框 end-->
  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #e99d53;
}
/*自定义按钮样式*/
.my-button {
  display: flex;
  justify-content: space-between;
}

/*自定义分页插件样式*/
.el-pagination {
  justify-content: center;
  margin-top: 20px;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active){
  background-color: #e99d53;
}

/*自定义弹出框头部样式*/
.my-header {
  display: flex;
  justify-content: flex-start;
  color: #e99d53;
}

</style>