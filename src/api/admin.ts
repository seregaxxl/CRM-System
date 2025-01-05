import axiosInstance from "./axiosInstance";
import { SearchData } from "../types/authTypes";


const PREFIX_ADMIN = '/admin'




export async function getAllUsers () {
    try {
        const res = await axiosInstance.get(`${PREFIX_ADMIN}/users`,);
        return res.data
    } catch (error: any) {
        throw error
    }
}

export async function getSortedUsers (params?:SearchData) {
    try {
        const res = await axiosInstance.get(`${PREFIX_ADMIN}/users`, {
            params: params,
        });
        console.log(res)
        return res.data
    } catch (error: any) {
        throw error
    }
}

export async function deleteUser (id:number) :Promise<void> {
    try {
        await axiosInstance.delete(`${PREFIX_ADMIN}/users/${id}`);
    } catch (error: any) {
        throw error
    }
}

export async function updateUser (id:number, userData:{username?:string,email?:string, phoneNumber?:string,isAdmin?:boolean, block?: 'block'|'unblock'}):Promise<void> {
    if (userData.isAdmin !== undefined) {
        adminRights(id,userData.isAdmin)
    } else if (userData.block !== undefined) {
        blockUnblockUser(id,userData.block)
    } else {
        changeUserData(id,userData)
    }
}

export async function changeUserData (id:number, userData:{username?:string,email?:string, phoneNumber?:string}):Promise<void> {
    try {
        await axiosInstance.put(`${PREFIX_ADMIN}/users/${id}`, userData);
    } catch (error: any) {
        throw error
    }
}

export async function blockUnblockUser (id:number, block:'block'|'unblock'):Promise<void> {
    try {
        const res = await axiosInstance.post(`${PREFIX_ADMIN}/users/${id}/${block}`);
        console.log(res)
    } catch (error: any) {
        throw error
    }
}

export async function adminRights (id:number,isAdmin:boolean):Promise<void> {
    try {
        await axiosInstance.post(`${PREFIX_ADMIN}/users/${id}/rights`,{
            field: 'isAdmin',
            value: isAdmin
        });
    } catch (error: any) {
        throw error
    }
}
