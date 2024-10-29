<script setup lang="ts">
import {SwitchButton} from "@element-plus/icons-vue"
import CollapseIcon from "@/views/system/layout/header/CollapseIcon.vue"
</script>

<template>
<div class="main">
  <div class="tool-left">
    <CollapseIcon/>
  </div>
  <div class="linkBox">
    <!--登录用户信息 start-->
    <el-popover :width="300">
      <!--用户头像 start-->
      <template #reference>
        <el-link :underline="false">
          <img src="@/assets/default_avatar.png" style="width:40px;border-radius: 50px"/>
          <span>Admin</span>
        </el-link>
      </template>
      <!--用户头像 end-->
      <!--用户信息 start-->
      <template #default>
        <div style="display: flex;gap: 16px;flex-direction: column">
          <div class="info-card">
            <!--用户头像-->
            <img src="@/assets/default_avatar.png" style="width:40px;border-radius: 50px"/>
            <p>用户名：Admin</p>
            <p>Email:test@testmail.com</p>
            <p>注册时间：2024-10-28</p>
          </div>
          <div class="info-card-desc" style="margin: 0">
            <div style="float: left;width: 75px;padding: 10px;border-right: 1px;text-align: center">
              <p>待定内容</p>
            </div>
          </div>
        </div>
      </template>
      <!--用户信息 end-->
    </el-popover>
    <!--登录用户信息 end-->

    <!--退出系统 start-->
    <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" icon="SwitchButton"
    icon-color="#30bcd7" title="确认退出系统吗？">
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
</template>

<style scoped>
.main {
  height: 70px;
  box-shadow: rgba(0 0 0 /10%) 0px 0px 10px;
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
.main {
  display: flex;
  justify-content: space-between;
  height: 70px;
  box-shadow: rgb(0 0 0 /10%) 0px 0px 10px;
  background: white;
}
</style>