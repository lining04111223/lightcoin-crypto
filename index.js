class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
  	let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Withdrawal extends Transaction{

  get value(){
    return -this.amount;
  }

  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }


}

class Deposit extends Transaction{

  get value(){
    return this.amount;
  }

  isAllowed() {
    // deposits always allowed thanks to capitalism.
    return true;
  }

}

// DRIVER CODE BELOW
const myAccount = new Account("snow-patrol");

console.log(myAccount);
console.log('Starting Balance:', myAccount.balance);

const t1 = new Withdrawal(50.00, myAccount);
t1.commit();
const t2 = new Deposit(120.00, myAccount);
t2.commit();


console.log('Transaction 1:', t1);
console.log('Transaction 2:', t2);

console.log('Ending Balance:', myAccount.balance);

console.log('Account Transaction History: ', myAccount.transactions);
