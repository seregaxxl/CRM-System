import { Filter, AllTasks } from "../types"
import axiosInstance from './axiosInstance';

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
        console.log('Fetching ')
        return data
    } catch (error) {
        console.error('Error fetching', error)
        throw error
    } 
}

export async function updateTask (id:number, changedFields : {isDone?: boolean, title?: string} ) {
    try {
       const res = await axiosInstance.put(`${PREFIX_TODOS}/${id}`, changedFields)
       console.log(res)
    } catch (error) {
        console.error('Error adding', error)
        throw error
    }
}

export async function deleteTask (id:number) {
    try {
        await axiosInstance.delete(`${PREFIX_TODOS}/${id}`)
    } catch (error) {
        console.error('Error adding', error)
        throw error
    }
}





