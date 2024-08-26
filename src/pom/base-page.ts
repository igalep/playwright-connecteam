import test , {Locator , Page} from '@playwright/test';

export class BasePage {
    protected page : Page;
    protected path : string;


    constructor (page : Page){
        this.page = page;
        this.path = '';
    }

    async navigate(path: string) : Promise <void> {
        await test.step(`Navigate to ${path}`, async () => {
            await this.page.goto(path, {timeout: 20000, waitUntil : 'domcontentloaded'});
        });
    }

    async scrollto(locator : Locator) : Promise <void> {
        locator.scrollIntoViewIfNeeded();
    }
}