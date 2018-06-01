import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app
    beforeAll(() => {
      app = mount(<App />)
    })
  
    it('renders login form if user not made login yet', () => {
      app.update()
      const loginComponent = app.find(LoginForm)
      expect(loginComponent.length).toEqual(1)

      const loginTitle = loginComponent.find('.login')
      expect(loginTitle.text()).toEqual("Kirjaudu")
    })

    it('renders no blogs if user not made login yet', () => {
        app.update()
        const blogComponent = app.find(Blog)
        expect(blogComponent.length).toEqual(0)
  
        const blogsTitle = app.find('.blogsTitle')
        expect(blogsTitle.length).toEqual(0)
      })
  })