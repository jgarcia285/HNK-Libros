import booksList from '../mocks/books.json'

export const books = booksList.library.map(data => data.book)

// Objeto para almacenar metodos utiles
export const api = {
    readList: {
        // Funcion para actualizar los datos del localStorage
        update: (readList => localStorage.setItem('readList', JSON.stringify(readList))),
        // Funcion para que se sincronicen los valores de las distintas pestañas
        onChange: callback => {
            // Lee los datos de la readList y se los pasa al callback (que es basicamente setReadList)
            const getReadList = () => {
                const readList = JSON.parse(localStorage.getItem('readList') ?? "[]")

                callback(readList)
            }

            // Suscribe al evento storage y cada vez que hay un cambio en storage llama a la funcion
            // getReadList que obtiene los datos y se los pasa a readList
            window.addEventListener('storage', getReadList)

            // Llama a la funcion para que al momento que nos suscribamos obtenga los datos y se los pase al callback
            getReadList()

            // Funcion para desuscribir a este storage
            return () => window.removeEventListener('storage', getReadList)
        }
    }
}