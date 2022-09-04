import { recurse } from 'cypress-recurse'

describe('Issues list being filtered by state filter "Open" and has column "Comments" sorted in ascending order ', () => {
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
    
    //Test case 6 
    //Table should have 6 columns 
    cy.get('[class="styles_table__2oqWN"]').find('th').should('have.length', 6)

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

    //Test case 7
    //Double click on header "Comments" in order to have elements represended in ascending way
    cy.get('[class*="styles_sortable__6UBJX"]').children().first().click();
    cy.wait(3000)
    cy.get('[class*="styles_sortable__6UBJX"]').children().first().click();

    //Storing values of column "Comments" into an array 
    let array_asc=[];

    cy.get('tbody tr').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('td').eq(4).invoke('text').as('number')
          cy.get('@number').then((number) => {array_asc.push(number); }) })
     }).then(()=>{
      let array_asc2 = array_asc.slice();
      cy.wrap(array_asc2).should("deep.eq", array_asc.sort());
    })

  })
})
