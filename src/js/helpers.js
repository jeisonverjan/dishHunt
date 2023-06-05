import { TIMEOUT_SEC } from "./config"

const timeout = (seconds) => {
    return new Promise(function (_, reject) {
        setTimeout(() => {
            reject(new Error(`Request took too long! Timeout after ${seconds} seconds`))
        }, seconds * 1000)
    })
}

export const AJAX = async (url, uploadData = undefined) => {
    try {
        const fetchPro = uploadData ? fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData)
        }) : fetch(url)

        const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
        const data = await response.json()
        if (!response.ok) throw new Error(`${data.message} ${response.status}`)
        return data
    } catch (error) {
        throw error
    }
}
