class User extends Entity {
    constructor(json)
    {
        super(json);

        if (json) {
            this.Name = json.name;
            this.Lastname = json.lastname;
            this.Dni = json.dni;
            this.Phone = json.phone;
            this.Email = json.email;
            this.Password = json.password;
            this.IsAdmin = json.isAdmin;
        }
        else {
            this.Name = "";
            this.Lastname = "";
            this.Dni = "";
            this.Phone = 0;
            this.Email = "";
            this.Password = "";
            this.IsAdmin = false;

        }
    }
}