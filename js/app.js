

// console.log('Notes1.js');
//if user adds a note , add it to localStorage
showNotes();

let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click",function(e){

    const newCardObj = {
        Txt : document.getElementById("addTxt").value,
        Title : document.getElementById("addTitle").value,
        Link : document.getElementById("addLink").value
    };


    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push(newCardObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    addLink.value = "";
    // console.log(notesObj);
    showNotes();
})

//function to show note
function  showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element , index) {
        html += ` <div class="noteCard card mx-2 my-2 " style="width: 18rem;">
        <div class="card-body overflow-auto d-flex align-items-center flex-column" style="height: 300px; ">
          <h5 class="card-title">${element.Title}</h5>

          <div class="text-wrap my-3  d-flex align-items-center flex-column" style="width: 14rem;">
            <p class="card-text">
                ${element.Txt}
            </p>
          </div>

          <div class="badge badge-primary text-wrap my-3" style="width: 14rem;">
            <a href=${element.Link} class="position-relative text-wrap">${element.Link}</a>
          </div>
          
          <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary position-absolute bottom-0 mb-4 ">Delete Note</button>
        </div>
      </div>`;

    });

    let notesElm = document.getElementById("notes");
    if(notes){
        notesElm.innerHTML = html;
    }else{
        notesElm.innerHTML = `<h3>Nothing to Show</h3>`;
    }
}

//function to delete note
function deleteNote(index){
    // console.log(`I am deleting ${index}`);
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}



let search = document.getElementById('searchTxt');
search.addEventListener("input",function(e) {
    let inputVal = search.value.toLowerCase();
    // console.log('input event is fired',inputVal);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();

        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }

    })

})