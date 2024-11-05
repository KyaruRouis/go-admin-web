<script setup lang="ts">

import {ref,reactive,toRefs,onMounted} from "vue";
import {delMenuApi, getMenuListApi} from "@/api/system/menu/menu.ts";
import AddMenu from "@/views/system/menu/components/AddMenu.vue";
import EditMenu from "@/views/system/menu/components/EditMenu.vue";
import {ElMessage} from "element-plus";

const state = reactive({
  // 搜索关键字
  searchValue: '',
  // 表格数据
  tableData: [],
  loading: false,
})
// 获取菜单数据列表
const loadData = async (state:object) => {
  state.loading = true
  // 先清空表格数据
  state.tableData=[]
  const params = {
    'keyword': state.searchValue
  }
  const {data} = await getMenuListApi(params)
  //state.tableData = data.result.list
  state.tableData = data.result
  state.loading = false
}

// 刷新
const refresh = ()=> {
  loadData(state)
}

// 添加菜单
const addTitle = ref('添加顶层菜单')
// 新增弹出框状态
const addMenuFormVisible = ref(false)
// 定义弹出事件
const addMenu = ()=> {
  addMenuFormVisible.value = true
  addTitle.value = '添加顶层菜单'
  parentId.value = 0
  level.value = null
}

// 关闭新增菜单弹出框
const closeAddMenuForm = () => {
  addMenuFormVisible.value = false
}

// 提交表单回调函数
const success = () => {
  loadData(state)
  closeAddMenuForm()
  closeEditMenuForm()
}

// 新增子菜单
const parentId = ref()
const level = ref()
const addSubMenu = (id:number,vLevel:number,name:string) => {
  addMenuFormVisible.value = true
  // 父节点ID
  parentId.value = id
  level.value =vLevel
  const menuName = ref('子菜单')
  if (vLevel==1){
    menuName.value = '按钮'
  }
  addTitle.value = `正在给“${name}”新增${menuName.value}`
}

// 定义编辑菜单弹出框状态
const editMenuFormVisible = ref(false)
// 菜单信息
const menuInfo = ref()
// 编辑弹出框事件函数
const editMenu = async (row:object)=> {
  menuInfo.value = row
  editMenuFormVisible.value = true
}

// 关闭编辑菜单弹出框
const closeEditMenuForm = () => {
  editMenuFormVisible.value = false
}

// 删除菜单信息
const delMenu = async (id:number) => {
  const { data } = await delMenuApi(id)
  if (data.code === 200){
    ElMessage.success('删除成功')
    await loadData(state)
  }else {
    ElMessage.error('删除失败')
  }
}

onMounted(()=>{
  loadData(state)
})

const {tableData,searchValue} = toRefs(state)

</script>

<template>
  <el-card>
    <!--头部 start-->
    <template #header>
      <div class="card-header">
        <h3>
          <el-icon style="margin-right: 10px"><Stamp/></el-icon>菜单管理
        </h3>

        <!--搜索区域 start-->
        <div class="card-search">
          <el-row :gutter="10">

            <el-col :span="20">
              <div class="my-button">
                <el-button @click="addMenu" color="#e99d53" plain style="width: 100%">添加顶级菜单</el-button>
              </div>
            </el-col>

            <el-col :span="4" style="display: inline-flex;justify-content: center;align-items: center;cursor: pointer">
              <el-icon style="font-size: 20px;color: #b3b6bc;"@click="refresh"><Refresh/></el-icon>
            </el-col>

          </el-row>
        </div>
        <!--搜索区域 end-->
      </div>
    </template>
    <!--头部 end-->

    <!--表格区域 start-->
    <div class="table-box">
      <el-table row-key="id" :tree-props="{children: 'sub_menus'}" element-loading-text="数据加载中..." v-loading="loading" :data="tableData"
      style="width: 100%;text-align: center;" :cell-style="{textAlign:'center'}"
      :header-cell-style="{fontSize:'15px',background: '#e99d53', color: 'white', textAlign:'center'}">
        <el-table-column label="序号" width="100" type="index"/>

        <el-table-column label="菜单名称">
          <template #default="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="菜单图标">
          <template #default="scope">
            <span>
              <el-icon>
                <component style="font-size: 24px;" :is="scope.row.web_icon"></component>
              </el-icon>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="菜单排序">
          <template #default="scope">
            <span>{{scope.row.sort}}</span>
          </template>
        </el-table-column>

        <el-table-column label="菜单类型">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.level=== 0">目录</el-tag>
            <el-tag type="info" v-else-if="scope.row.level=== 1">菜单</el-tag>
            <el-tag v-else>按钮</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="路由路径" prop="path"/>

        <el-table-column label="组件路径" prop="component_name"/>

        <el-table-column label="操作" width="260">
          <template #default="scope">
            <el-button v-if="scope.row.level!=2" color="#e99d53" style="color: white" size="small" @click="addSubMenu(scope.row.id,scope.row.level,scope.row.name)" type="primary">新增子级</el-button>
            <el-button size="small" @click="editMenu(scope.row)">
              <el-icon><Edit/></el-icon>
              编辑
            </el-button>

            <el-popconfirm width="200px" confirm-button-text="确定" cancel-button-text="取消" icon="Delete" icon-color="#626AEF"
                           :title="'确定要删除菜单名为“'+scope.row.name+'”的菜单吗？'" @confirm="delMenu(scope.row.id)">
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
    </div>
    <!--表格区域 end-->
  </el-card>
  <!--新增菜单弹出框 start-->
  <el-dialog align-center v-model="addMenuFormVisible" width="45%" destroy-on-close>
    <template #header>
      <div class="my-header">
        <el-icon><EditPen/></el-icon>
        <h1>{{addTitle}}</h1>
      </div>
    </template>
    <!--新增菜单组件 start-->
    <AddMenu :parentId="parentId" :level="level" @closeAddMenuForm="closeAddMenuForm" @success="success"/>
    <!--新增菜单组件 end-->
  </el-dialog>
  <!--新增菜单弹出框 end-->

  <!--编辑菜单弹出框 start-->
  <el-dialog align-center v-model="editMenuFormVisible" width="50%" destroy-on-close>
    <template #header>
      <div class="my-header">
        <el-icon size="26px"><EditPen/></el-icon>
        <h1>编辑菜单</h1>
      </div>
    </template>
    <!--编辑菜单组件 start-->
    <EditMenu :menuInfo="menuInfo" @closeEditMenuForm="closeEditMenuForm" @success="success"/>
    <!--编辑菜单组件 end-->
  </el-dialog>
  <!--编辑菜单弹出框 end-->

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
/*自定义弹出框头部样式*/
.my-header {
  display: flex;
  justify-content: flex-start;
  color: #e99d53;
}
</style>
