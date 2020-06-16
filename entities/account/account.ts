export default class Account {
  constructor(
    private _id: number,
    protected _balance: number,
    private _dateCreated: Date = new Date(Date.now()),
  ) {}

  get id(): number {
    return this._id;
  }

  get balance(): number {
    return this._balance;
  }

  get dateCreated(): Date {
    return this._dateCreated;
  }

  set id(id: number) {
    if (id < 1) {
      throw new Error("Please provide a valid ID\n");
    }
    this._id = id;
  }

  set balance(balance: number) {
    if (this._balance - balance < 0) {
      throw new Error("Insufficient funds\n");
    }
    this._balance = balance;
  }

  withdraw(amount: number): number {
    if (this._balance - amount < 0) {
      throw new Error("Insufficient funds\n");
    }
    this._balance -= amount;
    return this._balance;
  }

  deposit(amount: number): number {
    if (amount < 1) {
      throw new Error("Please provide a valid amount\n");
    }
    this._balance += amount;
    return this._balance;
  }
}

export class SavingsAccount extends Account {
  private _annualInterestRate: 3.6 = 3.6;
  constructor(
    id: number,
    balance: number,
  ) {
    super(id, balance);
  }

  getMonthlyInterestRate(): number {
    return (this._annualInterestRate / 100) / 12;
  }

  getMonthlyInterest(): number {
    return this._balance * this.getMonthlyInterestRate();
  }
}

export class CheckingAccount extends Account {
  private _overdraft: 2000 = 2000;
  constructor(id: number, balance: number) {
    super(id, balance);
  }

  get overdraft(): number {
    return this._overdraft;
  }
}
