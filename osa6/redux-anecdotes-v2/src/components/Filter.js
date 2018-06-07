import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { filterUpdate } from '../reducers/filterReducer'

class Filter extends React.Component {

    handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      const filterValue = event.target.value
      //console.log("filtteri:", filterValue)
      this.props.filterUpdate(filterValue)
    }
    render() {
      const style = {
        marginTop: 10,
        marginBottom: 10
      }

      return (
        <div style={style}>
          filter <input onChange={this.handleChange}/>
        </div>
      )
    }
}
const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}
const mapDispatchToProps = {
  filterUpdate
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter