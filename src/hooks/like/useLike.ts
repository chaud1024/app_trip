import useUser from '@hooks/auth/useUser'
import { getLikes } from '@remote/like'
import { useQuery } from 'react-query'

function useLike() {
  const user = useUser()

  const { data } = useQuery(
    ['likes'],
    () => getLikes({ userId: user?.uid as string }),
    {
      enabled: user != null,
    },
  )

  return { data }
}

export default useLike
