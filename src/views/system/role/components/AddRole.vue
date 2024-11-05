<script setup lang="ts">
import {ref, reactive} from 'vue'
import { ElMessage } from 'element-plus'
import {addRoleApi} from "@/api/system/role/role.ts";
import type {ElTree} from 'element-plus'
import {getMenuListApi} from "@/api/system/menu/menu.ts";

// 树形菜单实例对象
const treeRef = ref<InstanceType<typeof ElTree>>()

// 菜单数据对象
const menus = ref()
const treeProps = {
  children: "sub_menus",
  label: "name"
}

// 获取菜单数据
const menuList = async () => {
  const {data} = await getMenuListApi()
  menus.value = data.result
}
menuList()

// 按钮状态
const subLoading = ref(false)

// 表单数据对象
const formRole = reactive({
  name: '',
  sort: 0,
  isAdmin: 0,
  remarks: '',
  menuId: []
})

// 新增角色
const addRole = async (formEl: FormInstance | undefined) => {
  if(!formEl)return
  await formEl.validate(async (valid)=> {
    subLoading.value = true
    if(valid){
      formRole.menuId = treeRef.value!.getCheckedKeys(false)
      const { data } = await addRoleApi(formRole)
      if(data.code === 200){
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
const emit = defineEmits(['closeAddRoleForm','success'])

// 取消表单
const close = () => {
  emit('closeAddRoleForm')
}

// 表单实例对象
const ruleFormRef = ref<FormInstance>()

// 表单约束规则对象
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
          <el-input-number v-model="formRole.sort" :min="0" placeholder="请输入角色排序"/>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="超级管理员" prop="isAdmin">
          <el-switch v-model="formRole.isAdmin" :active-value="1" :inactive-value="0"
                     style="--el-switch-on-color: #e99d53;"/>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="分配菜单">
          <el-tree
              ref="treeRef"
              :data="menus"
              :props="treeProps"
              mutiple
              :render-after-expand="false"
              node-key="id"
              show-checkbox
              check-strictly
              :default-checked-keys="formRole.menuId"
              check-on-click-node
              style="display: block;width: 100%;"/>
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
    <el-button @click="addRole(ruleFormRef)" class="add-role-btn" color="#e99d53" :loading="subLoading">保存</el-button>
  </div>
</template>

<style scoped>
.dialog-button-wrap {
  text-align: center;
  margin-top: 20px;
}
.add-role-btn {
  color: white;
}
</style>