<template>
  <div class="page">
    <h1>물건 관리</h1>

    <!-- 물건 목록 -->
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>가격</th>
            <th>유형</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" @click="openDetail(product)">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 물건 등록 버튼 -->
    <button class="add-btn" @click="openCreate">물건 등록</button>

    <!-- 물건 상세 모달 -->
    <ProductDetailModal
      v-if="modalType === 'detail'"
      :product="selectedProduct"
      @back="closeModal"
      @edit="openEdit"
    />

    <!-- 물건 등록 / 수정 모달 -->
    <ProductFormModal
      v-if="modalType === 'create' || modalType === 'edit'"
      :mode="modalType"
      :product="modalType === 'edit' ? selectedProduct : null"
      @close="closeModal"
      @submit="saveProduct"
      @delete="deleteProduct"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductDetailModal from '@/components/ProductDetailModal.vue'
import ProductFormModal from '@/components/ProductFormModal.vue'

const products = ref([
  {
    id: 1,
    name: '기타',
    price: 100000,
    description: '어쿠스틱 기타',
    type: '악기',
    createdAt: '2026-02-01',
  },
])

const selectedProduct = ref(null)
const modalType = ref(null)

/* ===== 모달 제어 ===== */

const openDetail = (product) => {
  selectedProduct.value = product
  modalType.value = 'detail'
}

const openCreate = () => {
  selectedProduct.value = null
  modalType.value = 'create'
}

const openEdit = () => {
  modalType.value = 'edit'
}

const closeModal = () => {
  selectedProduct.value = null
  modalType.value = null
}

/* ===== CRUD ===== */

const saveProduct = (data) => {
  if (modalType.value === 'edit') {
    Object.assign(selectedProduct.value, data)
  } else {
    products.value.push({
      id: Date.now(),
      createdAt: new Date().toISOString().slice(0, 10),
      ...data,
    })
  }
  closeModal()
}

const deleteProduct = () => {
  products.value = products.value.filter((p) => p.id !== selectedProduct.value.id)
  closeModal()
}
</script>

<style scoped>
.page {
  padding: 24px;
}

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
  background: #eaeaea;
  padding: 10px;
  text-align: left;
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

.add-btn {
  margin-top: 16px;
  padding: 8px 14px;
  border-radius: 6px;
  background: #2563eb;
  color: white;
  border: none;
}
</style>
