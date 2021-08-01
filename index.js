const limit = 25;
let page = 1;
let getContactsListQueryUrl = '/api/v4/contacts';
let postTasksQueryUrl='/api/v4/tasks';
function getContacts() {
    $.ajax({
        url: getContactsListQueryUrl,
        method: 'GET',
        data: {
            limit: limit,
            with: 'leads',
            page: page
        }
    }).done(function(data) {
        if (!!data) {
           let contacts = data[ "_embedded"][ "contacts"];
           for(let i = 0; i<contacts.length;i++){
               let contact = contacts[i];
               let leads = contact[ "_embedded"]["leads"]; 
               if(leads.length === 0){ //у контакта нет сделок
                createTask()
               }
           }

        } else {
            console.log('Контактов нет');
            return [];
        }
    }).fail(function(data) {
        console.log('Что-то пошло не так c получением контактов');
        console.log(data);
        return false;
    })

    page++;
}
getContacts();

function createTask(){
    $.ajax({
        url: postTasksQueryUrl,
        method: 'POST',
        data: {
            text: 'Контакт без сделок',
            complete_till: new Date(2021, 12, 1, 0, 70),
        }
    }).done(function(data) {

    })

}