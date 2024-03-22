import styled from '@emotion/styled'
import { colors } from '@styles/colorPalette'
import { differenceInDays, format, isSameDay, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { DateRange, DayPicker } from 'react-day-picker'

interface RangePickerProps {
  startDate?: string
  endDate?: string
  onChange: (dateRange: { from?: string; to?: string; night: number }) => void
}

const RangePicker = ({ startDate, endDate, onChange }: RangePickerProps) => {
  const today = new Date()

  const handleDayClick = (dateRange: DateRange | undefined) => {
    if (dateRange == null) {
      return
    }
    const { from, to } = dateRange

    console.log(dateRange)

    // 중복된 날짜인 경우
    if (from && to && isSameDay(from, to)) {
      return
    }

    onChange({
      from: from != null ? format(from, 'yyyy-MM-dd') : undefined,
      to: to != null ? format(to, 'yyyy-MM-dd') : undefined,
      night: from && to ? differenceInDays(to, from) : 0,
    })
  }

  const selected = {
    from: startDate != null ? parseISO(startDate) : undefined,
    to: endDate != null ? parseISO(endDate) : undefined,
  }

  return (
    <Container>
      <DayPicker
        locale={ko}
        mode="range"
        numberOfMonths={5}
        defaultMonth={today}
        onSelect={handleDayClick}
        selected={selected}
      />
    </Container>
  )
}

const Container = styled.div`
  padding-bottom: 80px;

  .rdp-month {
    position: relative;
    width: 100%;
    text-align: center;
    padding: 60px 0 30px;
  }

  .rdp-caption {
    position: absolute;
    top: 25px;
    left: 20px;
    color: ${colors.black};
    font-weight: bold;
  }

  .rdp-nav {
    display: none;
  }

  .rdp-table {
    width: 100%;

    .rdp-head_row {
      font-size: 14px;
      height: 45px;
      color: ${colors.gray400};
      font-weight: bold;
    }

    .rdp-tbody {
      .rdp-row {
        height: 45px;

        .rdp-cell {
          .rdp-button {
            position: relative;
            width: 100%;
            line-height: 45px;
            &.rdp-day_selected {
              background-color: ${colors.blue100};

              &.rdp-day_range_start,
              &.rdp-day_range_end {
                color: ${colors.white};
                &::after {
                  display: block;
                  content: '';
                  width: calc(100% - 1px);
                  height: 45px;
                  background-color: ${colors.blue};
                  position: absolute;
                  top: 50%;
                  bottom: 0;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  z-index: -1;
                }
              }
            }
          }
        }
      }
    }
  }
`

export default RangePicker
