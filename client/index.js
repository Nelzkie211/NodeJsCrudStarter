
// get data when load page section


document.addEventListener('DOMContentLoaded',function(event){
  fetch('http://localhost:5000/getAll')
  .then(response => response.json())
  .then(data => loadHTMLTable(data['data']));
},false);


// insert section

const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function(){
  const nameInput = document.querySelector('#name-input');
  const name = nameInput.value;
  nameInput.value = "";

  fetch('http://localhost:5000/insert', {
    headers: {
      'Content-Type': 'application/json'
    },
    method:'POST',
    body: JSON.stringify({name:name})
  })
  .then(response => response.json())
  .then(data => insertRowIntoTable(data['data']));
}

// button action for edit and delete

document.querySelector('table tbody').addEventListener('click',function(event){
  // console.log(event.target.dataset.id);
  if(event.target.className === 'delete-row-btn'){
    deleteRowById(event.target.dataset.id);
    // console.log(event.target.dataset.number)
    let rowNumber = event.target.dataset.number;
    document.getElementById("table").deleteRow(rowNumber)

  }
  if(event.target.className === 'edit-row-btn'){
    handleEditRow(event.target.dataset.id);
  }
})

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');

// search
searchBtn.onclick = function(){
  const searchValue = document.querySelector('#search-input').value;

  if (searchValue === ""){
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
  }else{
    fetch('http://localhost:5000/search/'+ searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
  }
}

// delete row function section
function deleteRowById(id){

  fetch('http://localhost:5000/delete/'+ id, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data =>
    {
      const table = document.querySelector('table tbody');

      if (data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
      }
      let tableHtml = "";
      let count = 1;
      data.success.forEach(function ({id, name, date_added}){
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id} data-number=${count++}>Delete</button></td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;
        tableHtml += "</tr>";
      });

      table.innerHTML = tableHtml;
    }

  );
}

// edit row function section

function handleEditRow(id){

  // show hidden section to update
  const updateSection = document.querySelector('#update-section');
  updateSection.hidden = false;

  //  add the button data-id
  document.querySelector('#update-row-btn').dataset.id= id;
  const updateNameInput = document.querySelector('#update-name-input');
  updateNameInput.focus();

};

// when the update button is execute
updateBtn.onclick = function(){
  const updateNameInput = document.querySelector('#update-name-input');

  fetch('http://localhost:5000/update',{
    method: 'PATCH',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      id: updateBtn.dataset.id,
      name: updateNameInput.value
    })
  })
  .then(response => response.json())
  .then(data =>
    {
      const table = document.querySelector('table tbody');

      if (data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
      }
      let tableHtml = "";
      let count = 1;
      data.success.forEach(function ({id, name, date_added}){
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id} data-number=${count++}>Delete</button></td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;
        tableHtml += "</tr>";
      });

      table.innerHTML = tableHtml;

      const updateSection = document.querySelector('#update-section');
      updateSection.hidden = true;
      updateNameInput.value = "";
    }
  );

};

// function of fetch and insert section
function insertRowIntoTable(data){
  console.log(data);

  // ***************this is insert to latest row*************

  // const table = document.querySelector('table tbody');
  // const isTableData = table.querySelector('.no-data');


  // let tableHtml = "<tr>";

  // for(var key in data){
  //   if(data.hasOwnProperty(key)){
  //     if(key === 'dateAdded'){
  //       data[key] = new Date(data[key]).toLocaleString();
  //     }
  //     tableHtml +=`<td>${data[key]}</td>`;

  //   }
  // }
  //   tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</button></td>`;
  //   tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</button></td>`;

  // tableHtml += "</tr>";

  // if(isTableData){
  //   table.innerHTML = tableHtml;
  // }else{
  //   const newRow = table.insertRow();
  //   newRow.innerHTML = tableHtml;
  // }

  // ***************this is for load the whole table not insert to latest row*************

  const table = document.querySelector('table tbody');

  if (data.length === 0){
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    return;
  }
  let tableHtml = "";
  var count = 1;
  data.forEach(function ({id, name, date_added}){
    tableHtml += "<tr>";
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${name}</td>`;
    tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${id} data-number=${count++}>Delete</button></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;
    tableHtml += "</tr>";
  });

  table.innerHTML = tableHtml;
}


// function to get all data
function loadHTMLTable(data){
  const table = document.querySelector('table tbody');

  if (data.length === 0){
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    return;
  }
  let tableHtml = "";
  var count = 1;
  data.forEach(function ({id, name, date_added}){
    tableHtml += "<tr>";
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${name}</td>`;
    tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${id} data-number=${count++}>Delete</button></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;
    tableHtml += "</tr>";
  });

  table.innerHTML = tableHtml;
}