import { Filter, AllTasks } from "../types/tasksTypes"
import axiosInstance from './axiosInstance';
import { UserData, LoginData } from "../types/authTypes";

const PREFIX_TODOS = '/todos'
const PREFIX_AUTH = '/auth'
const PREFIX_USR = '/user'


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

export async function signUp (userData: UserData) {
    try {
        const res = await axiosInstance.post(`${PREFIX_AUTH}/signup`, userData);
        return res
    } catch (error: any) {
        throw error
    }
}

export async function signIn (loginData: LoginData) {
    try {
        const res = await axiosInstance.post(`${PREFIX_AUTH}/signin`, loginData);
        return res
    } catch (error: any) {
        throw error
    }
}

export async function signOut (accessToken:string|null) {
    try {
        await axiosInstance.post(`${PREFIX_USR}/logout`,{},{
            headers: {
                Authorization: `Bearer ${accessToken}`,
              }
            });
        return true
    } catch (error: any) {
        throw error
    }
}



export async function refreshToken (refreshToken: string) {
    try {
        const res = await axiosInstance.post(`${PREFIX_AUTH}/refresh`, {refreshToken});
        return res
    } catch (error: any) {
        throw error
    }
}

export async function refreshProfile (accessToken: string) {
    try {
        const res = await axiosInstance.get(`${PREFIX_USR}/profile`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
              }
            });
        return res
    } catch (error: any) {
        throw error
    }
}





