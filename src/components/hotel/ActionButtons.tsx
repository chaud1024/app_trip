import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import useShare from '@hooks/useShare'
import { Hotel } from '@models/hotel'

const ActionButtons = ({ hotel }: { hotel: Hotel }) => {
  const share = useShare()

  const { name, comment, mainImageUrl } = hotel

  return (
    <Flex css={containerStyles}>
      <Button
        label="찜하기"
        onClick={() => {}}
        iconUrl="https://cdn3.iconfinder.com/data/icons/user-interface-797/32/User_Interface_heart_love_valentine_save_favorite-64.png"
      />
      <Button
        label="공유하기"
        onClick={() => {
          share({
            title: name,
            description: comment,
            imageUrl: mainImageUrl,
            buttonLabel: 'app_Trip에서 보기',
          })
        }}
        iconUrl="https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/kakao_talk_chat_media_social-64.png"
      />
      <CopyToClipboard
        text={window.location.href}
        onCopy={() => {
          alert('링크복사완료')
        }}
      >
        <Button
          label="링크복사"
          iconUrl="https://cdn0.iconfinder.com/data/icons/user-interface-2063/24/UI_Essential_icon_expanded-50-64.png"
        />
      </CopyToClipboard>
    </Flex>
  )
}

function Button({
  label,
  iconUrl,
  onClick,
}: {
  label: string
  iconUrl: string
  onClick?: () => void
}) {
  return (
    <Flex direction="column" align="center" onClick={onClick}>
      <img src={iconUrl} alt="" width={30} height={30} />
      <Spacing size={6} />
      <Text typography="t7">{label}</Text>
    </Flex>
  )
}

const containerStyles = css`
  padding: 24px;
  cursor: pointer;

  & * {
    flex: 1;
  }
`

export default ActionButtons
