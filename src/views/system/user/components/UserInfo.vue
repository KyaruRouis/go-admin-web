<script setup lang="ts">
import {calculateDays} from "@/utils/date";
import {useUserStore} from "@/store/modules/user.ts";
import {getAllRoleListApi} from "@/api/system/user/user.ts";
import {onMounted, reactive, ref} from "vue";




// 服务器路径
const url = import.meta.env.VITE_APP_BASE_API
// 登录用户信息
const { userInfo } = useUserStore()

let role = ""; // 外部定义的变量

// 获取所有角色的列表
const getRoleName = async () => {
  const { data } = await getAllRoleListApi();  // 假设这是一个 API 调用
  for (let i = 0; i < data.result.length; i++) {
    console.log(data.result);
    if (data.result[i].id === userInfo.roleId) {
      console.log("匹配成功,值为：", data.result[i].name);
      role = data.result[i].name; // 修改外部变量 role
      return;
    }
  }
};

// 更新页面上的角色值
const updateRoleInPage = async () => {
  await getRoleName(); // 等待角色数据加载
  const roleElement = document.getElementById("rolename");  // 获取页面中的 <p> 标签
  if (role) {
    roleElement.textContent = "账号类型为："+role; // 设置 <p> 标签内容为 role
  } else {
    roleElement.textContent = "角色未找到";  // 如果没有找到角色，显示默认信息
  }
};

// 调用更新角色函数
updateRoleInPage();





onMounted(()=> {
  getRoleName()
})



</script>

<template>
  <el-col :span="6">
    <div class="right-box">
      <h3 class="title">
        <el-icon style="margin-right: 10px;">
          <Grid/>
        </el-icon>
        信息展示
      </h3>

      <div class="info">
        <div class="right-photo">
          <img v-if="userInfo.avatar===null || userInfo.avatar===''" src="@/assets/default_avatar.png">
          <img v-else :src="url+'uploadFile/'+userInfo.avatar">
        </div>
        <h2>Hi,{{userInfo.userName}}</h2>
        <br>
        <p class="email">{{userInfo.email}}</p>
      </div>
      <el-divider/>
      <h3 class="title">
        <el-icon style="margin-right: 10px;">
          <Sunrise/>
        </el-icon>
        账号类型
      </h3>
      <div class="type">
        <br>
        <p id="rolename">账号类型为：</p>

      </div>
      <el-divider/>
      <h3>
        <el-icon style="margin-right: 10px;">
          <Watch/>
        </el-icon>
        本站运行天数（{{calculateDays('2024-11-05 00:00:00')}}天）
      </h3>
      <br>
      <p>
        站长邮箱：<a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&amp;email=353628791@qq.com"
                    target="_blank" data-v-634963c2="">??????@qq.com</a>
      </p>


    </div>
  </el-col>
</template>

<style scoped>
.right-box {
  width: 100%;
  height: auto;
  background: white;
  padding: 20px;
  box-sizing: border-box;
}
.right-photo {
  position: relative;
  text-align: center;
  height: 100px;
  width: 100px;
  margin-left: -50px;
  left: 50%;
}
.info {
  text-align: center;
}

.right-photo img {
  width: 100%;
  border-radius: 50%;
}

.right-box h2 {
  padding-top: 10px;
  letter-spacing: 0;
  font-size: 30px;
}

.right-box .title {
  color: #e99d53;
}

</style>