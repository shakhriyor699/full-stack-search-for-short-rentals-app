import EmptyState from '@/components/EmptyState'
import { getCurrentUser } from '../actions/getCurrentUser'
import { getResevations } from '../actions/getResevations'
import TripsClient from '@/components/TripsClient'

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

  if(reservations.length === 0) {
    <EmptyState title='No trips found' subtitle='Looks like you havent reserved any trips.' />
  }

  return (
    <>
      <TripsClient 
        reservations={reservations}
        currentuser={currentUser}
      />
    </>
  )
}

export default Trips