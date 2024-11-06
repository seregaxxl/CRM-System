import { ref } from 'vue'


type TaskInfo = {
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
  
type AllTasks = {
info: TaskInfo
tasks: Task[]
}

export const allTasks = ref<AllTasks>({
info: { all: 0, completed: 0, inWork: 0 },
tasks: [],
})