class UsersViewModel
{
    constructor($UsersService, $window)
    {
        this.Users = [];
        this.UsersSvc = $UsersService;
        this.GetAllUsers();
        this.Window = $window;
        this.GridOptions =
            {
                enableFiltering: false,
                data: 'vm.Users',
                appScopeProvider: this,
                columnDefs: [
                    { name: 'Name', field: 'Name' },
                    { name: 'Lastname', field: 'Lastname' },
                    { name: 'Dni', field: 'Dni' },
                    { name: 'Phone', field: 'Phone' },
                    { name: 'Email', field: 'Email' },
                    { name: '', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" style="width: 80px; background-color: #28a745;" value="Select" ng-click="grid.appScope.SelectUser(row.entity)"><input type="button" style="margin-left:10px; width: 80px; background-color: #dc3545;" value="Delete" ng-click="grid.appScope.DeleteUser(row.entity)"></div>'}
                ]
            };
        this.IsEditing = true;

        this.SelectedUser = "";
    }

    GetAllUsers() {
        this.UsersSvc.GetAllUsersAsync()
            .then((response) => {
                this.OnGetData(response);
            });
    }

    OnGetData(response) {
        for (let i in response.data) {
            let jsonUser = response.data[i];
            this.Users.push(new User(jsonUser));
        }
    };

    OnUserAdded(response) {
        let user = new User(response.data);
        this.Users.push(user);
    }

    AddNewUser()
    {   
        let user = new User();
        user.Name = this.Name;
        user.Lastname = this.Lastname;
        user.Dni = this.Dni;
        user.Phone = this.Phone;
        user.Email = this.Email;
        user.Password = this.Password;
        user.IsAdmin = this.IsAdmin;

        this.UsersSvc.AddUserAsync(user)
            .then(function (response) {
                this.OnUserAdded(response),
                alert("add success for " + response.data.name);
            });

            //.then((response) => this.OnUserAdded(response),
            //    alert("Success for " + response.data.name))
    }

    SelectUser(user) {
        this.SelectedUser = user;
        
        this.Name = user.Name;
        this.Lastname = user.Lastname;
        this.Dni = user.Dni;
        this.Phone = user.Phone;
        this.Email = user.Email;
        this.Password = user.Password;
        this.IsAdmin = user.IsAdmin;

        this.IsEditing = false;
    }

    UpdateUser() {
        let uptuser = this.SelectedUser;
        uptuser.Name = this.Name;
        uptuser.Lastname = this.Lastname;
        uptuser.Dni = this.Dni;
        uptuser.Phone = this.Phone;
        uptuser.Email = this.Email;
        uptuser.Password = this.Password;
        uptuser.IsAdmin = this.IsAdmin;
        //$http PUT function
        this.UsersSvc.UpdateUserAsync(uptuser)
        .then((response) =>

            alert("User updated successfully")

        ), ((response) =>

            alert("Error while updating user try again!")

            );
        this.ClearForm();
    }

    CancelUpdate() {
        this.IsEditing = true;
    }

    DeleteUser(user) {
        var r = this.Window.confirm("Do you want to delete this user?");
        if (r == true) {
            this.UsersSvc.DeleteUserAsync(user)
                .then((response) => {
                var index = this.Users.indexOf(user);
                this.Users.splice(index, 1);
                alert("User deleted successfully");

            }), ((response) => {

                alert("Error while deleting user try again!");
            });
        }
    }
    ClearForm() {
        this.Name = "";
        this.Lastname = "";
        this.Dni = "";
        this.Phone = "";
        this.Email = "";
        this.Password = "";
        this.IsAdmin = "";

        this.IsEditing = true;
    }
};

app.component('users',
{
    templateUrl: './Scripts/Home/Users/UsersView.html',
    controller: UsersViewModel,
    controllerAs: "vm"
});