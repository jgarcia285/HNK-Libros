import { useEffect, useState } from 'react'

import { api } from '../utilities/api'
import { useFilters } from '../hooks/useFilters'

export const Books = () => {

    const { genres, matches, setGenre, genre, matchesReadList } = useFilters()

    const [readList, setReadList] = useState([])
    const [list, setList] = useState(true)
    const [search, setSearch] = useState('')

    const handleBookClick = book => {
        const draft = readList.includes(book) ?
            readList.filter((readBook) => readBook !== book) :
            [...readList, book]

        setReadList(draft)
        api.readList.update(draft)
    }


    useEffect(() => {

        const unsuscribe = api.readList.onChange(setReadList)

        return () => unsuscribe()
    }, [])

    return (
        <>
            <h1>HNK Libros</h1>
            <header>
                <select value={genre} onChange={e => setGenre(e.target.value)}>
                    <option value="">Todos</option>
                    {
                        genres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))
                    }
                </select>

                <form className='form'>
                    <input placeholder='Buscar por nombre o autor...' name='query' value={search} onChange={e => setSearch(e.target.value)} />
                    <button type='submit'>Buscar</button>
                </form>

            </header>


            <div className='botones'>
                <button onClick={() => setList(true)}>Disponibles</button>
                <button onClick={() => setList(false)}>Lista de lectura</button>
            </div>
            {list === true &&

                <article>
                    <h2>Lista de disponibles({matches.length})</h2>
                    <ul className='books'>
                        {
                            matches.filter((bookSearch) => {
                                if (search == '') return bookSearch
                                else if (bookSearch.title.toLowerCase().includes(search.toLowerCase()) || bookSearch.author.name.toLowerCase().includes(search.toLowerCase())) return bookSearch

                            }).map(book => (
                                    <li key={book.ISBN} className='book' onClick={() => handleBookClick(book.ISBN)}>
                                        <h3>
                                            {readList.includes(book.ISBN) && <span> * </span>}
                                            {book.title}
                                        </h3>
                                        <h4>{book.author.name}</h4>
                                        <img src={book.cover} />
                                    </li>
                            ))
                        }
                    </ul>
                </article>
            }

            {list === false &&
                <article>
                    <h2>Lista de lectura({matchesReadList.length})</h2>

                    <ul className='books'>
                        {
                            matchesReadList.filter((bookSearch) => {
                                if (search == '') return bookSearch
                                else if (bookSearch.title.toLowerCase().includes(search.toLowerCase()) || bookSearch.author.name.toLowerCase().includes(search.toLowerCase())) return bookSearch

                            }).map(book => (
                                <li key={book.ISBN} className='book' onClick={() => handleBookClick(book.ISBN)}>
                                    <h3>
                                        {readList.includes(book.ISBN) && <span> * </span>}
                                        {book.title}
                                    </h3>
                                    <h4>{book.author.name}</h4>
                                    <img src={book.cover} />
                                </li>
                            ))
                        }
                    </ul>
                </article>
            }


        </>
    )
}