<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  product: Object,
  mode: String,
})

const emit = defineEmits(['close', 'submit', 'delete'])

const labelToType = (label) => {
  switch (label) {
    case "악기": return "INSTRUMENT"
    case "도서": return "BOOK"
    case "컴퓨터": return "COMPUTER"
    default: return "ETC"
  }
}

const form = reactive({
  name: '',
  description: '',
  price: '',
  type: '',
})

watch(
  () => props.product,
  (thing) => {
    if (thing) {
      thing.type = labelToType(thing.type);
      Object.assign(form, thing);
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2 class="title">
        {{ mode === 'create' ? '물건 등록' : '물건 수정' }}
      </h2>

      <!-- 게시판 스타일 폼 -->
      <form @submit.prevent="emit('submit', form)">
        <div class="form">
          <div class="form-group">
            <label>이름</label>
            <input v-model="form.name" placeholder="물건 이름을 입력하세요" required/>
          </div>

          <div class="form-group">
            <label>설명</label>
            <textarea v-model="form.description" placeholder="물건 설명을 입력하세요" />
          </div>

          <div class="form-group">
            <label>가격</label>
            <input type="number" v-model="form.price" placeholder="가격을 입력하세요" required/>
          </div>

          <div class="form-group">
            <label>물건 유형</label>
            <select v-model="form.type" required>
              <option disabled value="">선택</option>
              <option value="INSTRUMENT">악기</option>
              <option value="BOOK">도서</option>
              <option value="COMPUTER">컴퓨터</option>
              <option value="ETC">기타</option>
            </select>
          </div>
        </div>

        <!-- 버튼 영역 -->
        <div class="actions">
          <button type="button" class="btn-back" @click="emit('close')">취소</button>

          <button type="submit" class="btn-primary">
            {{ mode === 'create' ? '등록' : '수정' }}
          </button>

          <button type="button" v-if="mode === 'edit'" class="btn-danger" @click="emit('delete')">삭제</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* 오버레이 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* 모달 카드 */
.modal {
  width: 460px;
  background: #ffffff;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
}

/* 제목 */
.title {
  margin-bottom: 24px;
  font-size: 20px;
  font-weight: 600;
}

/* 게시판 폼 */
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 95%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}

.form-group textarea {
  min-height: 90px;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #2563eb;
}

/* 버튼 영역 */
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 28px;
}

.btn-back {
  padding: 8px 14px;
  border-radius: 6px;
  background: #e5e7eb;
  border: none;
  cursor: pointer;
}

.btn-back:hover {
  background: #d1d5db;
}

.btn-primary {
  padding: 8px 14px;
  border-radius: 6px;
  background: #2563eb;
  color: white;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-danger {
  padding: 8px 14px;
  border-radius: 6px;
  background: #ef4444;
  color: white;
  border: none;
  cursor: pointer;
}

.btn-danger:hover {
  background: #dc2626;
}
</style>
