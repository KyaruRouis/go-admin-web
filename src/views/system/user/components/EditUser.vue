<script setup lang="ts">
import { ref,reactive,onMounted } from 'vue'
import { ElMessage,FormInstance,FormRules } from 'element-plus'
import {editUserApi, getAllRoleListApi} from "@/api/system/user/user.ts";
// 按钮状态
const subLoading = ref(false)

// 表单数据对象
const formUser = reactive({
  id: 0,
  username: '',
  password: '',
  phone: '',
  email: '',
  remarks: '',
  roleId: '',
  roleId2:''
})

// 获取父组件UserList.vue传过来的userInfo对象
const props = defineProps(['userInfo'])
const userInfo = props.userInfo

// 给表单填充数据
for (const key in formUser) {
  formUser[key] = userInfo[key]
}

// 更新管理员信息
const editUser = async (formEl:FormInstance | undefined) => {
  if (!formEl)return
  await formEl.validate(async (valid,fields)=> {
    subLoading.value = true
    if (valid){
      const { data } = await editUserApi(formUser)
      if (data.code===200){
        ElMessage.success(data.msg)
        emit('success')
      }else {
        ElMessage.error(data.msg)
      }
    }else {
      ElMessage.error('提交失败，你还有未填写的项！')
    }

  })
  subLoading.value = false
}

// 定义事件
const emit = defineEmits(['closeEditUserForm','success'])
// 取消表单
const close = () => {
  emit('closeEditUserForm')
}


// 定义表单实例对象
const ruleFormRef = ref<FormInstance>()

// 定义表单约束规则对象
const rules = reactive<FormRules>({
  username: [{required: true,message: '用户名不能为空',trigger: 'blur'}],
  password: [{required: true,message: '登录密码不能为空',trigger: 'blur'}],
  phone: [{required: true,message: '手机号不能为空',trigger: 'blur'}],
  email: [{required: true,message: '邮箱不能为空',trigger: 'blur'}],
  roleId: [
    { required: true, message: '管理角色不能为空', trigger: 'blur' },
    { validator: (rule, value, callback) => {
        if (Number.isInteger(value)) {
          callback(new Error(`角色ID不能为${value}`));
        } else {
          callback();
        }
      }, trigger: 'blur'
    }
  ],
})

// 定义角色下拉选择项数据
const roleOptions = ref<object[]>([])
// 获取所有角色的列表
const getAllRoleList = async () => {
  const { data } = await getAllRoleListApi()
  roleOptions.value = data.result
}

onMounted(()=> {
  getAllRoleList()
})

</script>

<template>
  <el-form ref="ruleFormRef" :rules="rules" :model="formUser" label-width="80px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formUser.username" placeholder="请输入用户名"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="formUser.password" placeholder="请输入登录密码"/>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formUser.phone" placeholder="请输入手机号"/>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formUser.email" placeholder="请输入邮箱"/>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="分配角色" prop="roleId">
          <el-select v-model="formUser.roleId" style="width: 100%;" placeholder="请选择角色">
            <el-option v-for="item in roleOptions" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="备注">
          <el-input type="textarea" :rows="2" v-model="formUser.remarks" placeholder="请输入备注"/>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <div class="dialog-button-wrap">
    <el-button @click="close">取消</el-button>
    <el-button @click="editUser(ruleFormRef)" :loading="subLoading" color="#e99d53" class="edit-user-btn">保存</el-button>
  </div>

</template>

<style scoped>
.dialog-button-wrap {
  text-align: center;
  margin-top: 20px;
}
.edit-user-btn {
  color: white;
}
</style>