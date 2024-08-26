import { FrameLocator, Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";
import { FooterPage } from "../footer/footer-page";

export class CandidateDataPage extends BasePage {
    private footerPage : FooterPage;

    private iframe : FrameLocator;
    private firstNameInput : Locator;
    private lastNameInput : Locator;
    private emailInput : Locator;
    private phoneInput : Locator;
    private fileInput : Locator;

    constructor(page : Page){
        super(page);


        this.footerPage = new FooterPage(page);

        this.iframe = this.page.frameLocator('#grnhse_iframe');
        this.firstNameInput = this.iframe.locator('input[name="job_application[first_name]"]');
        this.lastNameInput = this.iframe.locator('input[name="job_application[last_name]"]'); 
        this.emailInput = this.iframe.locator('input[name="job_application[email]"]'); 
        this.phoneInput = this.iframe.locator('input[name="job_application[phone]"]'); 
        this.fileInput = this.iframe.locator('input[type="file"]').first();
    }


    async fillForm(firstName: string, lastName: string, email: string, phone: string, cv: string) : Promise <void> {
        await this.firstNameInput.waitFor({ state: 'visible' }); 
        await this.firstNameInput.fill(firstName);

        await this.lastNameInput.waitFor({ state: 'visible' }); 
        await this.lastNameInput.fill(lastName);

        await this.emailInput.waitFor({ state: 'visible' }); 
        await this.emailInput.fill(email);

        await this.phoneInput.waitFor({ state: 'visible' }); 
        await this.phoneInput.fill(phone);

        await this.fileInput.setInputFiles(cv);
    }

    async goBack (): Promise <void> {
        await this.page.goBack();
    }
}