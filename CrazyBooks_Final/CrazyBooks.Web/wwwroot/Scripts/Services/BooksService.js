/// <reference path="../home/rooms/roomsviewmodel.js" />
class BooksService extends CrudService
{
    constructor($http, $window)
    {
        super($http, $window, 'books');
        this.Http = $http;
        this.Books = 'books';
    }

    GetAllBooksAsync()
    {
        return this.GetAll(this.Books);
    }
    GetBookByIdAsync(books) {
        return this.GetByIdAsync(books);
    }
    GetBooksByMultipleIds(ids) {
        let multipleIds = ids;

        let promises = multipleIds.map((v) => {
            return this.Http.get(this.Url + v)
        });
    }
    AddBookAsync(model) {
        return this.AddAsync(model);
    }
    UpdateBookAsync(model) {
        return this.PutAsync(model);
    }
    DeleteBookAsync(model) {
        return this.Delete(model);
    }
}

// esto le dice a Angular que creamos un service que se llama $BooksService
// para que lo inyecte 
app.service('$BooksService', BooksService);