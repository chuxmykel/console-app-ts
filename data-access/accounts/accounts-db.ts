import { IAccountsDB } from "../../interfaces/interfaces.ts";
import Account, { SavingsAccount, CheckingAccount } from "../../entities/account/account.ts";

export default class AccountsDB implements IAccountsDB {
  private _db: Array<Account> = [
    new SavingsAccount(1, 2000.54),
    new SavingsAccount(2, 34567.54),
    new SavingsAccount(3, 987654.54),
    new SavingsAccount(4, 3456.54),
    new SavingsAccount(5, 987654.54),
    new CheckingAccount(6, 27084.54),
    new CheckingAccount(7, 472000.54),
    new CheckingAccount(8, 87600.54),
    new CheckingAccount(9, 45670.54),
    new CheckingAccount(10, 20876.54),
  ];

  async findById(id: number): Promise<Account | undefined> {
    return this._db.filter(account => account.id === id)[0];
  }

  async save() {
    return null;
  }
}