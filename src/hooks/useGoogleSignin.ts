import { COLLECTIONS } from '@constants'
import { auth, store } from '@remote/firebase'
import { FirebaseError } from 'firebase/app'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

function useGoogleSignin() {
  const navigate = useNavigate()
  const signin = useCallback(async () => {
    const provider = new GoogleAuthProvider()

    try {
      const { user } = await signInWithPopup(auth, provider)

      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), user.uid),
      )

      // 이미 가입한 유저
      if (userSnapshot.exists()) {
        navigate('/')
      } else {
        const 새로운유저 = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoUrl: user.photoURL,
        }

        await setDoc(
          doc(collection(store, COLLECTIONS.USER), user.uid),
          새로운유저,
        )

        navigate('/')
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popupp-closed-by-user') {
          return
        }
      }
      throw new Error('Fail to signin')
    }
  }, [navigate])

  const signout = useCallback(() => {
    signOut(auth)
  }, [])

  return { signin, signout }
}

export default useGoogleSignin