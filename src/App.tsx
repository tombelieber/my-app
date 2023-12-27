import "./App.css"
import Benchmark from "./features/rust-wasm-benchmark/Benchmark"
import logo from "./logo.svg"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <Counter /> */}
        <Benchmark />
      </header>
    </div>
  )
}

export default App
