import React from "react"
import "./App.css"
import VC from "./virtualized-checkbox"
function App() {
  function getOptions() {
    var options = []
    for (let index = 0; index < 1000; index++) {
      const element = { label: `数据项-${index}`, value: index }
      options.push(element)
    }
    return options
  }
  return (
    <div className="App">
      <VC
        filter={true}
        title={"示例数据"}
        defaultValue={[1]}
        disabled={false}
        width={400}
        height={400}
        onChange={v => console.log(v)}
        options={getOptions()}
      />
    </div>
  )
}

export default App
