﻿class MenuViewModel
{
    constructor($location)
    {
        this.Location = $location;
    }

    ShowView(option)
    {
        this.Location.path("/" + option);
    }
}

app.component('menu',
    {
        templateUrl: './Scripts/Home/Menu/MenuView.html',
        controller: MenuViewModel,
        controllerAs: "vm"
    });