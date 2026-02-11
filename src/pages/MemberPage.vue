<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import MemberDetailModal from '@/components/MemberDetailModal.vue'
import { memberStore } from '@/stores/MemberStore'
import { memberApi } from '@/apis/MemberApi'

const router = useRouter()
const memberApiStore = memberApi();
const memberDataStore = memberStore();

onMounted(() => {
  setLoginMember();
  setMembers();
});

const genderLabel = (gender) => {
  switch (gender) {
    case "MALE": return "남자"
    case "FEMALE": return "남자"
    default: return "-"
  }
}

const setLoginMember = async () => {
  const response = await memberApiStore.getMemberById(memberDataStore.loginMemberId);
  memberDataStore.setLoginMember({
    name: response.name ? response.name : "-",
    age: response.age ? response.age : "-",
    gender: response.gender ? genderLabel(response.gender) : "-",
    address: response.address ? response.address : "-",
  })
}

/** 회원 목록 */
const setMembers = async () => {
  const response = await memberApiStore.getMembers();
  let memberList = [];
  response.map(member => {
    return {
      id: member.memberId,
      name: member.name ? member.name : "-",
      age: member.age ? member.age : "-",
      gender: member.gender ? genderLabel(member.gender) : "-",
      address: member.address ? member.address : "-"
    };
  }).forEach(member => memberList.push(member));
  memberDataStore.setMembers(memberList);
}

const openDetail = async (member) => {
  const response = await memberApiStore.getMemberById(member.id);
  memberDataStore.setSelectedMember({
    id: response.memberId,
    name: response.name ? response.name : "-",
    age: response.age ? response.age : "-",
    gender: response.gender ? genderLabel(response.gender) : "-",
    address: response.address ? response.address : "-",
    email: response.email ? response.email : "-",
    createdAt: response.createdAt ? response.createdAt : "-"
  })
}

const logout = () => {
  alert("로그아웃 API 구현 예정");
  clearPage();
}

const withdraw = async () => {
  // 실제 서비스라면 API 호출 후 이동;
  if (!confirm("정말 탈퇴하겠습니까?")) return;
  const response = 
    await memberApiStore.deleteMember(
      memberDataStore.loginMemberId);
  if (response && response.apiResult) {
    alert('회원 탈퇴 처리되었습니다.');
    clearPage();
  }
}
const clearPage = () => {
  memberDataStore.setLoginMemberId(null);
  memberDataStore.setLoginMember({});
  memberDataStore.setMembers([]);
  router.push('/') // ✅ 수정
}
</script>

<template>
  <div class="page">
    <!-- 로그인 회원 정보 -->
    <div class="login-user-card">
      <h2>로그인 회원 정보</h2>

      <div class="login-info">
        <div class="info-row">
          <span class="label">이름</span>
          <span>{{ memberDataStore.loginMember.name }}</span>
        </div>
        <div class="info-row">
          <span class="label">나이</span>
          <span>{{ memberDataStore.loginMember.age }}</span>
        </div>
        <div class="info-row">
          <span class="label">성별</span>
          <span>{{ memberDataStore.loginMember.gender }}</span>
        </div>
        <div class="info-row">
          <span class="label">주소</span>
          <span>{{ memberDataStore.loginMember.address }}</span>
        </div>
      </div>
      <button class="logout-btn" @click="logout">로그아웃</button>
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
          <tr v-for="member in memberDataStore.members" :key="member.id" @click="openDetail(member)">
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
      v-if="memberDataStore.selectedMember"
      :member="memberDataStore.selectedMember"
      @back="memberDataStore.setSelectedMember(null)"
    />
  </div>
</template>

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
.logout-btn {
  align-self: flex-start;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  background: #ef4444;
  color: white;
  cursor: pointer;
  margin-right: 10px;
}

.logout-btn:hover {
  background: peru;
}

.withdraw-btn {
  align-self: flex-start;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  background: #000000;
  color: white;
  cursor: pointer;
}

.withdraw-btn:hover {
  background: purple;
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
