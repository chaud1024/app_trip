function formatTime(ms: number) {
  // 분, 시간, 일을 초로 환산
  const minuite = 60 * 1000
  const hour = 60 * minuite
  const day = 24 * hour

  // 넘겨받은 초를 기준으로 남은 일수 구하기
  const days = Math.floor(ms / day)

  // 남은 일수가 0보다 작다 = 핫딜 종료
  if (day < 0) {
    return ''
  }

  const 남은시간 = Math.floor((ms - days * day) / hour)
  const 남은분 = Math.floor((ms - days * day - 남은시간 * hour) / minuite)
  const 남은초 = Math.floor(
    (ms - days * day - 남은시간 * hour - 남은분 * minuite) / 1000,
  )

  const HH = `${남은시간}`.padStart(2, '0') // padStart: 2를 02로 표시해줌
  const mm = `${남은분}`.padStart(2, '0')
  const SS = `${남은초}`.padStart(2, '0')

  // 일수가 남으면 ${days}를 보여주고 일수가 남지 않으면(당일이면) 시간만 보여줌
  return days > 0 ? `${days}일 ${HH}:${mm}:${SS}` : `${HH}:${mm}:${SS}`
}

export default formatTime
