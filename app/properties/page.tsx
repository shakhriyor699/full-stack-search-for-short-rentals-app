import EmptyState from '@/components/EmptyState'
import { getCurrentUser } from '../actions/getCurrentUser'
import { getResevations } from '../actions/getResevations'
import getListings from '../actions/getListings'
import PropertiesClient from '@/components/ProperstiesClient'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <EmptyState title='Unauthorized' subtitle='Please login to see your trips' />
    )
  }
  
  const listings = await getListings({
    userId: currentUser.id
  })

  if(listings.length === 0) {
    <EmptyState title='No properties found' subtitle='Looks like you have no properties.' />
  }

  return (
    <>
      <PropertiesClient 
        listings={listings}
        currentuser={currentUser}
      />
    </>
  )
}

export default PropertiesPage