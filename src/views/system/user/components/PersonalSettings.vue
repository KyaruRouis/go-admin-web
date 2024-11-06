<script setup lang="ts">
import {ref,reactive,toRefs,onMounted} from 'vue'
import {useUserStore} from "@/store/modules/user";
import { FormRules,FormInstance,ElMessage } from 'element-plus'
import {updateInfoApi} from "@/api/system/user/user.ts";
import BindEmail from "@/views/system/user/components/BindEmail.vue";
import UpdatePwd from "@/views/system/user/components/UpdatePwd.vue";
import UserInfo from "@/views/system/user/components/UserInfo.vue";
// 基础信息表单实例对象
const basicFormRef = ref<FormInstance>()
// 按钮状态
const loading = ref(false)
const state = reactive({
  // 基础信息
  basic: {
    userName: '',
    sex: '',
    avatar: ''
  }
})
// 定义校验基础信息表单规则
const basicRules = reactive<FormRules>({
  avatar: [{required: true,message: '请上传头像',trigger: 'blur'}],
  sex: [{required: true,message: '请选择性别',trigger: 'blur'}],
})
// 服务器路径
const url = import.meta.env.VITE_APP_BASE_API
// 图片上传地址
const uploadURL = url+"upload/file"
// 上传图片需要带上token
const userStore = useUserStore()
const headerObj = {
  AccessToken:userStore.token
}

// 上传图片成功执行的函数
const handleAvatarSuccess = (res)=> {
  if (res.code === 200){
    state.basic.avatar = res.fileName
  }
}
// 提交基础信息
const onBasicSubmit = (formEl:FormInstance| undefined) => {
  if(!formEl)return
  formEl.validate(async (valid)=> {
    loading.value = true
    if (valid){
      const { data } = await updateInfoApi({...state.basic})
      if(data.code === 200){
        // 重置登录用户的信息
        userStore.setUserInfo({
          sex: state.basic.sex,
          avatar: state.basic.avatar
        })
        ElMessage.success("基础信息修改成功！")
      }else {
        ElMessage.error("基础信息修改失败！")
      }
    }else {
      ElMessage.error("提交表单失败，你还有未填写的项！")
    }
    loading.value = false
  })
}

onMounted(()=> {
  // 获取登录用户的信息
  state.basic.userName=userStore.userInfo.userName
  state.basic.sex = userStore.userInfo.sex
  state.basic.avatar = userStore.userInfo.avatar
})

const { basic } = toRefs(state)


</script>

<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <!--左侧信息 start-->
      <div class="left-box">
        <h3 class="title">
          <el-icon><User/></el-icon>
          个人信息设置
        </h3>

        <!--基本设置 start-->
        <div class="set">
          <h4>基础设置</h4>
          <el-form ref="basicFormRef" :rules="basicRules" status-icon :model="basic">
            <el-row :gutter="20">
              <!--用户账号-->
              <el-col :span="8">
                <el-form-item  label="用户账号" style="width: 100%;">
                  <el-input v-model="basic.userName" disabled/>
                </el-form-item>
              </el-col>

              <!--用户性别-->
              <el-col :span="8">
                <el-form-item prop="sex" label="性别" style="width: 100%;">
                  <el-radio v-model="basic.sex" label="男"></el-radio>
                  <el-radio v-model="basic.sex" label="女"></el-radio>
                </el-form-item>
              </el-col>

              <!--用户头像-->
              <el-col :span="5">
                <el-form-item label="头像" style="margin: auto;" prop="avatar">
                  <el-upload class="avatar-uploader" :action="uploadURL" :headers="headerObj"
                             name="fileResource" :show-file-list="false" :on-success="handleAvatarSuccess">
                    <img v-if="basic.avatar" :src="url+'uploadFile/'+basic.avatar" style="width: 50px;border-radius: 50px;">
                    <img v-else src="@/assets/default_avatar.png" style="width: 50px;border-radius: 50px;"/>
                    <span style="margin-left: 10px;font-size: 10px;text-decoration: underline;line-height: 20px;">点击更换</span>
                  </el-upload>
                </el-form-item>
              </el-col>

              <!--提交按钮-->
              <el-col :span="3">
                <el-form-item>
                  <el-button plain color="#2fa7b9" style="margin-left: 50px;" :loading="loading" @click="onBasicSubmit(basicFormRef)">提交</el-button>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>
        <!--基本设置 end-->

        <el-divider border-style="dashed"/>
        <!--绑定邮箱 start-->
        <BindEmail/>
        <!--绑定邮箱 end-->

        <!--修改密码 start-->
        <UpdatePwd/>
        <!--修改密码 end-->

      </div>
      <!--左侧信息 end-->
    </el-col>

    <!--右侧个人信息 start-->
    <UserInfo/>
    <!--右侧个人信息 end-->

  </el-row>
</template>

<style scoped>
.left-box{
  width: 100%;
  height: auto;
  background: white;
  padding: 20px;
  box-sizing: border-box;
}

.left-box .title {
  color: #e99d53;
  margin-bottom: 10px;
  padding: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.left-box .set {
  text-align: left;
  padding: 0px 20px;
  margin-bottom: 10px;
  color: #8f8f8f;
  line-height: 35px;
}
.left-box .set h4 {
  line-height: 45px;
  color: #8f8f8f;
}

</style>