import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders title', () => {
      const blog = {
        title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
        author: "Matti ja Teppo",
        likes: 6
      }
  
      const blogComponent = shallow(<SimpleBlog blog={blog} />)
      const contentDiv = blogComponent.find('.content')
  
      expect(contentDiv.text()).toContain(blog.title)
    })
    it('renders author', () => {
        const blog = {
          title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
          author: "Matti ja Teppo",
          likes: 6
        }
    
        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        const contentDiv = blogComponent.find('.content')
    
        expect(contentDiv.text()).toContain(blog.author)
      })
      it('renders likes', () => {
        const blog = {
          title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
          author: "Matti ja Teppo",
          likes: 6
        }
    
        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        const likesDiv = blogComponent.find('.likes')
    
        expect(likesDiv.text()).toContain(`blog has ${blog.likes} likes`)
      })
  })