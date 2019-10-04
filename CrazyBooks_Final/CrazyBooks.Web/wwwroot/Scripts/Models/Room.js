class Room extends Entity
{
    constructor(json)
    {
        super(json);

        if (json) {
            this.Code = json.code;
            this.Color = json.color;
            this.Capacity = json.capacity;
            this.Accessible = json.accessible;
        }
        else {
            this.Code = "";
            this.Color = "";
            this.Capacity = 0;
            this.Accessible = "";
        }
    }
}