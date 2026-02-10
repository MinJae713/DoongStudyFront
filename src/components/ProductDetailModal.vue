<script setup>
defineProps({
  product: Object,
})

defineEmits(['back', 'edit'])
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2 class="title">물건 상세 정보</h2>

      <div class="content">
        <div class="row">
          <span class="label">이름</span>
          <span>{{ product.name }}</span>
        </div>
        <div class="row">
          <span class="label">가격</span>
          <span>{{ product.price }}</span>
        </div>
        <div class="row">
          <span class="label">설명</span>
          <span>{{ product.description }}</span>
        </div>
        <div class="row">
          <span class="label">유형</span>
          <span>{{ product.type }}</span>
        </div>
        <div class="row">
          <span class="label">생성 일자</span>
          <span>{{ product.createdAt }}</span>
        </div>
      </div>

      <div class="actions">
        <button class="btn-back" @click="$emit('back')">뒤로 가기</button>
        <button class="btn-primary" @click="$emit('edit')">물건 수정</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  width: 420px;
  background: #fff;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.title {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
}

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

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
}

.btn-back {
  padding: 8px 14px;
  border-radius: 6px;
  background: #e5e7eb;
  border: none;
}

.btn-primary {
  padding: 8px 14px;
  border-radius: 6px;
  background: #2563eb;
  color: white;
  border: none;
}
</style>
