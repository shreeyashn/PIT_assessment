import { type Locator } from '@playwright/test';
import { BasePage } from '../base/base';

export class ContactPageLocators extends BasePage {
  get contactNavLink(): Locator {
    return this.page.getByRole('link', { name: 'Contact' });
  }

  get forename(): Locator {
    return this.page.locator('#forename');
  }

  get email(): Locator {
    return this.page.locator('#email');
  }

  get messageText(): Locator {
    return this.page.locator('#message');
  }

  get submitButton(): Locator {
    return this.page.locator('a.btn-contact');
  }

  get forenameError(): Locator {
    return this.page.locator('#forename-err');
  }

  get emailError(): Locator {
    return this.page.locator('#email-err');
  }

  get messageError(): Locator {
    return this.page.locator('#message-err');
  }

  get errorBanner(): Locator {
    return this.page.locator('.alert-error');
  }

  get successMessage(): Locator {
    return this.page.locator('.alert-success');
  }
}
