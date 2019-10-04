class RoomsViewModel
{
    constructor($RoomsService, $window)
    {
        this.Rooms = [];
        this.RoomsSvc = $RoomsService;
        this.GetAllRooms();
        this.Window = $window;
        this.GridOptions =
            {
                enableFiltering: false,
                data: 'vm.Rooms',
                appScopeProvider: this,
                columnDefs: [
                    { name: 'Code', field: 'Code' },
                    { name: 'Color', field: 'Color' },
                    { name: 'Capacity', field: 'Capacity' },
                    { name: 'Accessible', field: 'Accessible' },
                    { name: '', field: 'Id', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><input type="button" style="width: 80px; background-color: #28a745;" value="Select" ng-click="grid.appScope.Selectroom(row.entity)"><input type="button" style="margin-left:10px; width: 80px; background-color: #dc3545;" value="Delete" ng-click="grid.appScope.Deleteroom(row.entity)"></div>'}
                ]
            };
        this.IsEditing = true;

        this.SelectedRoom = "";
    }

    GetAllRooms() {
        this.RoomsSvc.GetAllRoomsAsync()
            .then((response) => {
                this.OnGetData(response);
            });
    }

    OnGetData(response) {
        for (let i in response.data) {
            let jsonRoom = response.data[i];
            this.Rooms.push(new room(jsonRoom));
        }
    };

    AddNewRoom()
    {   
        let room = new Room();
        this.Code = "";
        this.Color = "";
        this.Capacity = null;
        this.Accessible = false;

        this.RoomsSvc.AddRoomAsync(room)
            .then(function (response) {
                this.OnRoomAdded(response),
                alert("add success for " + response.data.name);
            });

    }

    OnRoomAdded(response) {
        let room = new Room(response.data);
        this.Rooms.push(room);
    }

    SelectRoom(room) {
        room.Code = this.Code;
        room.Color = this.Color;
        room.Capacity = this.Capacity;
        room.Accessible = this.Accessible;

        this.IsEditing = false;

        this.SelectedRoom = room;
    }

    UpdateRoom() {
        let uptroom = this.SelectedRoom;
        uptroom.Code = this.Code;
        uptroom.Color = this.Color;
        uptroom.Capacity = this.Capacity;
        uptroom.Accessible = this.Accessible;
        //$http PUT function
        this.RoomsSvc.UpdateRoomAsync(uptroom)
        .then((response) =>

            alert("Room updated successfully")

        ), ((response) =>

            alert("Error while updating room try again!")

            );
        this.ClearForm();
    }

    CancelUpdate() {
        this.IsEditing = true;
    }

    DeleteRoom(room) {
        var r = this.Window.confirm("Do you want to delete this room?");
        if (r == true) {
            this.RoomsSvc.DeleteRoomAsync(room)
                .then((response) => {
                var index = this.Rooms.indexOf(room);
                this.Rooms.splice(index, 1);
                alert("Room deleted successfully");

            }), ((response) => {

                alert("Error while deleting room try again!");
            });
        }
    }
    ClearForm() {
        this.Code = "";
        this.Color = "";
        this.Capacity = null;
        this.Accessible = false;

        this.IsEditing = true;
    }
};

app.component('rooms',
{
    templateUrl: './Scripts/Home/Rooms/RoomsView.html',
    controller: RoomsViewModel,
    controllerAs: "vm"
});