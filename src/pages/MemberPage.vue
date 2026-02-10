<template>
  <div class="page">
    <!-- 로그인 회원 정보 -->
    <div class="login-user-card">
      <h2>로그인 회원 정보</h2>

      <div class="login-info">
        <div class="info-row">
          <span class="label">이름</span>
          <span>{{ loginUser.name }}</span>
        </div>
        <div class="info-row">
          <span class="label">나이</span>
          <span>{{ loginUser.age }}</span>
        </div>
        <div class="info-row">
          <span class="label">성별</span>
          <span>{{ loginUser.gender }}</span>
        </div>
        <div class="info-row">
          <span class="label">주소</span>
          <span>{{ loginUser.address }}</span>
        </div>
      </div>

      <button class="withdraw-btn" @click="withdraw">회원 탈퇴</button>
    </div>

    <!-- 회원 관리 -->
    <h1>회원 관리</h1>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>나이</th>
            <th>성별</th>
            <th>주소</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.id" @click="openDetail(member)">
            <td>{{ member.id }}</td>
            <td>{{ member.name }}</td>
            <td>{{ member.age }}</td>
            <td>{{ member.gender }}</td>
            <td>{{ member.address }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 회원 상세 모달 -->
    <MemberDetailModal
      v-if="selectedMember"
      :member="selectedMember"
      @back="selectedMember = null"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MemberDetailModal from '@/components/MemberDetailModal.vue'

const router = useRouter()

/** 로그인 회원 정보 (mock) */
const loginUser = ref({
  name: '홍길동',
  age: 29,
  gender: '남',
  address: '서울시 강남구',
})

/** 회원 목록 */
const members = ref([
  { id: 1, name: '김철수', age: 32, gender: '남', address: '부산시' },
  { id: 2, name: '이영희', age: 27, gender: '여', address: '대구시' },
])

const selectedMember = ref(null)

const openDetail = (member) => {
  selectedMember.value = member
}

const withdraw = () => {
  // 실제 서비스라면 API 호출 후 이동
  alert('회원 탈퇴 처리되었습니다.')
  router.push('/login') // ✅ 수정
}
</script>

<style scoped>
.page {
  padding: 24px;
}

/* 로그인 회원 정보 카드 */
.login-user-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 32px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.login-user-card h2 {
  margin-bottom: 16px;
}

/* 세로 정렬 정보 */
.login-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.info-row {
  display: flex;
  gap: 12px;
}

.label {
  width: 60px;
  font-weight: 600;
}

/* 회원 탈퇴 버튼 */
.withdraw-btn {
  align-self: flex-start;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  background: #ef4444;
  color: white;
  cursor: pointer;
}

.withdraw-btn:hover {
  background: #dc2626;
}

/* 회원 테이블 */
.table-wrapper {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  background: #eaeaea;
  padding: 10px;
}

td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

tbody tr {
  cursor: pointer;
}

tbody tr:hover {
  background: #f0f0f0;
}
</style>
