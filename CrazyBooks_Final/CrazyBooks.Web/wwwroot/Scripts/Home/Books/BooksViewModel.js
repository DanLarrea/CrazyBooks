class BooksViewModel
{    
    constructor($BooksService, $window)
    {
        this.Books = [];
        this.BooksSvc = $BooksService;
        this.Window = $window;
        this.GetAllBooks();
        this.GridOptions =
        {
            enableFiltering: false,
            data: 'vm.Books',
            appScopeProvider: this,
            columnDefs: [
                { name: 'Title', field: 'Title' },
                { name: 'Author', field: 'Author' },
                { name: 'PublicationDate', field: 'PublicationDate' },
                { name: 'Edition', field: 'Edition' },
                { name: '', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" style="width: 80px;" background-color: #28a745; value="Select" ng-click="grid.appScope.SelectBook(row.entity)"><input type="button" style="margin-left:10px; width: 80px;" background-color: #dc3545; value="Delete" ng-click="grid.appScope.DeleteBook(row.entity)"></div>' }
            ]
        };
        this.IsEditing = true;

        this.SelectedUser = "";
    }
    GetAllBooks()
    {
        this.BooksSvc.GetAllBooksAsync()
            .then((response) => {
                this.OnGetData(response);
            });
    }

    OnGetData(response)
    {
        for (let i in response.data) {
            let jsonBook = response.data[i];
            this.Books.push(new Book(jsonBook));
        }
    };

    OnBookAdded(response) {
        let book = new Book(response.data); // response.data es un objeto que viene de un json
        this.Books.push(book);
    }

    AddNewBook()
    {
        let book = new Book();
        book.Title = this.Title;
        book.Author = this.Author;
        book.PublicationDate = this.PublicationDate;
        book.Edition = this.Edition;

        this.BooksSvc.AddBookAsync(book)
            .then(function (response) {
                this.OnBookAdded(response),
                alert("add success for " + response.data.title);
            });
    }

    SelectBook(book)
    {
        this.SelectedBook = book;

        this.Title = book.Title;
        this.Author = book.Author;
        this.PublicationDate = book.PublicationDate;
        this.Edition = book.Edition;

        this.IsEditing = false;
    }

    UpdateBook() {
        let uptBook = this.SelectedBook;
        uptBook.Title = this.Title;
        uptBook.Author = this.Author;
        uptBook.PublicationDate = this.PublicationDate;
        uptBook.Edition = this.Edition;
        //$http PUT function
        this.BooksSvc.UpdateBookAsync(uptBook)
        .then((response) =>

            alert("Book updated successfully")

        ), ((response) =>

            alert("Error while updating book try again!")

            );
        this.ClearForm();
    }

    CancelUpdate() {
        this.IsEditing = true;
    }

    DeleteBook(book) {
        var r = this.Window.confirm("Do you want to delete this book?");
        if (r == true) {
            this.BooksSvc.DeleteBookAsync(book)
                .then((response) => {
                var index = this.Books.indexOf(book);
                this.Books.splice(index, 1);
                alert("Book deleted successfully");

            }), ((response) => {

                alert("Error while deleting book try again!");
            });
        }
    }

    ClearForm()
    {
        this.Title = "";
        this.Author = "";
        this.PublicationDate = new Date();
        this.Edition = 0;

        this.IsEditing = true;
    }
}

app.component('books',
{
    templateUrl: './Scripts/Home/Books/BooksView.html',
    controller: BooksViewModel,
    controllerAs: "vm"
});