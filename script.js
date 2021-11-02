document.addEventListener('DOMContentLoaded', function(){

class MainForm{
    constructor(user){
        this.user=user;
    }
    createForm(){
        let form = document.createElement('div');
        form.classList.add('form');
        this.user.append(form);

        let input = document.createElement('input');
        input.classList.add('input', 'form_name');
        form.append(input);

        let buttonAdd = document.createElement('button');
        buttonAdd.classList.add('button', 'add_form');
        buttonAdd.innerHTML = 'add';
        form.append(buttonAdd);
    }
}
class ContentList {
    constructor(user) {
        this.user = user;
    }
    createContentList() {
        let ul = document.createElement('ul');
        ul.classList.add('contentList');
        this.user.append(ul);
    }
}
class ContentItem {
    constructor(user, name, index) {
        this.user = user;
        this.name = name;
        this.index = index;
    }
    createContentItem() {
        let li = document.createElement('li');
        li.classList.add('contentItem');
        this.user.append(li);

        let buttonShow = document.createElement('button');
        buttonShow.classList.add('content_item_user');
        buttonShow.innerHTML = this.name;
        li.append(buttonShow);

        let buttonDelete = document.createElement('button');
        buttonDelete.classList.add('delete');
        li.append(buttonDelete);

        li.dataset.index = this.index;
        return li;
    }
}
class SearchForm {
    constructor(blockInsert) {
        this.blockInsert = blockInsert;
    }
    createSearch() {
        let div = document.createElement('div');
        div.classList.add('form', 'search');
        this.blockInsert.append(div);
        let input = document.createElement('input');
        input.classList.add('input', 'formSearch');
        div.append(input);
    }
}

class NoteName {
    constructor(user) {
        this.user = user;
    }
    createNoteName() {
        let input = document.createElement('input');
        input.classList.add('input', 'note_text');
        this.user.append(input);
    }
}
class NoteForm {
    constructor(user) {
        this.user = user;
    }
    createNoteForm() {
        let textarea = document.createElement('textarea');
        textarea.classList.add('input', 'inputNote');
        this.user.append(textarea);
    }
}



//получение menu-main
let getMainMenu = document.querySelector('.main-form');
//создание формы
let formAddUser = new MainForm(getMainMenu);
formAddUser.createForm();
//создание ul для списка
let contentListUsers = new ContentList(getMainMenu);
contentListUsers.createContentList();


//получение menu-note
let getMenuNote = document.querySelector('.notesForm');
// создание noteName
let noteName = new NoteName(getMenuNote);
noteName.createNoteName();
// создание noteForm
let noteForm = new NoteForm(getMenuNote);
noteForm.createNoteForm();

let users = []; //массив юзеров
class User {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.notes = [];
    }
};
class Note {
    constructor(name, note) {
        this.name = name;
        this.note = note;
    }
};



let click = document.querySelector('.app');
//создание user
click.addEventListener('click', ()=> addUser(event));
function addUser (event) {
    if(!event.target.matches('.main-form .add_form')) return;
    let name = document.querySelector('.main-form .form_name');
    if (name.value.trim() === '') {
        alert('Entered name');
        return;
    }
    users.push(new User(name.value));
    name.value = null;
    showUsers(users);
};
//изменение активного юзера
let activeUser;
let activeUserIndex;
click.addEventListener('click', ()=> changesActiveUser(event));
function changesActiveUser(event) {
    if (!event.target.matches('.content_item_user')) return;
    let contentList = document.querySelector('.main-form .contentList');
    contentList.childNodes.forEach(e => {
        e.firstChild.classList.remove('content-item-name-active');
    });
    event.target.classList.add('content-item-name-active');
    activeUserIndex = event.target.parentNode.dataset.index;
    activeUser = users[activeUserIndex];
    console.log(activeUser);
    showNotes(activeUserIndex);
}

//создание note
click.addEventListener('click', ()=> addNote(event, 0));
function addNote (event, activeUser) {
    if (!event.target.matches('.notesForm .add_notes')) return;
    let name = document.querySelector('.note .note_text');
    if (name.value.trim() === '') {
        alert('Entered name');
        return;
    }
    users[activeUser].notes.push(new Note(name.value));
    name.value = null;
    //showNotes(activeUserIndex);
};

//добавление изеров в список меню main
let contentListMain = document.querySelector('.main-form .contentList');
function showUsers(users) {
    contentListMain.innerHTML = '';
    let userItem = users.map((element, index) =>
        new ContentItem(contentListMain, element.name, index).createContentItem());
    contentListMain.append(...userItem);
    if (activeUserIndex) {
        contentListMain.childNodes[activeUserIndex].firstChild.classList.add('content-item-name-active');
    }

};

//добавление заметок в список меню notes

function showNotes(notes) {
    let contentListNotes = document.querySelector('.notesForm .contentList');
    contentListNotes.innerHTML = '';
    let noteItem = notes.map((element, index) =>
        new ContentItem(contentListNotes, element.name, index).createContentItem());
    contentListNotes.append(...noteItem);
    // if (activeUserIndex) {
    //     contentListMain.childNodes[activeUserIndex].firstChild.classList.add('content-item-name-active');
    // }

};

//отображение заметок
//click.addEventListener('click', ()=> showNotes(event, 0));
function showNotes(activeUserIndex) {
    if (!activeUserIndex) return;
    let menuNotes = document.querySelector('.notesForm');
    menuNotes.style.display = 'block';
    menuNotes.innerHTML = '';
    //получение menu-notes
    let getNotesMenu = document.querySelector('.notesForm');
    //создание формы
    let formAddNote = new MainForm(getNotesMenu);
    formAddNote.createForm();
    //создание search
    let searchForm = new SearchForm(getNotesMenu);
    searchForm.createSearch();
    //создание ul для списка
    let contentListNotes = new ContentList(getNotesMenu);
    contentListNotes.createContentList();


    let contentListNotes1 = document.querySelector('.notesForm .contentList');
    contentListNotes1.innerHTML = '';
    let noteItem = users[activeUser].notes.map((element, index) =>
        new ContentItem(contentListNotes, element.name, index).createContentItem());
    contentListNotes1.append(...noteItem);
}




   
})