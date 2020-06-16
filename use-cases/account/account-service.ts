import { IAccountsDB, IAccountService } from '../../interfaces/interfaces.ts';
import Account from '../../entities/account/account.ts';

export default class AccountService implements IAccountService {
  constructor(private _accountsDB: IAccountsDB) {}

  public async checkBalance(id: number): Promise<number> {
    const account = await this._accountsDB.findById(id);
    this._accountsDB.save();
    return account ? account.balance : -1;
  }

  public async withdraw(
    id: number,
    amount: number,
  ): Promise<number> {
    const account = await this._accountsDB.findById(id);
    if (account) {
      const newBalance = account.withdraw(amount);
      this._accountsDB.save();
      return newBalance;
    }
    return -1;
  }

  public async deposit(
    id: number,
    amount: number,
  ): Promise<number> {
    const account = await this._accountsDB.findById(id);
    if (account) {
      const newBalance = account.deposit(amount);
      this._accountsDB.save();
      return newBalance;
    }
    return -1;
  }

  public async findById(id: number): Promise<Account | undefined> {
    return this._accountsDB.findById(id);
  }
}
