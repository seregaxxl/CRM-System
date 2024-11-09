import { ref } from 'vue'


export type TaskInfo = {
    all: number
    completed: number
    inWork: number
  }
  
export type Task = {
created: string
id: number
isDone: boolean
title: string
}
  
export type AllTasks = {
info: TaskInfo
data: Task[]
}

export const allTasks = ref<AllTasks>({
info: { all: 0, completed: 0, inWork: 0 },
data: [],
})