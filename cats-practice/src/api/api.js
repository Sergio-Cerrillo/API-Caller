export const fetchImagesFromApi = async () => {
    const apiUrl = process.env.REACT_APP_API_URL
    const apiKey = process.env.REACT_APP_API_KEY
    try {
        const options = {
            method: 'GET',
            headers: {
                'x-api-key': apiKey
            }
        }
        const response = await fetch(apiUrl, options)
        const data = await response.json()
        return { data }

    } catch (error) {
        return { data: null, error }
    }

}