<script setup lang="ts">
import {ref,reactive} from 'vue'
import {ElMessage,FormInstance,FormRules} from 'element-plus'
import {editRoleApi} from "@/api/system/role/role.ts";
// 按钮状态
const subLoading = ref(false)
// 表单数据对象
const formRole = reactive({
  id:0,
  name: '',
  sort: 0,
  isAdmin: 0,
  remarks: ''
})
// 获取父组件传过来的roleInfo对象
const props = defineProps(['roleInfo'])
const roleInfo = props.roleInfo
// 给表单填充数据
for (const key in formRole) {
  formRole[key] = roleInfo[key]
}

// 更新角色信息
const editRole = async (formEl:FormInstance | undefined) => {
  if (!formEl)return
  await formEl.validate(async (valid)=> {
    subLoading.value = true
    if(valid){
      const {data} = await editRoleApi(formRole)
      if (data.code === 200){
        ElMessage.success(data.msg)
        emit('success')
      }else {
        ElMessage.error(data.msg)
      }
    }else {
      ElMessage.error('提交表单失败，你还有未填写的项！')
    }
  })
  subLoading.value = false
}

// 定义事件
const emit = defineEmits(['closeEditRoleForm','success'])

// 取消表单
const close = () => {
  emit('closeEditRoleForm')
}

// 定义表单实例对象
const ruleFormRef = ref<FormInstance>()
// 定义表单约束规则对象
const rules = reactive<FormRules>({
  name: [{required: true,message: '角色名称不能为空',trigger: 'blur'}],
  sort: [{required: true,message: '角色排序不能为空',trigger: 'blur'}],
  isAdmin: [{required: true,message: '是否超管不能为空',trigger: 'blur'}],
})

</script>

<template>
  <el-form ref="ruleFormRef" :rules="rules" :model="formRole" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formRole.name" placeholder="请输入角色名称"/>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="角色排序" prop="sort">
          <el-input-number v-model="formRole.sort" placeholder="请输入角色排序"/>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="超级管理员" prop="isAdmin">
          <el-switch v-model="formRole.isAdmin" :active-value="1" :inactive-value="0"
                     style="--el-switch-on-color: #e99d53;"/>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="备注">
          <el-input v-model="formRole.remarks" type="textarea" :rows="2" placeholder="请输入备注"/>
        </el-form-item>
      </el-col>

    </el-row>
  </el-form>

  <div class="dialog-button-wrap">
    <el-button @click="close">取消</el-button>
    <el-button @click="editRole(ruleFormRef)" :loading="subLoading" color="#e99d53" class="edit-role-btn">保存</el-button>
  </div>
</template>

<style scoped>
.dialog-button-wrap {
  text-align: center;
  margin-top: 20px;
}
.edit-role-btn {
  color: white;
}
</style>