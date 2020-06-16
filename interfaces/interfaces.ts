import Account from "../entities/account/account.ts";

export interface IUserInterface {
  requestInput(str?: string): Promise<string>;
  sendOutput(str: string): void;
  clearOutput(): void;
}

export interface IAccountsDB {
  findById(id: number): Promise<Account | undefined>;
  save(): void;
}

export interface IAccountService {
  checkBalance(id: number): Promise<number>;
  withdraw(id: number, amount: number): Promise<number>;
  deposit(id: number, amount: number): Promise<number>;
  findById(id: number): Promise<Account | undefined>;
}

export interface IAccountsController {
  checkBalance(request: IRequest): Promise<string>;
  withdraw(request: IRequest): Promise<string>;
  deposit(request: IRequest): Promise<string>;
  findById(request: IRequest): Promise<Account | undefined>;
}

export interface IRequest {
  accountId: number;
  data: any,
}
