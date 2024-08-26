import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";
import { FooterPage } from "../footer/footer-page";
import { InnerCareerPage } from "./inner-career-page";


export class CareerPage extends BasePage { 
    private footerPage : FooterPage;

    private careerList : Locator;


    constructor(page: Page){
        super(page);

        this.footerPage = new FooterPage(page);
        this.careerList = page.locator('.section-careers__list');
    }

    async clickOnSection(department : string) : Promise <InnerCareerPage>{

        await this.careerList.locator(`a >> text="${department}"`).click();
        
        const innerCareerPage = new InnerCareerPage(this.page);
        await innerCareerPage.getAllHrefLinks();
        return innerCareerPage;
    }

    scrolltoFooter () : Promise<FooterPage> {
        return this.footerPage.scrollTo();
    }
}