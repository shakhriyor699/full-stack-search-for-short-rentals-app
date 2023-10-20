import EmptyState from "@/components/EmptyState"

import { getCurrentUser } from "../actions/getCurrentUser"
import { getResevations } from "../actions/getResevations"
import ReservationsClient from "@/components/ReservationsClient"

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
      />
    )
  }

  const reservations = await getResevations({ authorId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you havent reserved any trips on  your properties."
      />
    )
  }

  return (
    <>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </>
  )
}

export default ReservationsPage