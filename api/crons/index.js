import pushSchedules from './Notify'

const crons = [
  pushSchedules
]

function taskRunner () {
  crons.map((cron) => cron())
}

export default taskRunner
