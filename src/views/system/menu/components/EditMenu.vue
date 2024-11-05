<script setup lang="ts">
import {ref,reactive,computed} from 'vue'
import {ElMessage,FormInstance,FormRules} from "element-plus";
import Icon from "@/views/system/menu/components/Icon.vue";
import {editMenuApi} from "@/api/system/menu/menu.ts";

// 定义表单实例对象
const ruleFormRef = ref<FormInstance>()
// 定义约束规则对象
const rules = reactive<FormRules>({
  name: [{required: true,message: '菜单名称不能为空',trigger: 'blur'}],
  sort:[{required: true,message: '菜单排序不能为空',trigger: 'blur'}],
  web_icon: [{required: true,message: '菜单图标不能为空',trigger: 'blur'}],
  path: [{required: true,message: '菜单路径不能为空',trigger: 'blur'}],
})

// 定义事件
const emit=  defineEmits(['closeEditMenuForm','success'])

// 获取父组件传过来的menuInfo对象
const props = defineProps(['menuInfo'])
const menuInfo = props.menuInfo

// 按钮状态
const subLoading = ref(false)
// 表单数据对象
const formMenu = reactive({
  id: 0,
  name: '',
  sort:0,
  parent_id:0,
  web_icon: '',
  level: 0,
  path: '',
  component_name: ''
})

// 给表单填充数据
for (const key in formMenu) {
  formMenu[key] = menuInfo[key]
}

// 更新菜单信息
const editMenu = async (formEl: FormInstance | undefined) => {
  if(!formEl)return
  await formEl.validate(async (valid)=> {
    subLoading.value = true
    if(valid){
      const { data } = await editMenuApi(formMenu)
      if(data.code === 200){
        ElMessage.success(data.msg)
        emit('success')
      }else {
        ElMessage.error(data.msg)
      }
    }else{
      ElMessage.error('提交表单失败，你还有未填写的项！')
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

// 取消表单
const close = () => {
  emit('closeEditMenuForm')
}

</script>

<template>
  <el-form ref="ruleFormRef" :rules="rules" :model="formMenu" label-width="100px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="formMenu.name" placeholder="请输入菜单名称"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="菜单排序" prop="sort">
          <el-input-number v-model="formMenu.sort" :min="0" placeholder="请输入菜单排序"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="菜单路径" prop="path">
          <el-input v-model="formMenu.path" placeholder="请输入菜单路径"/>
        </el-form-item>
      </el-col>

      <el-col :span="12" v-if="formMenu.level===1">
        <el-form-item label="组件路径">
          <el-input v-model="formMenu.component_name" placeholder="请输入组件路径"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
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

    </el-row>
  </el-form>

  <div class="dialog-button-wrap">
    <el-button @click="close">取消</el-button>
    <el-button @click="editMenu(ruleFormRef)" class="edit-menu-btn" color="#e99d53" :loading="subLoading">保存</el-button>
  </div>
</template>

<style scoped>
.dialog-button-wrap {
  text-align: center;
  margin-top: 20px;
}
.edit-menu-btn {
  color: white;
}
</style>