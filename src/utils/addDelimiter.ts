// 원단위 구분자 만드는 함수

export default function addDelimiter(value: number | string, delimiter = ',') {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
  // 정규식을 사용하여 세 자리마다 구분자를 넣어주는 함수
}
