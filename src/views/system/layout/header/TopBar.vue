<script setup lang="ts">
import {SwitchButton} from "@element-plus/icons-vue"
import CollapseIcon from "@/views/system/layout/header/CollapseIcon.vue"
import Hamburger from "@/views/system/layout/header/Hamburger.vue";
import TabsView from "@/views/system/layout/tags/Index.vue"
import {useUserStore} from "@/store/modules/user";
import {calculateDays, formatTime} from "@/utils/date.ts";

// 登录用户信息
const { userInfo } = useUserStore()
// 服务器路径
const url = import.meta.env.VITE_APP_BASE_API

// 退出系统
const exit = ()=> {
  // 清除用户登录信息
  window.localStorage.removeItem("userStore");
  // 清除用户对应的菜单数据
  window.localStorage.removeItem("menuState");
  // 返回登录页
  window.location.href="/"
}
</script>

<template>
<div class="main">
  <div class="tool-left">
    <CollapseIcon/>
    <Hamburger/>
  </div>
  <div class="linkBox">
    <!--登录用户信息 start-->
    <el-popover :width="300">
      <!--用户头像 start-->
      <template #reference>
        <el-link :underline="false">
          <img v-if="userInfo.avatar" :src="url+'uploadFile/'+userInfo.avatar" style="width: 40px;border-radius: 50px">
          <img v-else src="@/assets/default_avatar.png" style="width: 40px;border-radius: 50px">
          <span>{{userInfo.userName}}</span>
        </el-link>
      </template>
      <!--用户头像 end-->
      <!--用户信息 start-->
      <template #default>
        <div style="display: flex;gap:16px;flex-direction: column">
          <div class="info-card">
            <!--用户头像-->
            <img v-if="userInfo.avatar" :src="url+'uploadFile/'+userInfo.avatar">
            <img v-else src="@/assets/default_avatar.png">
            <p>用户名：{{userInfo.userName}}</p>
            <p>Email:{{userInfo.email}}</p>
            <p>注册时间：{{formatTime(userInfo.CreatedAt,'yyyy-MM-dd')}}</p>
          </div>
          <div class="info-card-desc" style="margin: 0;">

            <!--性别 start-->
            <div style="float: left;width: 75px;padding: 10px;border-right: 1px;text-align: center">
              <p>性别</p>
              <p style="font-size: 25px;font-weight: 600;">{{userInfo.sex}}
                <span style="font-size: 10px;font-weight: 100;margin-left: 5px;">孩</span>
              </p>
            </div>
            <!--性别 end-->

            <!--性别 start-->
            <div style="float: left;width: 75px;padding: 10px;border-right: 1px;text-align: center">
              <p>注册</p>
              <p style="font-size: 25px;font-weight: 600;">{{calculateDays(userInfo.CreatedAt)}}
                <span style="font-size: 10px;font-weight: 100;margin-left: 5px;">天</span>
              </p>
            </div>
            <!--性别 end-->

          </div>
        </div>
      </template>
      <!--用户信息 end-->
    </el-popover>
    <!--登录用户信息 end-->

    <!--退出系统 start-->
    <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" icon="SwitchButton"
    icon-color="#30bcd7" title="确认退出系统吗？" @confirm="exit">
      <template #reference>
        <el-link :underline="false">
          <el-icon>
            <SwitchButton/>
          </el-icon>
        </el-link>
      </template>
    </el-popconfirm>
    <!--退出系统 end-->
  </div>
</div>
  <!--tabs多标签 start-->
  <TabsView/>
  <!--tabs多标签 end-->
</template>

<style scoped>
.main {
  display: flex;
  justify-content: space-between;
  height: 70px;
  box-shadow: rgb(0 0 0 /10%) 0px 0px 10px;
  background: white;
}
.linkBox {
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  float: right;
}
.linkBox .el-link {
  margin-right: 25px;
  color: #8c8c8c;
}

.linkBox .el-link:hover {
  color:#30bcd7
}

.linkBox .el-link span {
  margin-left: 8px;
}

/*鼠标滑向头像的样式*/
.info-card img {
  width: 55px;
  margin: 0px 15px 0px 0px;
  border-radius: 50px;
  float: left;
}
.info-card p {
  margin-right: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tool-left{
  display: flex;
  align-items: center;
  height: 100%;
}
</style>