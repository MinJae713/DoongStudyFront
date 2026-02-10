<script setup>
const props = defineProps({
  member: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['back'])
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2 class="title">회원 상세 정보</h2>

      <div class="content">
        <div class="row">
          <span class="label">이름</span>
          <span>{{ member.name }}</span>
        </div>
        <div class="row">
          <span class="label">나이</span>
          <span>{{ member.age }}</span>
        </div>
        <div class="row">
          <span class="label">성별</span>
          <span>{{ member.gender }}</span>
        </div>
        <div class="row">
          <span class="label">주소</span>
          <span>{{ member.address }}</span>
        </div>
        <div class="row">
          <span class="label">이메일</span>
          <span>{{ member.email }}</span>
        </div>
        <div class="row">
          <span class="label">생성 일자</span>
          <span>{{ member.createdAt }}</span>
        </div>
      </div>

      <div class="actions">
        <button class="btn-back" @click="emit('back')">뒤로 가기</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 오버레이 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* 모달 카드 */
.modal {
  width: 420px;
  background: #ffffff;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.title {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
}

/* 내용 */
.content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.row {
  display: flex;
  gap: 12px;
}

.label {
  width: 80px;
  font-weight: 600;
  color: #555;
}

/* 하단 버튼 */
.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

.btn-back {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  background: #e5e7eb;
  cursor: pointer;
}

.btn-back:hover {
  background: #d1d5db;
}
</style>
