import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Hotel } from '@models/hotel'
import useShare from '@hooks/useShare'
import useLike from '@hooks/like/useLike'

const ActionButtons = ({ hotel }: { hotel: Hotel }) => {
  const share = useShare()
  const { data: likes, mutate: like } = useLike()

  const { name, comment, mainImageUrl, id } = hotel

  const isLike = Boolean(likes?.find((like) => like.hotelId === hotel.id))

  return (
    <Flex css={containerStyles}>
      <Button
        label="찜하기"
        onClick={() => {
          like({
            hotel: {
              name,
              mainImageUrl,
              id,
            },
          })
        }}
        iconUrl={
          isLike
            ? 'https://cdn1.iconfinder.com/data/icons/andriod-app/32/bookmark-512.png'
            : 'https://cdn1.iconfinder.com/data/icons/andriod-app/32/bookmark_outline-64.png'
        }
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
