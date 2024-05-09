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

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],

  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE

};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],

  currency: 'USD',
  locale: 'en-US',

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


const displayMovements = function (acc, sort=false) {
  labelDate.textContent = new Date().toLocaleDateString();
  containerMovements.innerHTML = '';

  const  movs = sort ? acc.movements.slice().sort((a, b) => a-b): acc.movements;
  
  movs.forEach(function(mov, i){

    const type = mov>0?'deposit':'withdrawal';

    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
    <div class="movements__date">${new Date(acc.movementsDates[i]).toLocaleDateString()}</div>
    <div class="movements__value">${mov.toFixed(2)} €</div>
  </div>`;
  
  containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calDisplayBalance = function(acc) {
  const balance = acc.movements.reduce((acc, mov) => acc+mov, 0);
  acc.balance = balance;
  labelBalance.textContent = `${acc.balance.toFixed(2)} €`

}

const calDisplaySummary = function(account) {
  const income = account.movements.filter(mov=>mov>0).reduce((acc, mov)=>acc+mov, 0);
  labelSumIn.textContent = `${income.toFixed(2)} €`;
  const out = account.movements.filter(mov=>mov<0).reduce((acc, mov)=>acc+mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)} €`;

  const interest = account.movements.filter(mov=>mov>0).map(deposit => deposit*account.interestRate/100).filter(int => int>=1).reduce((acc, int)=>acc+int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)} €`;

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
      currentAccount.movementsDates.push(new Date());
      receiverAcc.movementsDates.push(new Date());
      updateUI();
    }
    else
    console.log("Amount not transferred");
    inputTransferAmount.value = inputTransferTo.value = '';
  })

  btnLoan.addEventListener('click',  (e)=>{
    e.preventDefault();
    const amount = Math.floor(inputLoanAmount.value);
    if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1))
    {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date());
      updateUI();
    }
    else
    console.log("Loan not granted");
    inputLoanAmount.value = '';
  })

  btnClose.addEventListener('click', (e)=>{
      e.preventDefault();
      const userName = inputCloseUsername.value;
      const pin = +(inputClosePin.value);
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

  let sorted = false;
  btnSort.addEventListener('click', (e)=>{
    e.preventDefault();
    sorted = !sorted;
    displayMovements(currentAccount, sorted);
  })

  