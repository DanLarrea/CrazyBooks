class RegisterViewModel
{
    constructor($location) {
        this.Location = $location;
    }

    ShowView(option) {
        this.Location.path("/" + option);
    }
}

app.component('register',
    {
        templateUrl: './Scripts/Start/Register/RegisterView.html',
        controller: RegisterViewModel,
        controllerAs: "vm"
    });