import '@mate-academy/cypress-tools/support';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      byDataCy(name: string, text: string): Chainable<JQuery>;
    }
  }
}