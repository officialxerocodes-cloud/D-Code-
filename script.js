const form=document.getElementById("transactions-form");
const moneyList=document.getElementById("money-list");
const ctx=document.getElementById("financeChart").getContext("2d");
const totalIncomeEl= document.getElementById("totalIncome");
const totalExpenseEl= document.getElementById("totalExpense");
const totalBalanceEl= document.getElementById("totalBalance");
const commonCategory = document.getElementById("common");
const biggestExpense = document.getElementById("biggestExpense");
const numberExpense = document.getElementById("numberExpense");
const mostExpensive = document.getElementById("mostExpensive");
const incomeUsed = document.getElementById("incomeUsed");
const averageExpense = document.getElementById("averageExpense");
const ctx2 = document.getElementById("expenseChart").getContext("2d");
const expenseList = [];

const expenseLineChart = new Chart(ctx2 , {
    type: "line",
    data:{
        labels : [], //this is ffor putting dates
        datasets: [{
            label: "Daily Expense",
            data: [],// actual values the graph will depend on these values
            borderColor: "red",
            backgroundColor: "rgba(255,0,0, 0.2)",
            fill: true,
            tension: 0.3,
        }]
    },
    options:{
        responsive: true,
        scales: {
            x:{
                type: "time",
                time: {
                    unit: "day"
                },
                title: {
                    display: true,
                    text: "date"
                }
            },
            y: {
                begiAtZero : true,
                title: {
                    display: true,
                    text: "Expense"
                }
            }
        }
    }
});

let food= 0;
let transport= 0;
let shopping= 0;
let bills= 0;
let health= 0;
let salary= 0;
let other= 0;
let income=0;
let expense=0;
let foodCount= 0;
let transportCount= 0;
let shoppingCount= 0;
let billsCount= 0;
let healthCount= 0;
let otherCount= 0;
let commonList = [];
let count = 0;

function average() {
    let averageNumber = expense/count;
    let round = averageNumber.toFixed(2);
    averageExpense.textContent = `${Number(round)}`;
}

function budget(){
    if (income !== 0){
        
        incomeUsed.textContent = ` ${Number((expense/income)*100).toFixed(2) } % `;
    }else {
        incomeUsed.textContent = `Add Income First`;
    }
}

function updateUI() {
  totalIncomeEl.textContent = `₹ ${income}`;
  totalExpenseEl.textContent = `₹ ${expense}`;
  totalBalanceEl.textContent = `₹ ${income - expense}`;
}

function countExpense(){
    numberExpense.textContent = `${count}`;
}

function bigExpense(){
    let categoryList = [food, transport, shopping, bills, health, other];
    let max= Math.max(...categoryList);
    biggestExpense.textContent = `${max}`;
}

function mostExpensiveCategory(){
    let mostExpensiveList = [food, transport, shopping, bills, health, other];
    let maxMostExpensiveList = Math.max(...mostExpensiveList);
    if (maxMostExpensiveList === food){
        mostExpensive.textContent = `🍕Food`;
    }else if (maxMostExpensiveList === transport){
        mostExpensive.textContent = `🚌Transport`;
    }else if (maxMostExpensiveList === shopping){
        mostExpensive.textContent = `🛒Shopping`;
    }else if (maxMostExpensiveList === bills){
        mostExpensive.textContent = `🧾Bills`;
    }else if (maxMostExpensiveList === health){
        mostExpensive.textContent = `🚑Health`;
    }else if (maxMostExpensiveList === other){
        mostExpensive.textContent = `❓Other`;
    }
}

//Line Chart for Expenses

function updateExpenseChart(){
    const grouped = {};
    expenseList.forEach(t => {
        if (!grouped[t.date]){
            grouped[t.date] = 0;
        }
        grouped[t.date] += t.amount;
    });

    const sortDates = Object.keys(grouped).sort();
    expenseLineChart.data.labels = sortDates;
    expenseLineChart.data.datasets[0].data = sortDates.map(date => grouped[date]);
    expenseLineChart.update();
}


// function mostCategory() {
//     let mostCategoryList = [foodCount, transportCount, shoppingCount, billsCount, healthCount, otherCount];
//     let maxList = Math.max(...mostCategoryList);
//     if (maxList === foodCount && maxList !== transportCount && maxList !== shoppingCount && maxList !== billsCount && maxList !== healthCount && maxList !== otherCount){
//         // commonList.push("food");
//         commonCategory.textContent = `Food`;
//     }else if (maxList === transportCount && maxList !== foodCountCount && maxList !== shoppingCount && maxList !== billsCount && maxList !==  healthCount && maxList !==  otherCount){
//         //commonList.push("transport");
//         commonCategory.textContent = `Transport`;
//     }else if (maxList === shoppingCount && maxList !== foodCountCount && maxList !== transportCountCount && maxList !== billsCount && maxList !== healthCount && maxList !== otherCount){
//         //commonList.push("shopping");
//         commonCategory.textContent = `Shopping`;
//     }else if (maxList === billsCount && maxList !== foodCountCount && maxList !== shoppingCount && maxList !== transportCount && maxList !== healthCount && maxList !== otherCount){
//         //commonList.push("bills");
//         commonCategory.textContent = `Bills`;
//     }else if (maxList === otherCount && maxList !== foodCountCount && maxList !== shoppingCount && maxList !== billsCount && maxList !== healthCount && maxList !== transportCount){
//         //commonList.push("others");
//         commonCategory.textContent = `Others`;
//     }else{
//         //commonList.push("Two or more categories have same count");
//         commonCategory.textContent = `Two or more categories have same count`;
//     }

