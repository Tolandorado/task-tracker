<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TaskInput from './components/TaskInput.vue';
import ActiveTaskItem from './components/ActiveTaskItem.vue';
import CompletedTaskItem from './components/CompletedTaskItem.vue';
import AddCompletedTaskModal from './components/AddCompletedTaskModal.vue';
import { fetchTasks, addCompletedTask, createTask, stopTask } from './api';

interface Task {
  id: string;
  description: string;
  start_at: string;
  end_at: string | null;
  status: 'active' | 'done';
}

const activeTasks = ref<Task[]>([]);
const completedTasks = ref<Task[]>([]);
const showAddCompletedTaskModal = ref(false);

const refreshTasks = async () => {
  try {
    const response = await fetchTasks();
    activeTasks.value = response.data.filter((task: Task) => task.status === 'active');
    completedTasks.value = response.data.filter((task: Task) => task.status === 'done');
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

onMounted(refreshTasks);

const openAddCompletedTaskModal = () => {
  showAddCompletedTaskModal.value = true;
};

const closeAddCompletedTaskModal = () => {
  showAddCompletedTaskModal.value = false;
};

const handleAddCompletedTask = async (newTask: any) => {
  try {
    await addCompletedTask(newTask);
    await refreshTasks();
  } catch (error) {
    console.error('Error adding completed task:', error);
  }
};

const handleCreateTask = async (description: string) => {
  try {
    await createTask(description);
    await refreshTasks();
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

const handleStopTask = async (id: string) => {
  try {
    await stopTask(id);
    await refreshTasks();
  } catch (error) {
    console.error('Error stopping task:', error);
  }
};
</script>

<template>
  <div id="app" class="dark-theme">
    <header>
      <h1>Time Tracker</h1>
    </header>
    <main>
      <TaskInput @create-task="handleCreateTask" />
      <button @click="openAddCompletedTaskModal" class="add-completed-task-button">+ Add Completed Task</button>
      <div v-if="activeTasks.length > 0">
        <h2>Active Tasks</h2>
        <ActiveTaskItem v-for="task in activeTasks" :key="task.id" :task="task" @stop-task="handleStopTask" />
      </div>
      <div v-if="completedTasks.length > 0">
        <h2>Completed Tasks</h2>
        <CompletedTaskItem v-for="task in completedTasks" :key="task.id" :task="task" />
      </div>
      <AddCompletedTaskModal
        :show="showAddCompletedTaskModal"
        @close="closeAddCompletedTaskModal"
        @add-task="handleAddCompletedTask"
      />
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.dark-theme {
  background-color: #1a1a1a;
  color: #ffffff;
  min-height: 100vh;
  padding: 20px;
}

.dark-theme header {
  text-align: center;
  margin-bottom: 30px;
}

.dark-theme h1 {
  color: #42b983;
}

.add-completed-task-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.add-completed-task-button:hover {
  background-color: #369e6b;
}
</style>
