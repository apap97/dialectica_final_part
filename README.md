# dialectica_part_2

Repository that includes my test scripts for the part 2 stage of Dialectica's assignment.

<< Information about the the folder "e2e" >>

Folder "e2e" contains three(3) basic subfolders and one script:
  1. issues_list
  2. pull_requests_list
  3. forks_list
  4. start.cy.js Includes basic test cases(Starting from test case 1 to 5 from the test plan)
  
Below the structure of each subfolder:
        
     1."issues_table" folder includes test script based on the functionalities of sorting:
        a) "issues_filter_all" folder contains test scripts about the correct function of ascending and descending sorting when state filter is "All"
           i.issuesTableAllCommentsASC.cy.js
           ii.issuesTableAllCommentsDESC.cy.js
           iii.issuesTableAllCreatedASC.cy.js
           iv.issuesTableAllCreatedDESC.cy.js
          
        b) "issues_filter_closed" folder contains test scripts about the correct function of ascending and descending sorting when state filter is "Closed"
           i.issuesTableClosedCommentsASC.cy.js
           ii.issuesTableClosedCommentsDESC.cy.js
           iii.issuesTableClosedCreatedASC.cy.js
           iv.issuesTableClosedCreatedDESC.cy.js
          
        c) "issues_filter_open" folder contains test scripts about the correct function of ascending and descending sorting when state filter is "Open"
           i.issuesTableOpenCommentsASC.cy.js
           ii.issuesTableOpenCommentsDESC.cy.js
           iii.issuesTableOpenCreatedASC.cy.js
           iv.issuesTableOpenCreatedDESC.cy.js
 
 In the same way, the other two(2) subfolders(pull_requests_list and forks_list) are structured.
