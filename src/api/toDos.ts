import axiosInstance from "./axiosInstance";
import { Filter, AllTasks } from "../types/tasksTypes"

const PREFIX_TODOS = '/todos'

export async function addTask (title:string) {
    try {
        await axiosInstance.post(PREFIX_TODOS, {
            isDone: false, 
            title: title
        })
    } catch (error) {
        console.error('Error adding', error)
        throw error
    }
}

export async function getAllTasks (filter:Filter): Promise<AllTasks> {
    try {
        const res = await axiosInstance.get<AllTasks>(PREFIX_TODOS, {
            params: { filter }
        });
        const data: AllTasks = res.data
        return data
    } catch (error) {
        throw error
    } 
}

export async function updateTask (id:number, changedFields : {isDone?: boolean, title?: string} ) {
    try {
       await axiosInstance.put(`${PREFIX_TODOS}/${id}`, changedFields)
    } catch (error) {
        throw error
    }
}

export async function deleteTask (id:number) {
    try {
        await axiosInstance.delete(`${PREFIX_TODOS}/${id}`)
    } catch (error) {
        throw error
    }
}