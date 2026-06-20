import { test, expect } from '../../fixtures';
import { ContactData } from '../../testdata/contact';

test.describe('Contact Page - Form Validation', () => {
  test('TC1: mandatory field errors appear on empty submit and clear after valid data entry', async ({ contactPage }) => {
    await contactPage.clickSubmit();

    await expect(contactPage.forenameError).toBeVisible();
    await expect(contactPage.emailError).toBeVisible();
    await expect(contactPage.messageError).toBeVisible();
    await expect(contactPage.errorBanner).toBeVisible();

    await contactPage.fillMandatoryFields(
      ContactData.forename,
      ContactData.email,
      ContactData.message,
    );

    await expect(contactPage.forenameError).not.toBeVisible();
    await expect(contactPage.emailError).not.toBeVisible();
    await expect(contactPage.messageError).not.toBeVisible();
    await expect(contactPage.errorBanner).not.toBeVisible();
  });
});

test.describe('Contact Page - Successful Submission', () => {
  for (let run = 1; run <= 5; run++) {
    test(`TC2 (run ${run}/5): successful submission displays confirmation message`, async ({ contactPage }) => {
      
      await contactPage.fillMandatoryFields(
        ContactData.forename,
        ContactData.email,
        ContactData.message,
      );

      await contactPage.clickSubmit();
      await expect(contactPage.successMessage).toBeVisible();
      await expect(contactPage.successMessage).toContainText('we appreciate your feedback');
    });
  }
});
