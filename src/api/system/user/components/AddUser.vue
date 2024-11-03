<script setup lang="ts">
import {ref,reactive} from "vue";
import {addUserApi} from "@/api/system/user/user.ts";
import {ElMessage,FormInstance,FormRules} from "element-plus";
// 定义事件
const emit = defineEmits(['closeAddUserForm','success'])
// 按钮状态
const subLoading = ref(false)// 表单数据对象
const formUser = reactive({
  username: '',
  password: 'admin',
  phone: '',
  email: '',
  remarks: ''
})

// 表单实例对象
const ruleFormRef = ref<FormInstance>()

// 表单约束规则对象
const rules = reactive<FormRules>({
  username: [{required: true,message:'用户名不能为空',trigger:'blur'}],
  password:[{required:true,message:'登录密码不能为空',trigger:'blur'}],
  phone: [{required: true,message:'手机号不能为空',trigger:'blur'}],
  email: [{required:true,message:'邮箱不能为空',trigger:'blur'}],
})

// 新增管理员信息
const addUser = async(formEl:FormInstance | undefined)=> {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    subLoading.value = true
    if (valid) {
      const {data} = await addUserApi(formUser)
      if (data.code === 200) {
        ElMessage.success(data.msg)
        emit('success')
      } else {
        ElMessage.error(data.msg)
      }
    }else {
        ElMessage.error('提交表单失败，你还有未填写的项!')
      }

  })
  subLoading.value = false
}
// 取消表单
const close = ()=> {
  emit('closeAddUserForm')
}
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
  <el-col :span="12">
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="formUser.phone" placeholder="请输入手机号"/>
    </el-form-item>
  </el-col>
      <el-col :span="12">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formUser.email" placeholder="请输入邮箱"/>
        </el-form-item>
      </el-col>
  <el-col :span="24">
    <el-form-item label="备注">
      <el-input :rows="2" type="textarea" v-model="formUser.remarks" placeholder="请输入备注"/>
    </el-form-item>
  </el-col>
    </el-row>
  </el-form>

  <div class="dialog-button-wrap">
    <el-button @click="close">取消</el-button>
    <el-button @click="addUser(ruleFormRef)" :loading="subLoading" type="success" color="#e99d53" class="add-user">保存</el-button>
  </div>
</template>

<style scoped>
.dialog-button-wrap {
  text-align: center;
  margin-top: 20px;
}
.add-user {
  color: white;
}
</style>