import { useMemo, useState } from "react"

import { books } from "../utilities/api"

export const useFilters = () => {

    const genres = Array.from(new Set(books.map(book => book.genre)))
    const [genre, setGenre] = useState("")

    const storage = JSON.parse(localStorage.getItem('readList'))

    const matches = useMemo(() => {
        if (!genre) return books
        return books.filter(book => {
            if (genre && book.genre !== genre) return false
            return true
        })
    }, [genre])

    const matchesReadList = useMemo(() => {
        const readListToRender = []

        storage.forEach(isbn => {
            books.forEach(book => {
                if (book.ISBN === isbn) readListToRender.push(book)
            })
        })

        if (!genre) return readListToRender
        return readListToRender.filter(book => {
            if (genre && book.genre !== genre) return false
            return true
        })
    }, [storage, genre])

    return { genres, matches, setGenre, genre, matchesReadList }
}