<script setup lang="ts">
import {ref,reactive} from 'vue'
import {addMenuApi} from "@/api/system/menu/menu.ts";
import {ElMessage,FormInstance,FormRules} from "element-plus";
import Icon from "@/views/system/menu/components/Icon.vue";

// 接收父组件传过来的参数
const props = defineProps(['parentId','level'])

// 定义事件
const emit = defineEmits(['closeAddMenuForm','success'])

// 定义表单实例对象
const ruleFormRef = ref<FormInstance>()

// 定义约束规则对象
const rules = reactive<FormRules>({
  name: [{ required: true,message: '菜单名称不能为空' ,trigger: 'blur'}],
  sort: [{ required: true,message: '菜单排序不能为空',trigger: 'blur' }],
  path: [{ required: true,message: '菜单路径不能为空' ,trigger: 'blur'}],
  web_icon: [{ required: true,message: '菜单图标不能为空',trigger: 'blur' }],
  level: [{ required: true,message: '菜单等级不能为空' ,trigger: 'blur'}],
})

// 取消表单
const close = () => {
  emit('closeAddMenuForm')
}

// 按钮状态
const subLoading = ref(false)

// 表单数据对象
const formMenu = reactive({
  parent_id:props.parentId,
  name: '',
  sort: 0,
  path: '',
  web_icon: 'Search',
  level: '',
  component_name: ''
})

// 新增菜单
const addMenu = async (formEl:FormInstance | undefined)=> {
  if (!formEl)return
  await formEl.validate(async (valid)=> {
    subLoading.value = true
    if(valid){
      const { data } = await addMenuApi(formMenu)
      if (data.code === 200){
        ElMessage.success(data.msg)
        emit('success')
      }else {
        ElMessage.error(data.msg)
      }
    }else {
      ElMessage.error('提交表单失败，你还有未填写的项')
    }
  })
  subLoading.value = false
}

// 图标弹出框状态
const selectIconVisible = ref(false)

// 选择图标执行的事件函数
const onChangeIcon = (val:any) => {
  formMenu.web_icon = val
  selectIconVisible.value = false
}



</script>

<template>
  <el-form ref="ruleFormRef" :rules="rules" :model="formMenu" label-width="100px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="formMenu.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="路由路径" prop="path">
          <el-input v-model="formMenu.path" placeholder="请输入路由路径"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12" v-if="formMenu.level===1">
        <el-form-item label="组件路径">
          <el-input v-model="formMenu.component_name" placeholder="请输入组件路径"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="菜单图标" prop="web_icon">
          <el-input v-model="formMenu.web_icon" placeholder="请选择菜单图标" disabled>
            <template #append>
              <el-popover
                  :width="350"
                  trigger="click"
                  popper-class="pure-popper"
                  :popper-options="{placement: 'right'}"
                  :visible="selectIconVisible">

                <template #reference>
                  <div style="display: flex;justify-content: center;align-items: center;" @click="selectIconVisible=!selectIconVisible">
                    <el-icon style="cursor: pointer;">
                      <component style="font-size: 24px;" :is="formMenu.web_icon"></component>
                    </el-icon>
                  </div>
                </template>

                <el-scrollbar height="347px">
                  <Icon @onChangeIcon="onChangeIcon"/>
                </el-scrollbar>

              </el-popover>
            </template>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="菜单排序" prop="sort">
          <el-input-number v-model="formMenu.sort" :min="0" placeholder="请输入菜单排序"/>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="菜单等级" prop="level">
          <el-select v-model="formMenu.level" placeholder="请选择菜单等级">
            <el-option label="目录" :disabled="props.level!=null" :value="0"></el-option>
            <el-option label="菜单" :disabled="props.level==1"  :value="1"></el-option>
            <el-option label="按钮" :disabled="props.level==2"  :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

    </el-row>
  </el-form>

  <div class="dialog-button-wrap">
    <el-button @click="close">取消</el-button>
    <el-button @click="addMenu(ruleFormRef)" class="add-menu-btn" color="#e99d53" :loading="subLoading">保存</el-button>
  </div>
</template>

<style scoped>
.dialog-button-wrap{
  text-align: center;
  margin-top: 20px;
}
.add-menu-btn {
  color: white;
}
</style>