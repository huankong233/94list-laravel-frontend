<template>
  <div class="container">
    <el-card v-loading="pending">
      <h1>
        <img :src="favicon" alt="logo" />
      </h1>
      <h2>登陆 | {{ getAppName() }}</h2>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRule" label-width="auto">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" @keyup.enter="submitForm(loginFormRef)" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            @keyup.enter="submitForm(loginFormRef)"
          />
        </el-form-item>
        <el-form-item class="center">
          <el-button type="primary" @click="goRegister()">注册</el-button>
          <el-button type="primary" @click="submitForm(loginFormRef)">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import * as UserApi from '@/apis/user/user.js'
import favicon from '@/assets/image/favicon.ico'
import { getAppName, getLoginState, setLoginRole, setLoginState } from '@/utils/env.js'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
if (getLoginState() === '1') router.push('/admin')
const goRegister = () => router.push('/register')

const pending = ref(false)
const loginForm = ref({ username: '', password: '' })
const loginFormRef = ref<FormInstance | null>(null)

const loginFormRule: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const submitForm = async (formEl: FormInstance | null) => {
  if (!formEl || !(await formEl.validate())) return

  try {
    pending.value = true

    const res = await UserApi.login({
      username: loginForm.value.username,
      password: loginForm.value.password
    })

    ElMessage.success('登陆成功')
    setLoginState('1')

    const role = res.data.role
    setLoginRole(role)
    router.push(`/${role}`)
  } finally {
    pending.value = false
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 515px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h2 {
  margin: 0 0 15px 0;
}
</style>
