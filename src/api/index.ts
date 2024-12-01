import { Filter, AllTasks } from "../types"
const API = 'https://easydev.club/api/v1'
const PREFIX_TODOS = '/todos'
import axios from "axios"




export async function addTask (title:string) {
    try {
        const res = await axios.post(API+PREFIX_TODOS, {
            isDone: false, 
            title: title
        })
        if (!res) throw new Error('Network response was not ok')
    } catch (error) {
        console.error('Error adding', error)
        throw error
    }
}

export async function getAllTasks (filter:Filter): Promise<AllTasks> {
    try {
        const res = await axios.get<AllTasks>(`${API}${PREFIX_TODOS}?filter=${filter}`)
        if (!res) throw new Error('Network response was not ok')
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
        const updatedFields : {isDone?:boolean, title?: string} = {}
        if (changedFields.isDone !== undefined) {
            updatedFields.isDone = changedFields.isDone
        }
        if (changedFields.title !== undefined) {
            updatedFields.title = changedFields.title
        }
        const res = await axios.put(`${API}${PREFIX_TODOS}/${id}`, updatedFields)
        if (!res) throw new Error('Network response was not ok')
    } catch (error) {
        console.error('Error adding', error)
        throw error
    }
}

export async function deleteTask (id:number) {
    try {
        const res = await axios.delete(`${API}${PREFIX_TODOS}/${id}`)
        if (!res) throw new Error('Network response was not ok')
    } catch (error) {
        console.error('Error adding', error)
        throw error
    }
}





