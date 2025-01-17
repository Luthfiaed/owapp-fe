'use server'

import { cookies } from "next/headers"
import { API_URL } from "./query"
import { revalidatePath } from "next/cache"

export interface ILoginForm {
    username: string,
    password: string,
    success: boolean,
    message: string
}

export async function authenticate(
    prevState: ILoginForm,
    formData: FormData
) {
    const data = {
        username: formData.get("username") as string,
        password: formData.get("password") as string
    }

    try {
        const res = await fetch(`${API_URL}/api/v1/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const body = await res.json()

        if (res.status >= 400) {
            throw new Error(body.error)
        }

        const cookieStore = await cookies()
        cookieStore.set('access_token', body.access_token)

        return {
            username: data.username,
            password: data.password,
            success: true,
            initial: false,
            message: "Success login"
        }

    } catch (e) {
        const err = e as Error
        console.log("error login: ", err)
        return {
            username: prevState.username,
            password: prevState.password,
            success: false,
            initial: false,
            message: err.message
        }
    }
}

export interface IFormState {
    username: string;
    password: string;
    role: string;
    message: string;
    success: boolean;
    isInitial: boolean;
}

export async function register(
    prevState: IFormState,
    formData: FormData
) {
    try {
        const temp = {
            username: formData.get("username") as string,
            password: formData.get("password") as string,
            role: formData.get("role") as string
        }
        const res = await fetch(`${API_URL}/api/v1/users`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(temp)
        })
        const body = await res.json()
        if (res.status >= 400) {
            throw new Error(body.error)
        }
        return {
            username: temp.username,
            password: temp.password,
            role: temp.role,
            success: true,
            message: "Success register new user",
            isInitial: false,
        }
    } catch (e) {
        const err = e as Error
        console.log("error register new user: ", err)
        return {
            username: prevState.username,
            password: prevState.password,
            role: prevState.role,
            success: false,
            message: err.message,
            isInitial: false,
        }
    }
}

interface IAvatarState {
    success: boolean,
    message: string
    initial: boolean
}

export async function uploadAvatar(
    prevState: IAvatarState,
    formData: FormData
) {
    const reqBody = new FormData()
    reqBody.append("file", formData.get("avatar") as Blob)
    try {
        const res = await fetch(`${API_URL}/api/v1/avatar`, {
            method: "POST",
            body: reqBody
        })
        const body = await res.json()
        if (res.status >= 400) {
            throw new Error(body.error)
        }
        return {
            success: true,
            message: "Success uploading file",
            initial: false
        }
    } catch (e) {
        const err = e as Error
        console.log("error upload avatar: ", err)
        return {
            success: false,
            message: err.message,
            initial: false
        }
    }
}

export interface IReviewForm {
    productId: string,
    review: string,
    success: boolean,
    message: string
}

export const submitReview = async (prevState: IReviewForm, formData: FormData) => {
    let msg = ""
    let isSuccess = false
    const resource = "/api/v1/products/review"

    const data = {
        productId: formData.get("productId") as string,
        review: formData.get("review") as string
    }

    const cookieStore = await cookies()
    const authToken = cookieStore.get("access_token")?.value

    try {
        const res = await fetch(`${API_URL}${resource}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(data)
          });
          const resBody = await res.json()
          if (res.status >= 400) {
            throw new Error(resBody.error)
          }
          msg = resBody.message
          isSuccess = true
    } catch (e) {
        const err = e as Error
        console.log("error submit review: ", err)
        msg = err.message
    }

    revalidatePath(`/products/${data.productId}`)

    return {
        success: isSuccess,
        message: msg,
        review: data.review,
        productId: data.productId
    }
}