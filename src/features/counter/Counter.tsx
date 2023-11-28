import { useEffect, useRef, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import styles from "./Counter.module.css"
import { setData } from "./counterSlice"

const formatPercentage = (value: number): string =>
  `${(100 * value).toFixed(2)}%`

const calculatePercentageDifference = (
  value1: number,
  value2: number,
): string => {
  return value1 && value2 ? formatPercentage(value2 / value1) : "N/A"
}

export function Counter() {
  const dispatch = useAppDispatch()
  const storeRef = useRef<Map<string, { delta: number }>>(new Map())
  const [maxCount, setMaxCount] = useState<number>(100)
  const [sampleSize, setSampleSize] = useState<number>(100)
  const [dispatchSetDataTimes, setDispatchSetDataTimes] = useState<number[]>([])
  const [mutateMapTimes, setMutateMapTimes] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [elapsedTime, setElapsedTime] = useState<number>(0)

  const dispatchSetData = (): void => {
    const start = performance.now()
    for (let i = 0; i < maxCount; i++) {
      dispatch(
        setData({
          key: `${i}`,
          value: { delta: i },
        }),
      )
    }
    const end = performance.now()
    console.log(`dispatch ${maxCount} times takes ${end - start} ms`)
  }

  const mutateMap = (): void => {
    const start = performance.now()
    for (let i = 0; i < maxCount; i++) {
      storeRef.current.set(`${i}`, { delta: i })
    }
    const end = performance.now()
    console.log(`mutate Map ${maxCount} times takes ${end - start} ms`)
  }

  const calculateSum = (times: number[]): number =>
    times.reduce((a, b) => a + b, 0)

  const calculateStats = (times: number[]) => {
    const sum = calculateSum(times)
    const max = Math.max(...times)
    const min = Math.min(...times)
    const mean = sum / times.length
    const sorted = [...times].sort((a, b) => a - b)
    const median =
      sorted.length % 2 !== 0
        ? sorted[Math.floor(sorted.length / 2)]
        : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    return { sum, max, min, median, mean }
  }

  const runTest = async (
    testFunction: () => void,
    setResult: React.Dispatch<React.SetStateAction<number[]>>,
  ) => {
    let results: number[] = []
    for (let i = 0; i < sampleSize; i++) {
      const start = performance.now()
      testFunction()
      const end = performance.now()
      results.push(end - start)
    }
    setResult(results)
  }

  const runTests = async () => {
    setIsLoading(true)
    const startTime = performance.now()
    await runTest(dispatchSetData, setDispatchSetDataTimes)
    await runTest(mutateMap, setMutateMapTimes)
    setIsLoading(false)
    const endTime = performance.now()
    setElapsedTime((endTime - startTime) / 1000)
  }

  const dispatchStats = calculateStats(dispatchSetDataTimes)
  const mapStats = calculateStats(mutateMapTimes)

  return (
    <div>
      <div>Perf Test for Redux Toolkit</div>
      <div className={styles.row}>
        <label htmlFor="maxCount">Max Count</label>
        <input
          id="maxCount"
          type="number"
          value={maxCount}
          onChange={(e) => setMaxCount(Number(e.target.value))}
        />

        <label htmlFor="sampleSize">Sample Size</label>
        <input
          id="sampleSize"
          type="number"
          value={sampleSize}
          onChange={(e) => setSampleSize(Number(e.target.value))}
        />
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="dispatchSetData"
          onClick={dispatchSetData}
        >
          dispatchSetData
        </button>
        <button
          className={styles.button}
          aria-label="mutateMap"
          onClick={mutateMap}
        >
          mutateMap
        </button>
      </div>

      <div>
        <button onClick={runTests} disabled={isLoading}>
          {elapsedTime
            ? `Running Tests (${elapsedTime.toFixed(2)} seconds)`
            : "Run Tests"}
        </button>
        <p>{elapsedTime.toFixed(2)}</p>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Dispatch Set Data</th>
              <th>Mutate Map</th>
              <th>Difference by X</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sum (ms)</td>
              <td>{dispatchStats.sum.toFixed(2)}ms</td>
              <td>{mapStats.sum.toFixed(2)}ms</td>
              <td>
                {calculatePercentageDifference(dispatchStats.sum, mapStats.sum)}
              </td>
            </tr>
            <tr>
              <td>Max (ms)</td>
              <td>{dispatchStats.max.toFixed(2)}ms</td>
              <td>{mapStats.max.toFixed(2)}ms</td>
              <td>
                {calculatePercentageDifference(dispatchStats.max, mapStats.max)}
              </td>
            </tr>
            <tr>
              <td>Min (ms)</td>
              <td>{dispatchStats.min.toFixed(2)}ms</td>
              <td>{mapStats.min.toFixed(2)}ms</td>
              <td>
                {calculatePercentageDifference(dispatchStats.min, mapStats.min)}
              </td>
            </tr>
            <tr>
              <td>Median (ms)</td>
              <td>{dispatchStats.median.toFixed(2)}ms</td>
              <td>{mapStats.median.toFixed(2)}ms</td>
              <td>
                {calculatePercentageDifference(
                  dispatchStats.median,
                  mapStats.median,
                )}
              </td>
            </tr>
            <tr>
              <td>Mean (ms)</td>
              <td>{dispatchStats.mean.toFixed(2)}ms</td>
              <td>{mapStats.mean.toFixed(2)}ms</td>
              <td>
                {calculatePercentageDifference(
                  dispatchStats.mean,
                  mapStats.mean,
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
