import { test, expect } from '@playwright/test';
import { LandingPage } from '../src/pom/landing/landing-page';



const testData = [
    {department : 'R&D', firstName : 'Johe', lastName : 'Doe', email : 'johe.doe@nasa.com', phone : '1234567890', cv : 'resource/tmp.pdf'},
    {department : 'Australia', firstName : 'Celien', lastName : 'Dion', email : 'celien.dion@mtv.com', phone : '1122334455', cv : 'resource/tmp.pdf'},
    {department : 'Product', firstName : 'Tim', lastName : 'Cook', email : 'tim.cook@apple.com', phone : '852369741', cv : 'resource/tmp.pdf'},
];

test.describe(`Connecteam test`, () => {
    testData.forEach(data => {
        test(`Apply to ${data.department} department` , async ({page}) => {
            const landing_p = new LandingPage(page);
            await landing_p.navigate('https://connecteam.com/');
    
            const footer = await landing_p.scrolltoFooter();
            const careerPage = await footer.clickOnItem();
            const innerCareerPage = await careerPage.clickOnSection(data.department);
    
            await innerCareerPage.fillData(data.firstName , data.lastName, 
                data.email, data.phone, data.cv);
        });
    });
});