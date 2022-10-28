import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('A Blog component', () => {

  let blog, component

  beforeAll(() => {
    blog = {
      title: 'Test',
      author: 'No name author',
      likes: 11,
      url: 'testurl.com',
      user: {
        username: 'usernameTest'
      }
    }

    component = <Blog blog={blog} loggedUsername={blog.user.username}/>
  })


  test('renders title and author when is closed', () => {

    render(component)

    const author = screen.getByText(blog.author)
    const title = screen.getByText(blog.title)

    expect(author).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })

  test('displays url and number of likes when user clicks a button', async () => {
    render(component)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    const urlNotThere = screen.queryByText(blog.url)
    const likesNotThere = screen.queryByText(blog.likes)
    expect(urlNotThere).toBe(null)
    expect(likesNotThere).toBe(null)
    await user.click(button)
    const urlThere = screen.getByText(blog.url)
    const likesThere = screen.getByText(blog.likes, { exact: false })
    expect(urlThere).toBeInTheDocument()
    expect(likesThere).toBeInTheDocument()

  })

  test('call function twice when button is clicked', async () => {

    const mockedClick = jest.fn()

    render(<Blog blog={blog} loggedUsername={blog.user.username} handleClickInProps={mockedClick}/>)

    const user = userEvent.setup()

    const openButton = screen.getByText('view')
    await user.click(openButton)

    const likeButton = screen.getByRole('button', { name: 'like' })
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockedClick.mock.calls).toHaveLength(2)
  })
})
