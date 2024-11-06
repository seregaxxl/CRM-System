import { isLoading } from '../store/loadingEventBus'
import { allTasks } from '../store/allTasksBus'
const api = 'https://easydev.club/api/v1/todos'



export async function addTask (title:string) {
    isLoading.value = true 
    try {
        const res = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isDone: false, title: title
            })
        })
        if (!res.ok) throw new Error('Network response was not ok')
    } catch (error) {
        console.error('Error adding', error)
        throw error
    } finally {
        isLoading.value = false
    }
}

export async function getAllTasks (filter:string) {
    try {
        const res = await fetch(`${api}?filter=${filter}`)
        if (!res.ok) throw new Error('Network response was not ok')
        const data = await res.json()
        allTasks.value.info = data.info
        allTasks.value.tasks = data.data.map((item:{
            created:string;
            id: number;
            isDone: boolean;
            title: string
        }) => ({
        created: item.created,
        id: item.id,
        isDone: item.isDone,
        title: item.title
        }))
        console.log('Fetching ', allTasks)
        isLoading.value = false
    } catch (error) {
        console.error('Error fetching', error)
        throw error
    } 
}

export async function updateTask (id:number, isDone?: boolean, title?: string ) {
    isLoading.value = true 
    try {
        const updatedFields : {isDone?:boolean, title?: string} = {}
        if (isDone !== undefined) {
            updatedFields.isDone = isDone
        }
        if (title !== undefined) {
            updatedFields.title = title
        }
        const res = await fetch(`${api}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFields)
        })
        if (!res.ok) throw new Error('Network response was not ok')
    } catch (error) {
        console.error('Error adding', error)
        throw error
    }
}

export async function deleteTask (id:number) {
    try {
        const res = await fetch(`${api}/${id}`, {
        method: 'DELETE'
        })
        if (!res.ok) throw new Error('Network response was not ok')
    } catch (error) {
        console.error('Error adding', error)
        throw error
    }
}





