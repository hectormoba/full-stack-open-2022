const userBodyReq = {
  username: 'testUser',
  name: 'user',
  password: 'test1234'
}

const blogPost = {
  title: 'Blog title',
  author: 'Important Author',
  url: 'testurl.com',
  likes: 10
}

const severalBlogPosts = [
  {
    title: 'First Important Post',
    author: 'Author AA',
    url: 'testurl.com',
    likes: 5
  },
  {
    title: 'The NEW important Post',
    author: 'Author AB',
    url: 'testurl.com',
    likes: 4
  },
  {
    title: 'Simple Post',
    author: 'Author AC',
    url: 'testurl.com',
    likes: 0
  }
]

describe('Blog app', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', userBodyReq)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shwoen', function() {
    cy.get('button').contains('login')
  })

  describe('Login', function(){
    it('succeed with correct credentials', function(){
      cy.loginUI(userBodyReq.username, userBodyReq.password)
      cy.contains(`${userBodyReq.username} is logged in`)
    })

    it('fails with wrong credentials', function(){
      cy.loginUI('wrongUser', 'wrongPwd')
      cy
        .contains('invalid username or password')
        .then( element => expect(element).to.have.css('color', 'rgb(255, 0, 0)'))
    })
  })

  describe('when user is logged in', function(){
    const { title, author, url } = blogPost

    beforeEach(function(){
      cy.loginAPI(userBodyReq.username, userBodyReq.password)
    })

    it('can create a blog post', function(){
      cy.contains('open').click()
      cy.get('label').contains('title').find('input').type(title)
      cy.get('label').contains('author').find('input').type(author)
      cy.get('label').contains('url').find('input').type(url)
      cy.get('button').contains('Create new blog').click()
      cy.get('p').contains(title)
    })

    it('can like a blog', function(){
      cy.createPost(blogPost)
      cy.loginAPI(userBodyReq.username, userBodyReq.password)
      cy.contains('view').click()
      cy.get('div').contains('like').click()
    })

    it('can delete their own post', function() {
      cy.createPost(blogPost)
      cy.loginAPI(userBodyReq.username, userBodyReq.password)
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.get('main').should( element => {
        expect(element).to.not.contain(blogPost.title)
      })
    })

    it('can press like button several times and the list order is that we expected', function(){
      cy.createPost(severalBlogPosts[0])
      cy.createPost(severalBlogPosts[1])
      cy.createPost(severalBlogPosts[2])
      cy.loginAPI(userBodyReq.username, userBodyReq.password)
      cy.get('section').as('blogSection')

      cy
        .get('@blogSection')
        .contains(severalBlogPosts[1].title)
        .parent()
        .as('newPostElement')
      cy.get('@newPostElement')
        .contains('view')
        .click()
      cy.contains('like').click()
      cy.wait(1500)
      cy.contains('like').click()
      cy.get('button').contains('Logout').click()
      cy.wait(1000).then( _ => {
        localStorage.removeItem('user')
      })
      cy.loginAPI(userBodyReq.username, userBodyReq.password)
      cy.get('@blogSection').eq(0).should('contain', severalBlogPosts[1].title)
      cy.get('@blogSection').eq(1).should('contain', severalBlogPosts[0].title)
    })
  })
})
