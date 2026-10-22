<script setup>
import { ref, onMounted } from 'vue'
import { getProyek } from './api.js'

const dramaList = ref([])

onMounted(async () => {
  dramaList.value = await getProyek()
})
</script>

<template>
  <div class="app-container">
    <header class="header">
      <h1>Chelsy Dramaland</h1>
    </header>

    <main class="main-content">
      <div class="grid-container">
        <div 
          v-for="item in dramaList" 
          :key="item.id" 
          class="card"
        >
          <img :src="item.gambar" :alt="item.judul" class="card-img" />
          <h3>{{ item.judul }}</h3>
          <p>Genre: {{ item.genre }}</p>
          <p>Rating: {{ item.rating }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  padding: 20px;
  font-family: sans-serif;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  background: #fff;
  text-align: center;
}

.card-img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 6px;
}
</style>