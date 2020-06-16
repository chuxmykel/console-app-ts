import {
  IAccountService,
  IRequest,
  IAccountsController,
} from '../../interfaces/interfaces.ts';
import Account from '../../entities/account/account.ts';

export default class AccountsController implements IAccountsController {
  constructor(private _accountService: IAccountService) {}

  async checkBalance(request: IRequest): Promise<string> {
    const { accountId } = request;
    const balance = parseFloat(
      `${await this._accountService.checkBalance(accountId)}`,
    ).toFixed(2);
    return `Your account balance is: ${balance}\n\n`;
  }

  async withdraw(request: IRequest): Promise<string> {
    const { accountId, data } = request;
    const newBalance = parseFloat(
      `${await this._accountService.withdraw(
        accountId,
        parseFloat(data.amount),
      )}`,
    ).toFixed(2);
    return `Please take your cash: ${parseFloat(
      data.amount,
    )}...\n\nYour new account balance is ${newBalance}\n\nThank you for banking with us\n`;
  }

  async deposit(request: IRequest): Promise<string> {
    const { accountId, data } = request;
    const newBalance = parseFloat(
      `${await this._accountService.deposit(
        accountId,
        parseFloat(data.amount),
      )}`,
    ).toFixed(2);
    return `Deposit successful.\n\nYour new account balance is ${newBalance}\n\n
  `;
  }

  async findById(request: IRequest): Promise<Account | undefined> {
    const { accountId } = request;

    return await this._accountService.findById(accountId);
  }
}