//     // commonCategory.textContent = `${commonList}`;
// }


//Chart 

let financeChart= new Chart(ctx, {
    type: "doughnut", 
    data: {
        labels:["Food", "Transport", "Shopping", "Bills", "Health", "Salary", "Other"],
        datasets:[{
            data:[food, transport, shopping, bills, health, salary, other],
            backgroundColor:[
                "#FF6347", //Food
                "#121212", //Transport
                "#FF9800", //Shopping
                "#2196F3", //Bills
                "#9C27B0", //Health
                "#66BB6A", //Salary
                "#607D8B", //Other
            ]
        }]  
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: "#FFFFFF",
                    font: {
                        size: 16,
                        family: 'Arial',
                        weight: 'bold',
                    }
                }
            }
        }
    }
});

// Form 
form.addEventListener("submit", function(e){
    e.preventDefault();
    
    const desc= document.getElementById("desc").value;
    const amount= Number(document.getElementById("amount").value);
    const type= document.getElementById("amountType").value;
    const category= document.getElementById("category").value;
    const date = document.getElementById("date").value;

    
    
    //Adding Transactions
    const li= document.createElement("li");
    if (type === "income" && category ==="salary"){
        income += amount;
        salary +=amount;
        li.textContent = `+₹ ${amount} added for ${category}`;
        moneyList.appendChild(li);
        
        alert("Income added for salary");
        updateUI();
        
    }else if (type === "income" && category !=="salary"){
        alert("Income can only be added when Category is set to Salary");
    }else if (type === "expense" && category ==="salary"){
        alert("Expene cannot be added when category is selected as Salary");
    }else if (type === "expense" && category === "food") {
        food +=amount;
        expense +=amount;
        li.textContent = `-₹ ${amount} for ${category}`;
        moneyList.appendChild(li);
        updateUI();
        count += 1;
        countExpense();
        bigExpense();
        foodCount += 1;
        mostExpensiveCategory();
        //Transactions for line Chart
        expenseList.push({type,date,amount});
        average();
        budget();
        
        alert("Expense added for food");
        
        
    }else if (type === "expense" && category === "transport") {
        transport +=amount;
        expense +=amount;
        li.textContent = `-₹ ${amount} for ${category}`;
        moneyList.appendChild(li);
        updateUI();
        count += 1;
        countExpense();
        transportCount += 1;
        bigExpense();
        mostExpensiveCategory();
        
        average();
        budget();
        //Transactions for line Chart
        expenseList.push({type,date,amount});
        
        alert("Expense added for transport");
        
        
    }else if (type === "expense" && category === "shopping") {
        shopping +=amount;
        expense +=amount;
        li.textContent = `-₹ ${amount} for ${category}`;
        moneyList.appendChild(li);
        updateUI();
        count += 1;
        countExpense();
        shoppingCount += 1;
        bigExpense();
        mostExpensiveCategory();
        
        average();
        budget();
        //Transactions for line Chart
        expenseList.push({type,date,amount});
        
        alert("Expense added for shopping");
        
    }else if (type === "expense" && category === "health") {
        health +=amount;
        expense +=amount;
        li.textContent = `-₹ ${amount} for ${category}`;
        moneyList.appendChild(li);
        updateUI();
        count += 1;
        countExpense();
        healthCount += 1;
        bigExpense();
        mostExpensiveCategory();
        
        average();
        budget();
        //Transactions for line Chart
        expenseList.push({type,date,amount});
    
        alert("Expense added for health");
        
        
    }else if (type === "expense" && category === "bills") {
        bills +=amount;
        expense +=amount;
        li.textContent = `-₹ ${amount} for ${category}`;
        moneyList.appendChild(li);
        updateUI();
        count += 1;
        countExpense();
        billsCount += 1;
        bigExpense();
        mostExpensiveCategory();
        
        average();
        budget();
        updateUI();
        //Transactions for line Chart
        expenseList.push({type,date,amount});
       
        alert("Expense added for bills");
        
        
    }else if (type === "expense" && category === "other") {
        other +=amount;
        expense +=amount;
        li.textContent = `-₹ ${amount} for ${category}`;
        moneyList.appendChild(li);
        updateUI();
        count += 1;
        countExpense();
        otherCount += 1;
        bigExpense();
        mostExpensiveCategory();
        budget();
        average();
        //Transactions for line Chart
        expenseList.push({type,date,amount});
        
        alert("Expense added for other");
        
        
    }

    //Chart
    financeChart.data.datasets[0].data= [food, transport, shopping, bills, health, salary, other];
    financeChart.update();

    updateExpenseChart();

    

    //Clearing Inputs after submitting
    form.reset();
});

