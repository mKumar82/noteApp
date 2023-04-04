console.log("this is Notes app");
shownotes();

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {

    let addtxt = document.getElementById("addtxt");
    let addtitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    myObj = {
        title: addtitle.value,
        txt: addtxt.value
    };
    notesobj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value = "";
    addtitle.value="";
    // console.log(notesobj);
    shownotes();
})

function shownotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
            <div class="notecard my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.txt}</p>
                <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete node</button>
                </div>
            </div>
        `;

    });

    let notesElm = document.getElementById("notes");
    if (notesobj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = "nothing to show...Add notes first"
    }
}

function deleteNode(index) {
    // console.log("I am deleting");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();

}

let search = document.getElementById('searchtxt');
search.addEventListener('input', function () {

    let inputval = search.value.toLowerCase();
    // console.log('input event fired',inputval);

    let notecards = document.getElementsByClassName("notecard")
    Array.from(notecards).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardtxt);
        if (cardtxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";

        }
    })
})