Cypress.Commands.add('loginUI', (username, password) => {
  cy.get('label').contains('username').find('input').type(username)
  cy.get('label').contains('password').find('input').type(password)
  cy.get('button').contains('login').click()
})

Cypress.Commands.add('loginAPI', (username, password) => {
  cy
    .request('POST', 'http://localhost:3003/api/login', { username, password })
    .then(({ body }) => {
      localStorage.setItem('user', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createPost', (postObject) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: postObject,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})