class ReservationsViewModel
{
    constructor($UsersService, $RoomsService, $LendsService, $window) {
        this.Rooms = [];
        this.Users = [];
        this.Lends = [];
        this.UsersSvc = $UsersService;
        this.BooksSvc = $BooksService;
        this.LendsSvc = $LendsService;
        this.GetAllUsers();
        this.GetAllRooms();
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
                    { name: '', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" style="width: 80px; background-color: #28a745;" value="Select" ng-click="grid.appScope.SelectUser(row.entity)"><input type="button" style="margin-left:10px; width: 80px; background-color: #dc3545;" value="Delete" ng-click="grid.appScope.DeleteUser(row.entity)"></div>' }
                ]
            };

        this.RoomId = "";
        this.UserId = "";
        this.LendedOn = new Date();
        this.ReturnDate = (this.LendedOn.getMonth() + 1);

    }

    GetAllLends() {
        this.ReservationsSvc.GetAllReservationsAsync()
            .then((response) => {
                this.OnGetReservationsData(response);
            });
    };
    OnGetReservationsData(response) {
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

    GetAllRooms() {
        this.RoomsSvc.GetAllRoomsAsync()
            .then((response) => {
                this.OnGetRoomsData(response);
            });
    };
    OnGetRoomsData(response) {
        for (let i in response.data) {
            let jsonRoom = response.data[i];
            this.Rooms.push(new Room(jsonRoom));
        }
    };

    OnLendAdded(response) {
        let reservation = new RoomReservation(response.data);
        this.Lends.push(lend);
    };

    AddNewLend() {
        let reservation = new RoomReservation();
        reservation.RoomId = this.RoomId.Id;
        reservation.Rooms = this.RoomId;
        reservation.UserId = this.UserId.Id;
        reservation.Users = this.UserId;
        reservation.LendedOn = new Date().toDateString;
        reservation.ReturnDate = "2019-02-12";

        this.LendsSvc.AddLendAsync(lend)
            .then(function (response) {
                this.OnLendAdded(response),
                    alert("add success for " + response.data.name);
            });


    }
}

app.component('reservations',
{
    templateUrl: './Scripts/Home/Reservations/ReservationsView.html',
    controller: ReservationsViewModel,
    controllerAs: "vm"
});