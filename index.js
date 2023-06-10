class Account {

  constructor(username) {
    this.username = username;    
    this.transactions = [];
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);          
  }

  listTransactions() {
    if (this.transactions.length === 0) {
      return "No transactions have been made on this account."
    }
    for (const transaction of this.transactions) {
      console.log(`${transaction.date.toString()} : ${transaction.constructor.name} ${transaction.amount}`);
    }
  }

  get balance() {
    let result = 0;
    for (const transaction of this.transactions) {
      result += transaction.value;
    }
    return result;
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed) {
      this.date = new Date();
      this.account.addTransaction(this);
    }
  }

}

class Withdrawal extends Transaction { 
  
  get value() {
    return this.amount * -1;
  }

  get isAllowed() {
    return this.account.balance > -this.value;
  }

}

class Deposit extends Transaction {
  
  get value() {
    return this.amount;
  }

  get isAllowed() {
    return this.amount > 0;
  }

}





// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

// const myAccount = new Account("snow-patrol");


// t3 = new Deposit(120.00, myAccount);
// t3.commit();
// console.log('Transaction 3:', t3);

// t1 = new Withdrawal(50.25, myAccount);
// t1.commit();
// console.log('Transaction 1:', t1);

// t2 = new Withdrawal(9.99, myAccount);
// t2.commit();
// console.log('Transaction 2:', t2);


// console.log('Balance:', myAccount.balance);

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);

//console.log("Transactions:", myAccount.transactions);

myAccount.listTransactions();