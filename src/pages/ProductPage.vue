<script setup>
import { onMounted } from 'vue'
import ProductDetailModal from '@/components/ProductDetailModal.vue'
import ProductFormModal from '@/components/ProductFormModal.vue'
import { thingStore } from '@/stores/ThingStore';

const thingDataStore = thingStore();

onMounted(() => {
  thingDataStore.resetThings();
});

const onModalOpen = (thing) => {
  thingDataStore.openDetail(thing);
}

</script>

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
            <th>소유주</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="thing in thingDataStore.things" 
            :key="thing.id" @click="onModalOpen(thing)">
            <td>{{ thing.id }}</td>
            <td>{{ thing.name }}</td>
            <td>{{ thing.price }}</td>
            <td>{{ thing.type }}</td>
            <td>{{ thing.ownerName }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 물건 등록 버튼 -->
    <button class="add-btn" @click="thingDataStore.openCreate">물건 등록</button>

    <!-- 물건 상세 모달 -->
    <ProductDetailModal
      v-if="thingDataStore.modalType === 'detail'"
      :product="thingDataStore.selectedThing"
      @back="thingDataStore.closeModal"
      @edit="thingDataStore.openEdit"
    />

    <!-- 물건 등록 / 수정 모달 -->
    <ProductFormModal
      v-if="thingDataStore.modalType === 'create' || thingDataStore.modalType === 'edit'"
      :mode="thingDataStore.modalType"
      :product="thingDataStore.modalType === 'edit' ? 
        thingDataStore.selectedThing : null"
      @close="thingDataStore.closeModal"
      @submit="thingDataStore.saveProduct"
      @delete="thingDataStore.deleteProduct"
    />
  </div>
</template>

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

.add-btn:hover {
  background: #1d4ed8;
}
</style>
