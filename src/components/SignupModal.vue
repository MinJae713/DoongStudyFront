<script setup>
import { memberApi } from '@/apis/MemberApi';
import { reactive } from 'vue'

const emit = defineEmits(['close'])
const memberApiStore = memberApi();

const form = reactive({
  email: '',
  password: '',
  name: '',
  age: '',
  gender: '',
  address: '',
})

async function submit() {
  // 실제로는 여기서 API 호출
  const response = await memberApiStore.register(form);
  if (response.apiResult) {
    alert("회원가입이 완료되었습니다!");
    emit('close');
  } else alert(response.data.message);
}

function cancel() {
  emit('close')
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2 class="title">회원가입</h2>

      <!-- form으로 감싸기 -->
      <form class="form" @submit.prevent="submit">
        <label>
          이메일
          <input type="email" v-model="form.email" required />
        </label>

        <label>
          비밀번호
          <input type="password" v-model="form.password" required />
        </label>

        <label>
          이름
          <input type="text" v-model="form.name" required />
        </label>

        <label>
          나이
          <input type="number" v-model="form.age" />
        </label>

        <label>
          성별
          <select v-model="form.gender" required >
            <option disabled value="">선택</option>
            <option value="MALE">남</option>
            <option value="FEMALE">여</option>
          </select>
        </label>

        <label>
          주소
          <input type="text" v-model="form.address" />
        </label>

        <div class="actions">
          <button type="button" class="btn btn-gray" @click="cancel">
            취소
          </button>
          <button type="submit" class="btn btn-primary">
            등록
          </button>
        </div>
      </form>
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
