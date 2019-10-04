class LendsService extends CrudService
{
    constructor($http, $window)
    {
        super($http, $window, 'lends');
        this.Http = $http;
        this.Lends = 'lends';
    }

    GetAllLendsAsync()
    {
        return this.GetAll(this.Lends);
    }
    GetLendByIdAsync(lends) {
        return this.GetByIdAsync(lends);
    }
    GetUsersByMultipleIds(ids) {
        let multipleIds = ids;

        let promises = multipleIds.map((v) => {
            return this.Http.get(this.Url + v)
        });
    }
    AddLendAsync(model) {
        return this.AddAsync(model);
    }
    UpdateLendAsync(model) {
        return this.PutAsync(model);
    }
    DeleteLendAsync(model) {
        return this.Delete(model);
    }
}

// esto le dice a Angular que creamos un service que se llama $UsersService
// para que lo inyecte 
app.service('$LendsService', LendsService);