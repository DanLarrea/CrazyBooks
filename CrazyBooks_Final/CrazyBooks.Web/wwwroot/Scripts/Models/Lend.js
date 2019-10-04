class Lend extends Entity
{
    constructor(json)
    {
        super(json);

        if (json) {
            this.BookId = json.bookId;
            this.Books = json.bookId;
            this.UserId = json.userId;
            this.Users = json.bookId;
            this.LendedOn = json.lendedOn;
            this.ReturnDate = json.returnDate;
        }
        else {
            this.BookId = "";
            this.Books = "";
            this.UserId = "";
            this.Users = "";
            this.LendedOn = "";
            this.ReturnDate = "";
        }

        
        //this.LendedOn = new Date();
        //this.ReturnDate = new Date();

        //this.LendedOn.toLocaleString();
        //this.ReturnDate.toLocaleString();

        //this.ReturnDate.setMonth(this.ExpiresOn.getMonth() + 1);
    }
}