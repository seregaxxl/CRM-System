const api = 'https://easydev.club/api/v1'
const todos = '/todos'



export async function addTask (title:string) {
    try {
        const res = await fetch(api+todos, {
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
    }
}

export async function getAllTasks (filter:string) {
    try {
        const res = await fetch(`${api}${todos}?filter=${filter}`)
        if (!res.ok) throw new Error('Network response was not ok')
        const data = await res.json()
        console.log('Fetching ')
        return data
    } catch (error) {
        console.error('Error fetching', error)
        throw error
    } 
}

export async function updateTask (id:number, isDone?: boolean, title?: string ) {
    try {
        const updatedFields : {isDone?:boolean, title?: string} = {}
        if (isDone !== undefined) {
            updatedFields.isDone = isDone
        }
        if (title !== undefined) {
            updatedFields.title = title
        }
        const res = await fetch(`${api}${todos}/${id}`, {
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
        const res = await fetch(`${api}${todos}/${id}`, {
        method: 'DELETE'
        })
        if (!res.ok) throw new Error('Network response was not ok')
    } catch (error) {
        console.error('Error adding', error)
        throw error
    }
}





