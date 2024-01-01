// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
function loginDevelopment() {
  cy.get('[data-cy=login-button]').first().click();
}

function loginDevLocal() {
  // Set cookies
  cy.setCookie('ASSISTmentsServiceRM', 'true');
  cy.setCookie(
    'ASSISTmentsServiceDev',
    'v&2_#_pr&TNG_#_at&741e9947-b19c-49ee-bf8f-7d3fb2a8b285_#_laid&10116_#_'
  );
  cy.setCookie(
    'ASSISTmentsService',
    'v&2_#_pr&TNG_#_at&741e9947-b19c-49ee-bf8f-7d3fb2a8b285_#_laid&10116_#_'
  );
  cy.setCookie('__cfduid', 'd237e1a544d026c09cba736b0371cef8f1617723590');

  // Reload page
  cy.reload();
}

Cypress.Commands.add('login', () => {
  const env = Cypress.env('ENV');

  if (!env || env === 'development') {
    loginDevelopment();
  } else if (env === 'devLocal') {
    loginDevLocal();
  } else {
    // Handle authentication in other environments
  }
});
