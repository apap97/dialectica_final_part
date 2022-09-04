import { parse } from "date-fns"
import { recurse } from 'cypress-recurse'

describe('Issues list being filtered by state filter "Open" and has column "Created" sorted in descending order ', () => {
  it('Tests if column "Created" is sorted in descending order while state filter value equals "Open"', () => {
     
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

    cy.wait(1500)

    //Test case 10
    //Double click on header "Created" in order to have elements represended in descending way
    cy.get('[class*="styles_sortable__6UBJX"]').children().eq(1).click();
    cy.wait(3000)
    cy.get('[class*="styles_sortable__6UBJX"]').children().eq(1).click();
    cy.wait(3000)

    //Variables that will help us interacting with dates
    const parseDate = date => parse(date, "dd.MM.yyyy", new Date())
    let prevDate = parseDate("01.01.2060")
    const currentDate =parseDate("01.01.1970")
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    cy.get('tbody tr').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('td').eq(5).invoke('text').as('date')
          cy.get('@date').then((date1) => {

            var month = date1.split(' ')[0]
            month = months.indexOf(month);
            var year = date1.split(',')[1].split(' ')[1]
            var number = date1.split(' ')[1].split(',')[0]
            
            currentDate.setMonth(month)
            currentDate.setDate(number)
            currentDate.setFullYear(year)

            expect(prevDate).to.be.gte(currentDate)

            prevDate.setDate(currentDate.getDate())
            prevDate.setMonth(currentDate.getMonth())
            prevDate.setFullYear(currentDate.getFullYear())
            
    }) 
  })
})
  })
})
