<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SignupModal from '@/components/SignupModal.vue'
import { memberApi } from '@/apis/MemberApi'

// const emit = defineEmits(['login-success'])

const email = ref('')
const password = ref('')
const showSignup = ref(false)

const router = useRouter()
const memberApiStore = memberApi();

async function login() {
  // emit('login-success')
  const loginResult = await memberApiStore.login(email.value, password.value);
  if (loginResult.apiResult) router.push('/main')
  else alert(loginResult.message);
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h2 class="title">로그인</h2>

      <div class="form">
        <input type="email" placeholder="이메일" v-model="email" />
        <input type="password" placeholder="비밀번호" v-model="password" />
      </div>

      <button class="btn-login" @click="login">로그인</button>

      <button class="btn-signup" @click="showSignup = true">회원가입</button>
    </div>

    <!-- 회원가입 모달 -->
    <SignupModal v-if="showSignup" @close="showSignup = false" />
  </div>
</template>

<style scoped>
/* 전체 페이지 */
.login-page {
  height: 100vh;
  background: #f5f6f8;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 로그인 카드 */
.login-card {
  width: 360px;
  background: #ffffff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
}

/* 제목 */
.title {
  text-align: center;
  margin-bottom: 24px;
  font-size: 22px;
  font-weight: 600;
}

/* 입력 폼 */
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.form input {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}

.form input:focus {
  outline: none;
  border-color: #2563eb;
}

/* 로그인 버튼 */
.btn-login {
  padding: 10px;
  border-radius: 6px;
  border: none;
  background: #2563eb;
  color: white;
  font-size: 15px;
  cursor: pointer;
  margin-bottom: 10px;
}

.btn-login:hover {
  background: #1d4ed8;
}

/* 회원가입 버튼 */
.btn-signup {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background: white;
  font-size: 14px;
  cursor: pointer;
}

.btn-signup:hover {
  background: #f3f4f6;
}
</style>
