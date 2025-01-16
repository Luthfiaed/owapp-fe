import { IProduct } from "../ui/product-card"
import { IProfile } from "./model"

export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchProfile = async (authToken: string) => {
    let errMsg = ""
    let data: IProfile = {
        id:             0,
        username:       "",
        role:           "",
        token:         "",
        tokenExpiredAt: 0,
        avatar:         {
            String: "",
            Valid: ""
        }
    }

    try {
        const res = await fetch(`${API_URL}/api/v1/users`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        const resBody = await res.json()

        if (res.status >= 400) {
            throw new Error(resBody.error)
        }

        data = resBody
    } catch (e) {
        const err = e as Error
        errMsg = err.message
    }

    return {
        data, 
        error: errMsg
    }
}

export const fetchProduct = async (authToken: string, name?: string) => {
    let errMsg = ""
    let data: IProduct[] = []

    let resource = "/api/v1/products"
    if (name) {
        resource = resource + `?name=${name}`
    }

    try {
        const res = await fetch(`${API_URL}${resource}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        const resBody = await res.json()
        
        if (res.status >= 400) {
            throw new Error(resBody.error)
        }

        data = resBody
    } catch (e) {
        const err = e as Error
        errMsg = err.message
    }
    
    return {
        data, 
        error: errMsg
    }
}