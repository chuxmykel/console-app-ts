import { readLines } from 'https://deno.land/std@v0.51.0/io/bufio.ts';
import { IUserInterface } from '../../interfaces/interfaces.ts';

export default class ConsoleUserInterface implements IUserInterface {
  private _appPrompt: string = "Main menu\n1. check balance\n2. withdraw\n3. deposit\n4. exit\n";
  async requestInput(prompt: string = this._appPrompt): Promise<string> {
    this.sendOutput(prompt);

    return new Promise(async (resolve) => {
      for await (const line of readLines(Deno.stdin)) {
        resolve(line);
      }
    });
  }

  sendOutput(output: string): void {
    console.log(output);
  }

  clearOutput(): void {
    console.clear();
  }
}
