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

export type Filter = 'all' | 'completed' | 'inWork'