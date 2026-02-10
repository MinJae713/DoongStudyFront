<script setup>
import { ref } from 'vue'
import MemberPage from './MemberPage.vue'
import ProductPage from './ProductPage.vue'

const emit = defineEmits(['logout'])
const tab = ref('member')
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <h2 class="logo">My Service</h2>
      <ul>
        <li @click="tab = 'member'">회원 관리</li>
        <li @click="tab = 'product'">물건 관리</li>
      </ul>
    </aside>

    <main class="content">
      <MemberPage v-if="tab === 'member'" />
      <ProductPage v-if="tab === 'product'" />
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: 'Pretendard', sans-serif;
  background: #f4f6f8;
}

.layout {
  display: flex;
  height: 100vh;
}

/* 사이드바 */
.sidebar {
  width: 220px;
  background: #1f2937;
  color: white;
  padding: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 12px;
  cursor: pointer;
  border-radius: 6px;
}

.sidebar li:hover {
  background: #374151;
}

/* 메인 영역 */
.content {
  flex: 1;
  padding: 24px;
}
</style>
