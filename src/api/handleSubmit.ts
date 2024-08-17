import axios from 'axios'
import { toast } from 'sonner'

export const postRequest = async (body: RequestBody) => {
    let attempts = 1
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    while (attempts <= 3) {
        try {
            const response = await axios.post<{ json: RequestBody }>('https://httpbin.org/post', body)
            if (response.status === 200) {
                return response.data.json.isTicketWon
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(`Попытка ${attempts}: ${error.message}`)
                await delay(2000)
            }
        }
        attempts++
    }

    toast.error('Не удалось получить ответ 200 OK после 3 попыток.')
    return null
}


export type RequestBody = {
    selectedNumber: {
        firstField: number[],
        secondField: number[],
    },
    isTicketWon: boolean
}