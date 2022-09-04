describe('Basic information of the app is the desired', () => {
  it('Tests the basic information of the app', () => {
    
    //Entering "https://refactored--dia-slender-explorer-qa.netlify.app" 
    cy.visit('https://refactored--dia-slender-explorer-qa.netlify.app/')

    //Typing github token in 1st placeholder
    cy.get("input[placeholder=\"Your access token\"]").type("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");
    
    //Typing "e.g. facebook/react" in 2nd placeholder
    cy.get("input[placeholder=\"e.g. facebook/react\"]").type("facebook/react");
    
    //Clicking entrance button 
    cy.get('[class*="styles_search__1YRvI"]').click()

     //Wait up to 30 seconds for button "Load More" to exist before continuing the test
    cy.get('[class*="styles_loadMoreWrapper__UNA_a"]', { timeout: 30000 })

    cy.get('[class*="styles_loadMoreWrapper__UNA_a"]').click();

    //Test case 1
    //The description of repo that is being displayed(if available)
    cy.get('[class="styles_basicInfo__2HeY0"]')
      .children()
      .eq(1)
      .should('be.visible')

    //Test case 2
    //The lists of repo are being displayed are the expected
    cy.get('[class="styles_tabs__X7Vzc"]')
      .children()
      .should('have.length',3)
      .invoke('text')
      .then((text) => {
            var questionText = text.replace(/[0-9]/g, '');
           expect(questionText).to.equal("IssuesPull RequestsForks")
     })

    //Test case 3
    //Max sum of the programming languages are being displayed is four(4) e.g. 1)C, 2)C++, 3)Java, 4)Other
     cy.get('[class="recharts-default-legend"]')
       .children()
       .should('have.length',4)

    //Test case 4
    //Number of repo stars are being displayed
    cy.get('[ class="styles_star__18TfB"]')
      .children()
      .eq(0)
      .should('be.visible')

    //Test case 5
    //Toggle the repo(star/unstar)
    cy.get('[ class="styles_star__18TfB"]')
      .children()
      .eq(1)
      .click()
      //.should('be.checked')
  })
  
})