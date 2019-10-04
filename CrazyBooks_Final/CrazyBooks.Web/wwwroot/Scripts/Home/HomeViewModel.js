class HomeViewModel
{
    constructor($http)
    {
        
    }

   
}

app.component('home',
    {
        templateUrl: './Scripts/Home/HomeView.html',
        controller: HomeViewModel,
        controllerAs: "vm"
    });