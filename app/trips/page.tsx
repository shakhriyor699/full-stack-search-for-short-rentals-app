import EmptyState from '@/components/EmptyState'
import { getCurrentUser } from '../actions/getCurrentUser'
import { getResevations } from '../actions/getResevations'

const Trips = async () => {
  const currentUser = await getCurrentUser()


  if (!currentUser) {
    return (
      <EmptyState title='Unauthorized' subtitle='Please login to see your trips' />
    )
  }
  
  const reservations = await getResevations({
    userId: currentUser.id
  })

  return (
    <div>Trips</div>
  )
}

export default Trips