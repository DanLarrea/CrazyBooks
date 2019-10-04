class HeaderViewModel
{
    constructor()
    {
        
    }
}

app.component('header',
{
    templateUrl: './Scripts/Home/Header/HeaderView.html',
    controller: HeaderViewModel,
    controllerAs: "vm"
});