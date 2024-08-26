import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";
import { CareerPage } from "../careers/main-career-page";


export class FooterPage extends BasePage { 
    private footer : Locator;
    private careers : Locator;

    constructor(page: Page){
        super(page);

        this.footer = this.page.locator('.section-footer__menu');
        this.careers = this.page.locator('footer a:has-text("Careers")');
    }

    async scrollTo() : Promise <FooterPage> {
        await this.footer.scrollIntoViewIfNeeded();
        return this;
    }

    async clickOnItem() : Promise <CareerPage> {
        await this.careers.click();
        return new CareerPage(this.page);
    }
}