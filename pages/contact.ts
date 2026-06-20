import { Page } from '@playwright/test';
import { ContactPageLocators } from '../pageobjects/contactpagelocators';

export class ContactPage extends ContactPageLocators {
  constructor(page: Page) {
    super(page);
  }

  async goToContactPage(): Promise<void> {
    await this.contactNavLink.click();
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  async fillMandatoryFields(forename: string, email: string, message: string): Promise<void> {
    await this.forename.fill(forename);
    await this.email.fill(email);
    await this.messageText.fill(message);
  }
}
