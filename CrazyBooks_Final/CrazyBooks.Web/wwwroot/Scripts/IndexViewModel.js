class IndexViewModel
{
    constructor($http, $window)
    {
        this.Window = $window;
    }
    IsLoggedOn()
    {
            if (this.Window.LoggedOnUser)
                return false;
            else
                return true;
    }
};

app.component('index',
    {
        templateUrl: './Scripts/IndexView.html',
        controller: IndexViewModel,
        controllerAs: "vm"
    });