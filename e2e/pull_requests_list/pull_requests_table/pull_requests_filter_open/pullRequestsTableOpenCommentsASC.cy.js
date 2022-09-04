import { recurse } from 'cypress-recurse'

describe('Pull Requests list being filtered by state filter "Open" and has column "Comments" sorted in ascending order ', () => {
  it('Tests if column "Comments" is sorted in ascending order while state filter value equals "Open"', () => {
     
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
    
    //Firstly, transition to "Pull Request" table 
    cy.get('a[href="/pull-requests"]').click()

    cy.wait(2500)

    //Test case 20
    //Table should have 5 columns 
    cy.get('[class="styles_table__2oqWN"]').find('th').should('have.length', 5)

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

    //Test case 21
    //Double click on header "Comments" in order to have elements represended in ascending way
    cy.get('[class*="styles_sortable__6UBJX"]').children().first().click();
    cy.wait(3000)
    cy.get('[class*="styles_sortable__6UBJX"]').children().first().click();
    cy.wait(3000)
    
    //Storing values of column "Comments" into an array 
    let array_asc=[];

    cy.get('tbody tr').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('td').eq(3).invoke('text').as('number')
          cy.get('@number').then((number) => {array_asc.push(number); }) })
     }).then(()=>{
      let array_asc2 = array_asc.slice();
      cy.wrap(array_asc2).should("deep.eq", array_asc.sort());
    })

  })
})
