<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['close'])

const form = reactive({
  email: '',
  password: '',
  name: '',
  age: '',
  gender: '',
  address: '',
})

function submit() {
  // 실제로는 여기서 API 호출
  console.log('회원가입 정보:', form)
  emit('close')
}

function cancel() {
  emit('close')
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2 class="title">회원가입</h2>

      <div class="form">
        <label>
          이메일
          <input type="email" v-model="form.email" />
        </label>

        <label>
          비밀번호
          <input type="password" v-model="form.password" />
        </label>

        <label>
          이름
          <input type="text" v-model="form.name" />
        </label>

        <label>
          나이
          <input type="number" v-model="form.age" />
        </label>

        <label>
          성별
          <select v-model="form.gender">
            <option disabled value="">선택</option>
            <option value="남">남</option>
            <option value="여">여</option>
          </select>
        </label>

        <label>
          주소
          <input type="text" v-model="form.address" />
        </label>
      </div>

      <div class="actions">
        <button class="btn btn-gray" @click="cancel">취소</button>
        <button class="btn btn-primary" @click="submit">등록</button>
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
  background: white;
  border-radius: 12px;
  padding: 24px;
}

.title {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
}

.form label {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  font-size: 14px;
}

.form input,
.form select {
  margin-top: 4px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
}

.form input:focus,
.form select:focus {
  outline: none;
  border-color: #2563eb;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
}

.btn {
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #2563eb;
  color: white;
}

.btn-gray {
  background: #e5e7eb;
}
</style>
