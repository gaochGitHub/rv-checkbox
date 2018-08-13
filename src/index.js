import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import VC from './virtualized-checkbox'
class App extends Component {
  getOptions() {
    var options = []
    for (let index = 0; index < 1000; index++) {
      const element = { label: `数据项-${index}`, value: index }
      options.push(element)
    }
    return options
  }
  render() {
    return (
      <div className="App">
        <VC
          filter={true}
          title={'示例数据'}
          defaultValue={[1]}
          disabled={false}
          width={400}
          height={400}
          options={this.getOptions()}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
