<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineProps, defineEmits } from 'vue';
import { formatTimeWithSeconds } from '../utils/timeFormatter';

interface Task {
  id: string;
  description: string;
  start_at: string;
  end_at: string | null;
  status: 'active' | 'done';
}

const props = defineProps<{ task: Task }>();
const emit = defineEmits(['stop-task']);

const elapsedTime = ref(0);
let timer: number | undefined;

const calculateElapsedTime = () => {
  const start = new Date(props.task.start_at).getTime();
  const now = new Date().getTime();
  elapsedTime.value = Math.floor((now - start) / 1000); // in seconds
};

const formattedTime = computed(() => {
  return formatTimeWithSeconds(elapsedTime.value);
});

const stopTask = () => {
  emit('stop-task', props.task.id);
};

onMounted(() => {
  calculateElapsedTime();
  timer = setInterval(calculateElapsedTime, 1000); // обновляем каждую секунду
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<template>
  <div class="active-task-item">
    <div class="task-details">
      <span class="task-description">{{ task.description }}</span>
      <span class="task-time">{{ formattedTime }}</span>
    </div>
    <button @click="stopTask">Stop</button>
  </div>
</template>

<style scoped>
.active-task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c2c2c;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.task-details {
  display: flex;
  flex-direction: column;
}

.task-description {
  font-weight: bold;
  margin-bottom: 5px;
}

.task-time {
  font-size: 0.9em;
  color: #aaa;
}

.active-task-item button {
  padding: 8px 12px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.active-task-item button:hover {
  background-color: #c0392b;
}
</style>