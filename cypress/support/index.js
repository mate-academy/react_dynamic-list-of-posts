require('@mate-academy/cypress-tools/support');

Cypress.Commands.add(
  'byDataCy',
  { prevSubject: 'optional' },
  
  (subject, name, text = '') => {
    const target = subject || cy;
    const selector = `[data-cy="${name}"]`;

    if (text) {
      return target.contain(selector, text);
    }

    return subject
      ? subject.find(selector)
      : cy.get(selector);
  },
);
