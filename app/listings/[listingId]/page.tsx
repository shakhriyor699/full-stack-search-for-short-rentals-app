import { getCurrentUser } from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingById"
import EmptyState from "@/components/EmptyState"
import ListingClient from "./ListingClient"
import { getResevations } from "@/app/actions/getResevations"

interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const reservations = await getResevations(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return (
      <EmptyState />
    )
  }


  return (
    <div>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </div>
  )
}

export default ListingPage