// Type 'node_modules/.bin/cypress open' in the console to start Cypress.

let title = 'netflixroulettes';
let srcForTesting = 'http://localhost:8080/';

describe('App functionality', () => {

  it('Should check that <title> is correct', () => {
    cy.visit(srcForTesting);

    cy.title().should('include', title);
  })


  context('Actions', () => {
    beforeEach(() => {
      cy.visit(srcForTesting);
    });

    it('Should type into a Search input', () => {

      cy.get('.searchInput')
        .type('test').should('have.value', 'test');
    });

    it('Should search results when clicking button SEARCH BY', () => {

      cy.get('.searchInput')
        .type('films');
      cy.get('.searchForm button').click();
      cy.get('.searchResults').children().should('have.class','movieBlock');

    });

    it('Should search results when clicking ENTER on keyboard', () => {

      cy.get('.searchInput')
        .type('films');
      cy.get('.searchForm').submit();
      cy.get('.searchResults').children().should('have.class','movieBlock');

    });

    it('Should find "sort" blocks after clicking SEARCH BY button', () => {

      cy.get('.searchInput')
        .type('films');
      cy.get('.searchForm button').click();
      cy.get('.sortContainer').find('button').should('contain', 'SORT BY');
      cy.get('.sortContainer').find('.sort .radioButtons');
    });

    it('Should search by genre', () => {
      let searchText = 'Dra';

      cy.get('.searchInput')
        .type(searchText);
      cy.get('.searchForm').find('.radioButtons label:last-child').find('span').should('contain', 'genre');
      cy.get('.searchForm').find('.radioButtons label:last-child').click();
      cy.get('.searchForm button').click();
      cy.get('.searchResults').children().find('p').should('contain', searchText);
    });

    it('Should search by title', () => {
      let searchText = 'A';

      cy.get('.searchInput')
        .type(searchText);
      cy.get('.searchForm').find('.radioButtons label:nth-child(2)').find('span').should('contain', 'title');
      cy.get('.searchForm').find('.radioButtons label:nth-child(2)').find('span').should('contain', 'title').click();
      cy.get('.searchForm button').click();
      cy.get('.searchResults').children().find('h5').should('contain', searchText);
    });

    it('Should show warning if SEARCH BY button clicked without added text in search input', () => {
      let warningMsg = 'Fill in the search field, please!';

      cy.get('.searchForm button').click();
      cy.get('.warning').should('contain', 'Fill in the search field, please!');
    })

    it('Should show found results quantity', () => {
      let arr;
      cy.get('.searchInput')
        .type('films');
      cy.get('.searchForm').submit();
      cy.get('.sortContainer').find('p').should('contain', 'movies found');
      cy.get('.sortContainer').find('span').should('have.class', 'moviesCount');
    })

  })
})
