'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//containerApp.style.opacity = 100 ;
const displayMovements = function (acc) {
  containerMovements.innerHTML = '';
  acc.movements.forEach(function(mov, i){

    const type = mov>0?'deposit':'withdrawal';

    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov} €</div>
  </div>`;
  
  containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calDisplayBalance = function(acc) {
  const balance = acc.movements.reduce((acc, mov) => acc+mov, 0);
  acc.balance = balance;
  labelBalance.textContent = `${balance} €`

}

const calDisplaySummary = function(account) {
  const income = account.movements.filter(mov=>mov>0).reduce((acc, mov)=>acc+mov, 0);
  labelSumIn.textContent = `${income} €`;
  const out = account.movements.filter(mov=>mov<0).reduce((acc, mov)=>acc+mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = account.movements.filter(mov=>mov>0).map(deposit => deposit*account.interestRate/100).filter(int => int>=1).reduce((acc, int)=>acc+int, 0);
  labelSumInterest.textContent = `${interest} €`;

}
const createUserName = function(accs) {

  accs.forEach((acc)=>
    {
    acc.userName = acc.owner.toLowerCase().split(' ').map((name)=> name[0]).join('');
});
};

createUserName(accounts);
const updateUI = function() {
    displayMovements(currentAccount);
     calDisplayBalance(currentAccount);
     calDisplaySummary(currentAccount);
}

let currentAccount;

btnLogin.addEventListener('click', (e)=>{
  //In a form by default our button goes to submit and reload the page we don't want that. To stop that from happening we need to pass the event object using which we can call the preventDefault() method;
  e.preventDefault();

  const userName = inputLoginUsername.value;
 
  const pinNumber = Number(inputLoginPin.value);

  // find function does not take more than one statement and no {}
  currentAccount = accounts.find(account => account.userName == userName)
 
  if(currentAccount?.pin == pinNumber)
   {
     containerApp.style.opacity = 100;
     inputLoginUsername.value = inputLoginPin.value = '';
     inputLoginPin.blur();
     labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
     updateUI();
     
   }
  else
   console.log("Not logged in");
  });

  btnTransfer.addEventListener('click',  (e)=>{
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.userName == inputTransferTo.value)
  
    if(amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.userName !== currentAccount.userName)
    {
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
      updateUI();
    }
    else
    console.log("Amount not transferred");
    inputTransferAmount.value = inputTransferTo.value = '';
  })

  btnLoan.addEventListener('click',  (e)=>{
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1))
    {
      currentAccount.movements.push(amount);
      updateUI();
    }
    else
    console.log("Loan not granted");
    inputLoanAmount.value = '';
  })
  
  btnClose.addEventListener('click', (e)=>{
      e.preventDefault();
      const userName = inputCloseUsername.value;
      const pin = Number(inputClosePin.value);
      if(currentAccount.userName ==  userName && currentAccount.pin == pin)
        {
          const index = accounts.findIndex(acc => acc.userName = currentAccount.userName);
          accounts.splice(index, 1);
          containerApp.style.opacity = 0;
          inputCloseUsername.value = inputClosePin.value = '';
          labelWelcome.textContent = 'Log in to get started';
        }
        else
        console.log("Can't Delete the account");
  })