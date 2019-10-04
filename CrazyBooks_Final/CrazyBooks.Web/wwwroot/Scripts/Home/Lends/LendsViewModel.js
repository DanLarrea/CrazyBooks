class LendsViewModel
{
    constructor($UsersService, $BooksService, $LendsService, $window)
    {
        this.Books = [];
        this.Users = [];
        this.Lends = [];
        this.UsersSvc = $UsersService;
        this.BooksSvc = $BooksService;
        this.LendsSvc = $LendsService;
        this.GetAllUsers();
        this.GetAllBooks();
        this.GetAllLends()
        this.Window = $window;
        this.GridOptions =
            {
                enableFiltering: false,
                data: 'vm.Lends',
                appScopeProvider: this,
                columnDefs: [
                    { name: 'User', field: 'BookId' },
                    { name: 'Book', field: 'UserId' },
                    { name: 'LendedOn', field: 'LendedOn' },
                    { name: 'ReturnDate', field: 'ReturnDate' },
                    { name: '', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" style="margin-left:10px; width: 80px; background-color: #dc3545;" value="Return" ng-click="grid.appScope.ReturnBook(row.entity)"></div>' }
                ]
            };

        this.ReturnBook = "";

        this.BookId = "";
        this.UserId = "";
        this.LendedOn = new Date();
        this.ReturnDate = (this.LendedOn.getMonth() + 1);

    }

    GetAllLends() {
        this.LendsSvc.GetAllLendsAsync()
            .then((response) => {
                this.OnGetLendsData(response);
            });
    };
    OnGetLendsData(response) {
        for (let i in response.data) {
            let jsonLend = response.data[i];
            this.Lends.push(new Lend(jsonLend));
        }
    };

    GetAllUsers() {
        this.UsersSvc.GetAllUsersAsync()
            .then((response) => {
                this.OnGetUsersData(response);
            });
    };
    OnGetUsersData(response) {
        for (let i in response.data) {
            let jsonUser = response.data[i];
            this.Users.push(new User(jsonUser));
        }
    };

    GetAllBooks() {
        this.BooksSvc.GetAllBooksAsync()
            .then((response) => {
                this.OnGetBooksData(response);
            });
    };
    OnGetBooksData(response) {
        for (let i in response.data) {
            let jsonBook = response.data[i];
            this.Books.push(new Book(jsonBook));
        }
    };

    OnLendAdded(response) {
        let lend = new Lend(response.data);
        this.Lends.push(lend);
    };

    AddNewLend()
    {
        let lend = new Lend();
        lend.BookId = this.BookId.Id;
        lend.Books = this.BookId;
        lend.UserId = this.UserId.Id;
        lend.Users = this.UserId;
        lend.LendedOn = new Date().toDateString;
        lend.ReturnDate = "2019-02-12";

        this.LendsSvc.AddLendAsync(lend)
            .then(function (response) {
                this.OnLendAdded(response),
                    alert("add success for " + response.data.name);
            });

    
    }
}

app.component('lends',
{
    templateUrl: './Scripts/Home/Lends/LendsView.html',
    controller: LendsViewModel,
    controllerAs: "vm"
});