<template>
  <el-card class="box-card" v-if="getLoginState() === '1'">
    <h2>
      后台控制中心 | {{ getAppName() }}
      <el-button type="primary" @click="router.push('/')">回到首页</el-button>
      <el-button type="danger" @click="mainStore.logout()">退出登陆</el-button>
    </h2>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基础配置" name="changeMainConfig">
        <ChangeMainConfig Mode="main" />
      </el-tab-pane>
      <el-tab-pane label="解析配置" name="changeParseConfig">
        <ChangeMainConfig Mode="parse" />
      </el-tab-pane>
      <el-tab-pane label="邮件配置" name="changeMailConfig">
        <ChangeMailConfig />
      </el-tab-pane>
      <el-tab-pane label="用户管理" name="userManagement">
        <UserManagement />
      </el-tab-pane>
      <el-tab-pane label="用户组管理" name="groupManagement">
        <GroupManagement />
      </el-tab-pane>
      <el-tab-pane label="邀请码管理" name="invCodeManagement">
        <InvCodeManagement />
      </el-tab-pane>
      <el-tab-pane label="卡密管理" name="tokenManagement">
        <TokenManagement />
      </el-tab-pane>
      <el-tab-pane label="账号管理" name="accountManagement">
        <AccountManagement />
      </el-tab-pane>
      <el-tab-pane label="记录管理" name="recordManagement">
        <RecordManagement />
      </el-tab-pane>
      <el-tab-pane label="IP管理" name="ipManagement">
        <IpManagement />
      </el-tab-pane>
      <el-tab-pane label="开源说明" name="openSourceNotice">
        <el-card>
          <el-text>
            项目所涉及的接口均为官方开放接口，需使用正版 SVIP
            会员账号进行代理提取高速链接，无破坏官方接口行为，本身不存在违法。
            仅供自己参考学习使用。诺违规使用官方会限制或封禁你的账号，包括你的
            IP，如无官方授权进行商业用途会对你造成更严重后果。
            源码仅供学习，如无视声明使用产生正负面结果(限速，被封等)都与作者无关。
          </el-text>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/stores/mainStore.js'
import { getAppName, getLoginRole, getLoginState } from '@/utils/env.js'
import { defineAsyncComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

const mainStore = useMainStore()

const ChangeMainConfig = defineAsyncComponent(
  () => import('@/components/AdminView/Config/ChangeMainConfig.vue')
)

const ChangeMailConfig = defineAsyncComponent(
  () => import('@/components/AdminView/Config/ChangeMailConfig.vue')
)

const UserManagement = defineAsyncComponent(
  () => import('@/components/AdminView/User/UserManagement.vue')
)

const InvCodeManagement = defineAsyncComponent(
  () => import('@/components/AdminView/InvCode/InvCodeManagement.vue')
)

const TokenManagement = defineAsyncComponent(
  () => import('@/components/AdminView/Token/TokenManagement.vue')
)

const GroupManagement = defineAsyncComponent(
  () => import('@/components/AdminView/Group/GroupManagement.vue')
)

const AccountManagement = defineAsyncComponent(
  () => import('@/components/AdminView/Account/AccountManagement.vue')
)

const RecordManagement = defineAsyncComponent(
  () => import('@/components/AdminView/Record/RecordManagement.vue')
)

const IpManagement = defineAsyncComponent(
  () => import('@/components/AdminView/Ip/IpManagement.vue')
)

const activeName = ref('changeMainConfig')
const router = useRouter()

if (getLoginState() === '0') router.push('/login')
if (getLoginRole() === 'user') router.push('/user')
</script>

<style lang="scss" scoped></style>
