const loadBooks = (booksArray)=> {
    let cadena = '';
    for (u in booksArray){
        cadena += `\nId: ${booksArray[u].id} - Nombre: ${booksArray[u].name} - Autor: ${booksArray[u].author}`;
    }
    return cadena;
}

const showBook = (booksArray, id) => {
    let show = ''
    for (u in booksArray) {
        if (booksArray[u].id == id) {
            show += `Id: ${booksArray[u].id} - Nombre: ${booksArray[u].name} - Autor: ${booksArray[u].author}`;
        }
    }
    return show
}

module.exports = {showBook, loadBooks}