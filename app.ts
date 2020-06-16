import ATM from "./atm.ts";
import ConsoleUserInterface from "./view/console-view/console_ui.ts";
import AccountsController from "./controllers/accounts/accounts-controller.ts";
import AccountService from "./use-cases/account/account-service.ts";
import AccountsDB from "./data-access/accounts/accounts-db.ts";

const atm = new ATM(
  new ConsoleUserInterface(),
  new AccountsController(new AccountService(new AccountsDB())),
);

await atm.start();
