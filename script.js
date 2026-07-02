let income = 0;
let expense = 0;

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

function saveData(){
localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);
}

function addExpense(){

const amount =
parseInt(
document.getElementById("amount").value
);

const category =
document.getElementById("category").value;

if(!amount) return;

transactions.push({
type:"expense",
amount,
category,
date:new Date().toLocaleDateString()
});

saveData();

render();
}

function render(){

expense =
transactions.reduce(
(sum,item)=>sum+item.amount,
0
);

document.getElementById("expense")
.innerText =
"Rp "+expense.toLocaleString();

document.getElementById("income")
.innerText =
"Rp "+income.toLocaleString();

document.getElementById("balance")
.innerText =
"Rp "+(income-expense).toLocaleString();

const history =
document.getElementById("history");

history.innerHTML="";

transactions.reverse().forEach(t=>{

history.innerHTML += `
<div class="transaction">
${t.category}<br>
Rp ${t.amount.toLocaleString()}
</div>
`;

});

drawChart();
}

let chart;

function drawChart(){

const categoryData = {};

transactions.forEach(t=>{

categoryData[t.category] =
(categoryData[t.category] || 0)
+ t.amount;

});

const labels =
Object.keys(categoryData);

const values =
Object.values(categoryData);

if(chart){
chart.destroy();
}

chart =
new Chart(
document.getElementById(
"expenseChart"
),
{
type:"doughnut",
data:{
labels:labels,
datasets:[
{
data:values
}
]
}
}
);
}

if("serviceWorker" in navigator){

navigator.serviceWorker
.register("sw.js");

}

render();