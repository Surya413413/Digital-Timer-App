// Write your code here
import {Component} from 'react'

import './index.css'

const initial = {
  count: 0,
  isTimingRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initial

  increseCount = () => {
    this.setState(previous => ({
      timerLimitInMinutes: previous.timerLimitInMinutes + 1,
    }))
  }
  decreseCount = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(previous => ({
        timerLimitInMinutes: previous.timerLimitInMinutes - 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimingRunning, timeElapsedInSeconds, timerLimitInMinutes} =
      this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimingRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimingRunning: !prevState.isTimingRunning}))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimingRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  reSetButton = () => {
    this.clearTimerInterval()
    this.setState(initial)
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimingRunning, timeElapsedInSeconds, timerLimitInMinutes} =
      this.state
    const isDisableBUtton = timeElapsedInSeconds > 0
    const text = isTimingRunning ? 'Running' : 'Paused'
    const icons = isTimingRunning ? 'pause icon' : 'play icon'
    return (
      <div className="app-container">
        <h1>Digital Timer</h1>
        <div className="second-container">
          <div className="timing-container">
            <h1>{this.getElapsedSecondsInTimeFormat()}</h1>
            <p>{text}</p>
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/digital-timer-elapsed-bg.png"
              className="timer"
            />

            <div className="fourth-container">
              <button
                className="button"
                type="button"
                onClick={this.onStartOrPauseTimer}
              >
                <img
                  src={
                    isTimingRunning
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  className="play-icon"
                  alt={icons}
                />{' '}
                <p>{isTimingRunning ? 'Pause' : 'Start'}</p>
              </button>
              <button
                className="button"
                type="button"
                onClick={this.reSetButton}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                  className="play-icon"
                  alt="reset icon"
                />{' '}
                Reset
              </button>
            </div>
            <div className="third-container">
              <p>Set Timer Limit</p>
              <div className="incre-desc-container">
                <button
                  className="minus-button"
                  type="button"
                  disabled={isDisableBUtton}
                  onClick={this.decreseCount}
                >
                  -
                </button>
                <p className="number-count">{this.state.timerLimitInMinutes}</p>
                <button
                  className="minus-button"
                  type="button"
                  onClick={this.increseCount}
                  disabled={isDisableBUtton}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
