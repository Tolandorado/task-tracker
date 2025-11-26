<template>
  <div class="task-input">
    <input
      type="text"
      v-model="newTaskDescription"
      @keyup.enter="addTask"
      placeholder="What are you working on?"
    />
    <button @click="addTask">Start</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const newTaskDescription = ref('');
const emit = defineEmits(['create-task']);

const addTask = () => {
  if (newTaskDescription.value.trim()) {
    emit('create-task', newTaskDescription.value);
    newTaskDescription.value = '';
  }
};
</script>

<style scoped>
.task-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.task-input input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #333;
  color: #eee;
}

.task-input button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.task-input button:hover {
  background-color: #369e6b;
}
</style>