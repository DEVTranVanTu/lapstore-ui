import AccountLayout from '@Layouts/AccountLayout'
import Profile from '@Organisms/account/Profile'
import { useEffect } from 'react'
import { getUserInfo } from 'utils'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  getUserProfile,
  getUserProfileLoading,
  userProfileActions,
  userProfileUpdateAction,
} from '../../store/slices/userSlice'

export default function profile() {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(getUserProfile)
  const loading = useAppSelector(getUserProfileLoading)

  const updateProfile = (id: string, data: any) => {
    dispatch(userProfileUpdateAction.uploadProfile({ id, data }))
  }

  useEffect(() => {
    const user = getUserInfo()
    const id = user._id

    id && dispatch(userProfileActions.getUserProfile(id))
  }, [dispatch])
  return (
    <AccountLayout>
      {loading ? '' : <Profile profile={profile} updateProfile={updateProfile} />}
    </AccountLayout>
  )
}
