# PIT Assessment

Playwright + TypeScript test suite for the [Jupiter Toys](http://jupiter.cloud.planittesting.com) demo app. The structure follows a three-layer Page Object Model — base class, locator definitions, and page action methods are each kept in separate layers.

## Tech Stack

- **Playwright** (`@playwright/test`) — test runner, browser automation, and assertions
- **TypeScript**
- **ESLint** with `eslint-plugin-playwright`
- Browsers: Chromium, Firefox, WebKit

## Prerequisites

Node.js 18+ and npm.

```bash
node -v
npm -v
```

## Setup

```bash
npm install
npx playwright install
```
On Linux or CI add `--with-deps` to pull in the OS-level browser dependencies too.

## Project Structure

The project follows a three-layer POM. Locators are placed in `pageobjects/`, actions in `pages/`, and the shared base class in `base/`. Tests are in `tests/`, fixtures in `fixtures/`, and test data in `testdata/`.

## Page Object Model

The POM here uses three layers:

- **`base/`** — `BasePage` holds the shared `Page` instance, `cartNavLink` locator, and `navigateToHome()`. All page classes extend it.
- **`pageobjects/`** — one file per page, locators only. No actions class.
- **`pages/`** — extends its matching locator class and adds the actual user-facing methods.

Specs and fixtures only import from `pages/` — raw locators never leak into test code.

Test data (form input, cart items and quantities) is kept in `testdata/` so it can be updated without touching the specs.

## Fixtures

`fixtures/index.ts` extends Playwright's base `test` with three pre-configured page objects:

- **`contactPage`** — navigates to the Contact page before the test runs
- **`shopPage`** — navigates to the Shop page before the test runs
- **`cartPage`** — cart page actions

Specs import `{ test, expect }` from `../../fixtures` rather than from `@playwright/test`, so the custom page fixtures are available in every test.

## Running Tests

| Command | What it does |
| --- | --- |
| `npm test` | Run all tests across all configured browsers |
| `npm run test:headed` | Same with the browser window visible |
| `npm run test:ui` | Playwright's interactive UI mode |
| `npm run report` | Open the last HTML report |
| `npm run lint` | Run ESLint across tests, pages, pageobjects, base, fixtures, and testdata |
| `npm run lint:fix` | Same as above but auto-fixes fixable issues |
| `npx playwright test tests/contact/contact.spec.ts` | Run a single spec file |
| `npx playwright test --project=chromium` | Limit to one browser |
| `npx playwright test --debug` | Step through with the Playwright Inspector |

The HTML report is written to `playwright-report/`.

## CI — GitHub Actions

A workflow is included at `.github/workflows/playwright.yml`. Push to `master` and the workflow installs dependencies, runs the full test suite, and uploads the HTML report as an artifact (retained for 30 days).

## Troubleshooting

If tests are timing out, increase `timeout` and `expect.timeout` in `playwright.config.ts`.

## Assumptions, Trade-offs and Known Issues

**Assumptions**
- The Jupiter Toys demo site (`http://jupiter.cloud.planittesting.com`) is accessible at the time of running. It is a shared demo environment with no uptime guarantees.
- The shop items used in TC3 (Stuffed Frog, Fluffy Bunny, Valentine Bear) are assumed to be present in the shop and their prices are read dynamically from the page, so the test remains valid even if prices change.

**Trade-offs**
- The assertion timeout is raised to 20s and the test timeout to 60s to account for the demo server being slow under load. This makes runs take longer but avoids false failures caused by network latency rather than actual bugs.
- TC2 runs 5 iterations using a loop within a single describe block rather than 5 separate test cases. This keeps the spec clean and demonstrates submission stability without code repetition.
- On CI, `workers` is set to 1 to run tests sequentially. The demo site is a shared environment and parallel requests can cause intermittent failures, so stability was prioritised over speed.
- The POM is split into three layers (base, pageobjects, pages). The extra layer keeps locator definitions and page actions completely decoupled, which makes both easier to maintain as the suite grows.

**Known Issues**
- TC2 can occasionally be slow on the first submission due to the demo server cold-starting. The raised timeouts handle this in most cases, but a retry on CI (`retries: 2`) is in place as a safety net.

## References

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Page Object Models](https://playwright.dev/docs/pom)