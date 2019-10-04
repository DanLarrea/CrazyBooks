class LoginViewModel
{
    constructor($LoginService, $window) {
        this.LoginService = $LoginService;
        this.Window = $window;
    }   

    Login() {
        this.LoginService.LoginAsync(this.Email, this.Password)
            .then((response) => {
                //alert(response.data.token);
                this.Window.Token = response.data.token;
                this.Window.LoggedOnUser = response.data;
            },
                (error) => {
                    alert(error.data.message);
                    this.Window.Token = null;
                });
    }
    

   
}

app.component('login',
    {
        templateUrl: './Scripts/Start/Login/LoginView.html',
        controller: LoginViewModel,
        controllerAs: "vm"
    });