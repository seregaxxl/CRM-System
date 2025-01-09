<script setup lang="ts">
import { addTask } from '../../api/toDos';
import { reactive } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';

interface FormState {
  task: string
}

const formState = reactive<FormState>({
    task: '',
});

const rules: Record<string, Rule[]> = {
    task: [
        { min:2, max:64, message:'Lenght should be from 2 to 64', trigger: 'blur' } 
    ]
}

const emit = defineEmits(['dataUpdated'])

async function addTaskAndRefresh(title:string) {
    try {
            await addTask(title)
            formState.task = ''
            emit('dataUpdated')
        } catch (error) {
            console.error('Error saving edit:', error)
        }
}

</script>
<template>
    <a-form
        :model="formState" 
        :rules="rules"
        name="task-adder"
        class="task-adder"
        autocomplete="off"
        @finish="() => addTaskAndRefresh(formState.task)"
    >
        <a-form-item
        name="task"
        >
            <a-input
                class="add-input"
                v-model:value="formState.task"
                placeholder="Task To Be Done..."
            />
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit" class="add-button">Add</a-button>
        </a-form-item>
    </a-form>
</template>

<style scoped>
.task-adder {
    margin: auto;
    width: 260px;
    padding: 10px;
    display: flex;
}
.add-input {
    outline: 0;
    border-width: 0 0 2px;
    height: 26px;
    width: 140px;
    margin: 0 4px 0 6px;
    background-color: #F1F4F9;
    color: #2c3e50;
}
.add-button {
    height: 30px;
    width: 80px;
    background-color: #5393FF;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 4px;
    cursor: pointer;
}
.error-message {
    color: black;
}
</style>
