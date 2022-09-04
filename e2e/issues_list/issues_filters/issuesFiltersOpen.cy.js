import { recurse } from 'cypress-recurse'

describe('Testing state filter "Open" of <<Issues>> list', () => {
  it('Tests state filter "Open" on table Issues', () => {
    
     //Entering "https://refactored--dia-slender-explorer-qa.netlify.app" 
     cy.visit('https://refactored--dia-slender-explorer-qa.netlify.app/')

     //Typing github token in 1st placeholder
     cy.get("input[placeholder=\"Your access token\"]").type("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");
     
     //Typing "e.g. facebook/react" in 2nd placeholder
     cy.get("input[placeholder=\"e.g. facebook/react\"]").type("facebook/react");
     
     //Clicking entrance button 
     cy.get('[class*="styles_search__1YRvI"]').click()
 
     //Wait until button "Load more" could be found 
     cy.get('[class*="styles_loadMoreWrapper__UNA_a"]', { timeout: 30000 })
 

    //Test case 11
    //Default value of state filter is: Open
    cy.get('[class*="styles_filter__1xfmi"]').find(':selected').should('have.text','Open')
  
    //Test case 12
    //Correct values of state filter: 1)Open(default), 2)Closed, 3)All
    cy.get('[class*="styles_filter__1xfmi"]').children().invoke('text').should('eq', 'Show: OpenClosedAll')


      //Recursive method to cross the map until text "End of list" found
      recurse(
        function () { 
          return cy.get('[class*="styles_loadMoreWrapper__UNA_a"]').children().invoke('text')
        },
        function ($inner_text) {  
          return expect($inner_text).equal("End of list")
        },
        {
          log: false,
          limit: 100000000,
          timeout: 200_000_000,
          delay: 700,
          post() {
            cy.get('[class*="styles_loadMoreWrapper__UNA_a"]').click()
          },
        },
      )

    
    //Test case 13 
    //Only items of list that have state "Open" should be displayed
    cy.get('tbody tr').each(($el) => {
    cy.wrap($el).within(() => {cy.get('td').eq(3).should('have.text', 'OPEN') 
      })
   })

    cy.wait(500)

    //Test case 16
    //Assertion that the sum of rows of the table when state filter is "Open" is equal to the number displayed besides Issues e.g. Issues(780)
    cy.get('[class*="styles_table__2oqWN"]')
      .children()
      .not('thead')
      .find("tr")
      .then((row) => {          
          cy.get('[class*="styles_title__uhysM"]')
            .children()
            .invoke('text')
            .then((text) => {
              var total_number_open = Number(text.split('(')[1].split(')')[0])
              expect(total_number_open).to.equal(row.length)
       })
    });


 
  })
})