import { parse} from "date-fns"
import { recurse } from 'cypress-recurse'

describe('Forks list has column "Created" sorted in ascending order', () => {
  it('Tests if column "Created" is sorted in ascending order', () => {
     
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

    //Test case 34
    //Table should have 4 columns 
    cy.get('[class="styles_table__2oqWN"]').find('th').should('have.length', 4)

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

    //Test case 37
    //Double click on header "Created" in order to have elements represended in ascending way
    cy.get('[class*="styles_sortable__6UBJX"]').children().eq(1).click();
    cy.wait(20000)
    cy.get('[class*="styles_sortable__6UBJX"]').children().eq(1).click();
    cy.wait(20000)
    
    //Variables that will help us interacting with dates 
    const parseDate = date => parse(date, "dd.MM.yyyy", new Date())
    let prevDate1 = parseDate("01.01.1970")
    const currentDate1 =parseDate("01.01.2060")
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    cy.get('tbody tr').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('td').eq(3).invoke('text').as('date')
          cy.get('@date').then((date1) => {

            var month = date1.split(' ')[0]
            month = months.indexOf(month);
            var year = date1.split(',')[1].split(' ')[1]
            var number = date1.split(' ')[1].split(',')[0]
            
            currentDate1.setMonth(month)
            currentDate1.setDate(number)
            currentDate1.setFullYear(year)

            expect(prevDate1).to.be.lte(currentDate1)

            prevDate1.setDate(currentDate1.getDate())
            prevDate1.setMonth(currentDate1.getMonth())
            prevDate1.setFullYear(currentDate1.getFullYear())
            
    }) 
  })
})







    })
  })