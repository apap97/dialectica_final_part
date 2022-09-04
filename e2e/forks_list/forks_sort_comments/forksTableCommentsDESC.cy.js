import { recurse } from 'cypress-recurse'

describe('Forks list has column "Comments" sorted in ascending order', () => {
  it('Tests if column "Comments" is sorted in descending order', () => {
     
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

    //Firstly, transition to "Fork" table 
    cy.get('a[href="/forks"]').click()

    cy.wait(5000)

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

    //Test case 36
    //Single click on header "Stars" in order to have elements represended in descending way
    cy.get('[class*="styles_sortable__6UBJX"]').children().first().click();
    cy.wait(15000)

    //Storing values of column "Stars" into an array 
    let array_desc=[];

    cy.get('tbody tr').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('td').eq(2).invoke('text').as('number')
          cy.get('@number').then((number) => {array_desc.push(number); }) })
     }).then(()=>{
      let array_desc2 = array_desc.slice();
      cy.wrap(array_desc2.sort()).should("deep.eq", array_desc.sort());

     })



    })
  })