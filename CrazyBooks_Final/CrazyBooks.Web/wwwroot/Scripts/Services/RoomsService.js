class RoomsService extends CrudService
{
    constructor($http, $window)
    {
        super($http, $window, 'rooms');
        this.Http = $http;
        this.Rooms = 'rooms';
    }

    GetAllRoomsAsync()
    {
        return this.GetAll(this.Rooms);
    }
    GetRoomByIdAsync(rooms) {
        return this.GetByIdAsync(rooms);
    }
    GetRoomsByMultipleIds(ids) {
        let multipleIds = ids;

        let promises = multipleIds.map((v) => {
            return this.Http.get(this.Url + v)
        });
    }
    AddRoomAsync(model) {
        return this.AddAsync(model);
    }
    UpdateRoomAsync(model) {
        return this.PutAsync(model);
    }
    DeleteRoomAsync(model) {
        return this.Delete(model);
    }
}

// esto le dice a Angular que creamos un service que se llama $RoomsService
// para que lo inyecte 
app.service('$RoomsService', RoomsService);