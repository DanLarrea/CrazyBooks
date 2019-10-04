class Book extends Entity
{
    constructor(json)
    {
        super( json);

        if (json)
        {
            this.Title = json.title;
            this.Author = json.author;
            this.PublicationDate = json.publicationDate;
            this.Edition = json.edition;
        }
        else
        {
            this.Title = "";
            this.Author = "";
            this.PublicationDate = null;
            this.Edition = 0;
        }
    }
}