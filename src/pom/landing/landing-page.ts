import { Page } from "@playwright/test";
import { BasePage } from "../base-page";
import { FooterPage } from "../footer/footer-page";


export class LandingPage extends BasePage { 
    private footerPage : FooterPage;

    constructor(page: Page){
        super(page);

        this.footerPage = new FooterPage(page);
    }

    scrolltoFooter () : Promise<FooterPage> {
        return this.footerPage.scrollTo();
    }
}