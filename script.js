let balance=document.getElementById('amount');
let incomeamount=document.getElementById('incomeamount');
let expenseamount=document.getElementById('expensesamount');
let list=document.getElementById('transactionlist');
let transactionform=document.getElementById('tform');
let description = document.getElementById("description");
let amount=document.getElementById('amount1');


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionform.addEventListener("submit", addTransaction);
function addTransaction(e){
    e.preventDefault();
    const des=description.value.trim();
    const money=parseFloat(amount.value);
    let date=document.getElementById('date').value;
    transactions.push({
        id:Date.now(),
        date,
        des,
        money

    })
    localStorage.setItem("transactions",JSON.stringify(transactions))
    transactions.forEach(t =>{
         console.log(t.date);
    });
    updatetlist();
    updatesummary();

    transactionform.reset()
}
function updatetlist(){
    list.innerHTML='';
    let sortedlist=[...transactions].reverse();
    sortedlist.forEach((transaction)=>{
       list.appendChild(createTransactionElement(transaction));
    })
}
function createTransactionElement(t){
    let li=document.createElement('li');
    li.classList.add('transaction');
     li.id = "transaction";
    li.classList.add(t.money>0? "income" : 'expense');
    li.innerHTML=`
      <span>${t.des}</span>
      <span>${t.money}
       <button class='delete-btn' onclick='remove(${t.id})'>🗑️</button>
      </span>

    `
    return li;
}
function updatesummary(){
    let i=0,ex=0;
    transactions.forEach(t =>{
        if(t.money>0){
            i+=t.money;
        }
        else{
            ex+=t.money
        }
    })
    let bal=i+ex;
    balance.innerText=`₹ ${bal}`
    incomeamount.innerText=`₹ ${i}`
    expenseamount.innerText=`${Math.abs(ex)}`;
}
 function remove(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updatetlist();
    updatesummary();
}
function show(){
    let history=document.createElement('div');
    history.classList.add('show');
    history.id='his';
    history.style.overflowY = "auto";
    let close=document.createElement('div');
    close.classList.add('close');
    close.innerHTML=`
    <span>
    <h2 class='shead'>Transaction History</h2>
    <button class='but' onclick="rem()">x</button>
    </span>
    <div class='sinput'>
         <label>Search by date</label>
          <input id='sdate' type="date">
          <button class='sbut' onclick="sh()">🔍</button>
    </div>
    `
    ;
    history.appendChild(close);
    document.getElementById("con").style.filter="blur(5px)"
   console.log(transactions);

   transactions.forEach(t =>{
      history.innerHTML+=`

        <div class="list">
        <div class="row">
        <span class="d">${t.des}:</span>
         <span class="mon">₹ ${t.money}</span>
        </div>
        <div class="dat">${t.date}</div>
        </div>

    
      `
   })
   if(transactions.length==0){
        history.innerHTML+=`<h2 class='no'>No Transactions done yet!</h2>`
    }
    document.body.appendChild(history);
}
function rem(){
   let pop=document.getElementById('his');
   pop.remove();
   document.getElementById("con").style.filter = "none";
}
function sh() {
    let sdata = document.getElementById('sdate').value;
    let shistory = document.getElementById('his');

    let elements = shistory.querySelectorAll(".list");
    elements.forEach(el => el.remove());
    let filtered = transactions.filter(x => x.date === sdata);

    if (filtered.length === 0) {
        shistory.innerHTML += `<div class="list"><div class="row"><span class="d">No transactions found for this date.</span></div></div>`;
        return;
    }
    filtered.forEach(x => {
        shistory.innerHTML += `
            <div class="list">
                <div class="row">
                    <span class="d">${x.des}:</span>
                    <span class="mon">₹ ${x.money}</span>
                </div>
                <div class="dat">${x.date}</div>
            </div>
        `;
    });
}




updatetlist();
updatesummary();