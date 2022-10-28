import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

describe('A blog form', () => {
  const dataToSend = {
    title: 'testTitle',
    author: 'new Author',
    url: 'testurl.com'
  }
  test('send correct info when submit button is clicked', async () => {
    const mockSubmit = jest.fn()
    render(<CreateBlogForm isOpen={true} sendBlogInfo={mockSubmit}/>)

    const user = userEvent.setup()

    for(const property in dataToSend) {
      const input = screen.getByLabelText(property)
      await user.type(input, dataToSend[property])
    }

    const button = screen.getByText('Create new blog')
    await user.click(button)

    expect(mockSubmit.mock.calls[0]).toEqual(expect.arrayContaining(Object.values(dataToSend)))

  })
})