<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/Index.vue"
import {ref,reactive} from "vue";
import type{FormInstance,FormRules} from "element-plus";
import {ElNotification} from "element-plus";
import {useRouter} from "vue-router";
import {loginApi} from "@/api/system/login/login.ts";
import {useUserStore} from "@/store/modules/user.ts";


const userStore = useUserStore();
// 路由对象
const router = useRouter()
// 表单实例对象
const ruleFormRef = ref<FormInstance>()
// 密码类型
const passwordType = ref('password')
// 提交表单后的状态
const loading = ref(false)
// 表单规则
const rules = reactive<FormRules>({
  password: [{required:true,message:'请输入密码',trigger:"blur"}],
  username: [{required:true,message:'请输入用户名',trigger:"blur"}],
})

// 表单数据对象
const ruleForm = reactive({
  username: 'admin',
  password: '',
})
// 显示密码图标
const showPwd = ()=> {
  passwordType.value = passwordType.value === 'password'?'': 'password'
}

// 提交表单函数
const submitForm = (formEl:FormInstance | undefined) => {
  loading.value = true
  if(!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      // 调用登录接口
      const {data} = await loginApi({...ruleForm})
      if(data.code === 200){
        // 设置token
        userStore.setToken(data.result.token)
        // 设置登录用户信息
        userStore.setUserInfo(data.userInfo)
        // 跳转到后台首页
        setTimeout(()=> {
          router.push({path:'/home'})
          //window.location.href='/home'
        },1500)

        ElNotification({
          title: '登陆成功',
          message: '欢迎登录 后台管理系统',
          type: 'success',
          duration: 3000,
        })
      }else {
        ElNotification({
          title: '温馨提示',
          message: data.msg,
          type: 'error',
          duration: 3000,
        })
      }
    }else {
      ElNotification({
        title: '温馨提示',
        message: '提交表单失败，你还有未填写的项！',
        type: 'error',
        duration: 3000,
      })
      return false;
    }
  })
  loading.value = false
}
</script>

<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" @keyup.enter.native="submitForm(ruleFormRef)">
    <el-form-item label="" prop="username">
      <el-input placeholder="请输入用户名" autocomplete="on" style="position: relative;" v-model="ruleForm.username">
        <template #prefix>
          <el-icon><UserFilled/></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="" prop="password">
      <el-input placeholder="请输入密码" autocomplete="on" v-model="ruleForm.password" :type="passwordType">
        <template #prefix>
          <el-icon><GoodsFilled/></el-icon>
        </template>
        <template #suffix>
          <div class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye-closed' : 'eye'" />
          </div>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item style="width:100%;">
      <el-button :loading="loading" class="login-btn" color="#e99d53" @click="submitForm(ruleFormRef)">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.login-btn {
  margin-top: 20px;
  width: 100%;
  height: 47px;
  color: white;
  font-size: 20px;
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}

::v-deep(.svg-icon) {
  vertical-align: 0;
}

</style>