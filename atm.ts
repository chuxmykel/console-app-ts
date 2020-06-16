import {
  IUserInterface,
  IAccountsController,
} from './interfaces/interfaces.ts';
import Account from './entities/account/account.ts';

export default class ATM {
  private _accountId: number | undefined;
  constructor(
    private _ui: IUserInterface,
    private _accountsController: IAccountsController,
  ) {}

  public async start(): Promise<void> {
    const account = await this.login();
    this._accountId = account.id;
    while (true) {
      await this.listen(await this._ui.requestInput());
    }
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this._ui.clearOutput());
      }, ms);
    });
  }

  private async login(): Promise<Account> {
    let id: string = await this._ui.requestInput(
      'Please enter your account ID to use this ATM\n',
    );
    const account:
      | Account
      | undefined = await this._accountsController.findById({
      accountId: parseInt(id, 10),
      data: undefined,
    });

    if (!account) {
      this._ui.sendOutput(
        `Account with ID: ${id} not found. Please provide a valid account ID\n`,
      );
      return this.login();
    }
    this._ui.clearOutput();
    return account;
  }

  private async listen(input: string): Promise<void> {
    if (this._accountId) {
      switch (parseInt(input)) {
        case 1: {
          this._ui.clearOutput();
          this._ui.sendOutput(
            await this._accountsController.checkBalance({
              accountId: this._accountId,
              data: undefined,
            }),
          );
          await this.delay(2000);
          break;
        }

        case 2: {
          this._ui.clearOutput();
          const amount: string = await this._ui.requestInput(
            `How much do you want to withdraw?\n`,
          );
          try {
            this._ui.clearOutput();
            this._ui.sendOutput(
              await this._accountsController.withdraw({
                accountId: this._accountId,
                data: {
                  amount,
                },
              }),
            );
            await this.delay(3000);
          } catch (e) {
            this._ui.sendOutput(e.message);
            await this.delay(2000)
          }
          break;
        }

        case 3: {
          this._ui.clearOutput();
          const amount: string = await this._ui.requestInput(
            `How much do you want to deposit? \n`,
          );
          try {
            this._ui.clearOutput();
            this._ui.sendOutput(
              await this._accountsController.deposit({
                accountId: this._accountId,
                data: {
                  amount,
                },
              }),
            );
            await this.delay(3000);
          } catch (e) {
            this._ui.sendOutput(e.message);
            await this.delay(2000);
          }
          break;
        }

        case 4: {
          this._ui.clearOutput();
          return this.start();
        }

        default: {
          this._ui.clearOutput();
          this._ui.sendOutput('Please provide a valid input\n');
          await this.delay(2000);
          break;
        }
      }
    }
  }
}
