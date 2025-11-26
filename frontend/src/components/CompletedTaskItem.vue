<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { formatTimeToMinute, formatTimeWithSeconds } from '../utils/timeFormatter';

interface Task {
  id: string;
  description: string;
  start_at: string;
  end_at: string | null;
  status: 'active' | 'done';
}

const props = defineProps<{ task: Task }>();

const formattedTimeRange = computed(() => {
  const start = new Date(props.task.start_at);
  const end = props.task.end_at ? new Date(props.task.end_at) : new Date();
  return `${formatTimeToMinute(start)} - ${formatTimeToMinute(end)}`;
});

const formattedDuration = computed(() => {
  const start = new Date(props.task.start_at).getTime();
  const end = props.task.end_at ? new Date(props.task.end_at).getTime() : new Date().getTime();
  const durationSeconds = Math.floor((end - start) / 1000);
  return formatTimeWithSeconds(durationSeconds);
});
</script>

<template>
  <div class="completed-task-item">
    <div class="task-details">
      <span class="task-description">{{ task.description }}</span>
      <span class="task-time-range">{{ formattedTimeRange }} {{ formattedDuration }}</span>
    </div>
  </div>
</template>

<style scoped>
.completed-task-item {
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

.task-time-range {
  font-size: 0.9em;
  color: #aaa;
}
</style>