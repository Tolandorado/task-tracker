<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps<{ show: boolean }>();
const emit = defineEmits(['close', 'addTask']);

const isVisible = ref(props.show);
const task = ref({
  description: '',
  start_at: '',
  end_at: '',
});

watch(() => props.show, (newVal) => {
  isVisible.value = newVal;
  if (newVal) {
    // Reset form when modal opens - используем только время (HH:mm:ss)
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    task.value = {
      description: '',
      start_at: timeString,
      end_at: timeString,
    };
  }
});

const closeModal = () => {
  isVisible.value = false;
  emit('close');
};

const submitTask = () => {
  if (task.value.description && task.value.start_at && task.value.end_at) {
    // Преобразуем время (HH:mm:ss) в ISO datetime для backend, используя текущую дату
    const today = new Date();
    const [startHours, startMinutes, startSeconds = '0'] = task.value.start_at.split(':');
    const [endHours, endMinutes, endSeconds = '0'] = task.value.end_at.split(':');
    
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 
      parseInt(startHours || '0'), parseInt(startMinutes || '0'), parseInt(startSeconds || '0'));
    const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 
      parseInt(endHours || '0'), parseInt(endMinutes || '0'), parseInt(endSeconds || '0'));
    
    // Если время окончания меньше времени начала, считаем что это следующий день
    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }
    
    emit('addTask', { 
      description: task.value.description,
      start_at: startDate.toISOString(),
      end_at: endDate.toISOString()
    });
    closeModal();
  }
};
</script>

<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h2>Add Completed Task</h2>
      <form @submit.prevent="submitTask">
        <div class="form-group">
          <label for="description">Description:</label>
          <input type="text" id="description" v-model="task.description" required />
        </div>
        <div class="form-group">
          <label for="start_at">Start Time:</label>
          <input type="time" id="start_at" v-model="task.start_at" step="1" required />
        </div>
        <div class="form-group">
          <label for="end_at">End Time:</label>
          <input type="time" id="end_at" v-model="task.end_at" step="1" required />
        </div>
        <div class="modal-actions">
          <button type="submit">Add Task</button>
          <button type="button" @click="closeModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #2c2c2c;
  padding: 25px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  color: #eee;
}

.modal-content h2 {
  color: #42b983;
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="time"] {
  width: calc(100% - 22px); /* Account for padding and border */
  padding: 10px;
  border: 1px solid #555;
  border-radius: 4px;
  background-color: #333;
  color: #eee;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.modal-actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.modal-actions button[type="submit"] {
  background-color: #42b983;
  color: white;
}

.modal-actions button[type="submit"]:hover {
  background-color: #369e6b;
}

.modal-actions button[type="button"] {
  background-color: #555;
  color: white;
}

.modal-actions button[type="button"]:hover {
  background-color: #666;
}
</style>