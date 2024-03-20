import { Link } from 'react-router-dom'

import ListRow from '@components/shared/ListRow'

const SettingsPage = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/settings/like">
            <ListRow
              as="div"
              contents={
                <ListRow.Texts title="찜하기" subTitle="찜한 호텔 목록" />
              }
              withArrow={true}
            />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SettingsPage
