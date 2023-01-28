let submit=document.querySelector('#submit')
let compyter=[]
let compytreindex=null
let compyterid=null


function getcompyter() {
    fetch('https://63cfe5781098240437887882.mockapi.io/compyter')
          .then(response => response.json())
          .then(json =>{
            compyter = json
            drawcompyter()
        })
}
getcompyter()

function drawcompyter() {
    document.querySelector('.data-row').innerHTML =' '
    for (let i = 0; i < compyter.length; i++) {
        document.querySelector('.data-row').innerHTML +=`
        <div class="col-xl-3 my-3">
        <div class="card">
            <div class="card-header text-white text-center bg-dark">
                <h6>${compyter[i].Name}</h6>
            </div>
            <div class="card-body">
                <p>Color: <b>${compyter[i].Color}</b></p>
                <p>Type: <b>${compyter[i].Type}</b></p>
                <p>Company: <b>${compyter[i].company}}</b></p>
            </div>
            <div class="card-footer d-flex justify-content-between">
                <button class="btn btn-warning w-50" onclick="editcomputer(${compyter[i].id})">Edit</button>
                <button class="btn btn-danger w-50 ms-3" onclick="deletcomputer(${compyter[i].id})">Delete</button>
            </div>
        </div>
    </div>
        `
        
    }
}

submit.addEventListener('click',()=>{
    let Color=document.forms['compyterForm']['color'].value
    let Type=document.forms['compyterForm']['type'].value
    let company=document.forms['compyterForm']['company'].value
    let Name=document.forms['compyterForm']['Name'].value
   if(Name.trim().length>0 && Color.trim().length>0){
    newobject={
        Name,
        Color,
        Type,
        company
    }
   }
   else{
    document.forms['compyterForm']['Name'].style="border:2px solid red;"
    document.forms['compyterForm']['color'].style="border:2px solid red;"
   }

  if(compytreindex!==null){
    fetch('https://63cfe5781098240437887882.mockapi.io/compyter/'+compyterid, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newobject)

    })
        .then(response => response.json())
        .then(json => {
            getcompyter()
        })
  }
  else{
    fetch('https://63cfe5781098240437887882.mockapi.io/compyter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newobject)

    })
        .then(response => response.json())
        .then(json => {
            getcompyter()
        })
  }
    compytreindex=null
    compyterid=null
    document.forms['compyterForm'].reset()

})


function deletcomputer(id) {
    fetch('https://63cfe5781098240437887882.mockapi.io/compyter/' +id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(json => {
            getcompyter()
        })
}

function editcomputer(id) {
    compytreindex=compyter.findIndex(value=>value.id==id)
    compyterid=id
    document.forms['compyterForm']['color'].value=compyter[compytreindex].color
    document.forms['compyterForm']['type'].value=compyter[compytreindex].Type
    document.forms['compyterForm']['company'].value=compyter[compytreindex].company
    document.forms['compyterForm']['Name'].value=compyter[compytreindex].Name
}
