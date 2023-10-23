import EmptyState from "@/components/EmptyState"
import { getCurrentUser } from "../actions/getCurrentUser"
import { getFavoriteListings } from "../actions/getFavoriteListings"
import FavoritesClient from "@/components/FavoritesClient"




const FavoritesPage = async () => {
  const currentUser = await getCurrentUser()
  const favoriteListings = await getFavoriteListings()

  if(favoriteListings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    )
  }
  

  return (
    <>
      <FavoritesClient
        listings={favoriteListings}
        currentUser={currentUser}
      />
    </>
  )
}

export default FavoritesPage