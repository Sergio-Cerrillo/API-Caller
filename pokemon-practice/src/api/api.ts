export const fetchPokeFromApi = async (url:string) => {

    try {
        const response:Response = await fetch(url)
        const data = await response.json()
        return data

    } catch (error) {
        console.error(error)
        return []

    }

}