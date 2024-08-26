import { BrowserContext, Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";
import { FooterPage } from "../footer/footer-page";
import { CandidateDataPage } from "../candidate-data/candidate-data-page";

export class InnerCareerPage extends BasePage {
    private candidateIframe : CandidateDataPage;
    private footerPage : FooterPage;

    private positionList : Locator;
    private hrefs : (string | null) [];

    constructor(page : Page){
        super(page);


        this.footerPage = new FooterPage(page);
        this.positionList = page.locator('.careers-category__cards-list');
        this.candidateIframe = new CandidateDataPage(page);
    }

    async getAllHrefLinks(): Promise<void> {
      await this.positionList.waitFor({'state' : "visible"});
      await this.positionList.locator('a').first().waitFor({ state: 'attached' });

      this.hrefs = await this.positionList.locator('a').evaluateAll(elements => {
        return elements.map(element => element.getAttribute('href'));
      })
    }

    async fillData(firstName: string, lastName: string, email: string, phone: string, cv: string): Promise <void> {
      console.log(this.hrefs); // This will print an array of all href values
      
      for (const href of this.hrefs) {
        if (href) {
              await this.page.goto(href, {timeout: 20000, waitUntil : 'load'});


              await this.candidateIframe.fillForm(firstName, lastName, email, phone, cv);

              await this.candidateIframe.goBack();
        }
      }
    }
}