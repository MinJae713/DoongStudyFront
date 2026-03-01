<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SignupModal from '@/components/SignupModal.vue'
import { memberApi } from '@/apis/MemberApi'
import { memberStore } from '@/stores/MemberStore'

const email = ref('')
const password = ref('')
const showSignup = ref(false)

const router = useRouter()
const memberApiStore = memberApi()
const memberDataStore = memberStore();

async function login() {
  try {
    const loginResult = await memberApiStore.login(email.value, password.value);
    const localStorage = window.localStorage;
    if (loginResult) {
      alert(`${loginResult.name}님 환영합니다!`);
      memberDataStore.setLoginMemberId(loginResult.memberId);
      localStorage.setItem("accessToken", "Bearer "+loginResult.accessToken);
      localStorage.setItem("refreshToken", loginResult.refreshToken);
      router.push('/main');
    }
    else alert(loginResult.message);
  } catch (e) {
    alert('이메일 혹은 비밀번호가 일치하지 않습니다');
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h2 class="title">나의 아주 작은 서비스</h2>

      <form @submit.prevent="login">
        <div class="form">
          <input
            type="email"
            placeholder="이메일"
            v-model="email"
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            v-model="password"
            required
          />
        </div>

        <!-- 버튼 그룹 -->
        <div class="button-group">
          <button type="submit" class="btn-login">로그인</button>
          <button
            type="button"
            class="btn-signup"
            @click="showSignup = true"
          >
            회원가입
          </button>
        </div>
      </form>
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

/* 버튼 그룹 */
.button-group {
  display: flex;
  gap: 10px;
}

/* 공통 버튼 */
.btn-login,
.btn-signup {
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
}

/* 로그인 버튼 */
.btn-login {
  border: none;
  background: #2563eb;
  color: white;
}

.btn-login:hover {
  background: #1d4ed8;
}

/* 회원가입 버튼 */
.btn-signup {
  border: 1px solid #d1d5db;
  background: white;
  font-size: 14px;
}

.btn-signup:hover {
  background: #f3f4f6;
}
</style>
