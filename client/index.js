document.addEventListener('DOMContentLoaded',function(event){
  fetch('http://localhost:5000/getAll')
  .then(response => response.json())
  .then(data => console.log(data))
  loadHTMLTable([]);
},false);

function loadHTMLTable(data){
  const table = document.querySelector('table tbody');
  let tableHtml = "";
  if (data.length === 0){
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
  }
}