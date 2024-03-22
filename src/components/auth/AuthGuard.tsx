import { onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { auth } from '@remote/firebase'
import { userAtom } from '@store/atom/user'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  // 유저인증상태정보변화 감지
  onAuthStateChanged(auth, (user) => {
    if (user == null) {
      setUser(null)
    } else {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      })
    }
    setInitialize(true)
  })

  if (initialize === false) {
    return null
  }
  return <>{children}</>
}

export default AuthGuard
