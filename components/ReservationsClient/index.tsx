'use client'
import { FC, useState } from "react"
import { SafeReservation, SafeUser } from "@/app/types"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import Container from "../Container"
import Heading from "../Heading/Heading"
import ListingCard from "../ListingCard"

interface ReservationsClientProps {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
}

const ReservationsClient: FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = async (id: string) => {
    setDeletingId(id)

    try {
      await axios.delete(`/api/reservations/${id}`)
      toast.success('Reservation cancelled')
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
    }
    setDeletingId('')
  }
  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
      />
      <div
        className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {
          reservations.map((reservation: any) => (
            <ListingCard 
              key={reservation.id}
              reservation={reservation}
              data={reservation.listing}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel guest reservation"
              actionId={reservation.id}
              currentUser={currentUser}
            />
          ))
        }
      </div>
    </Container>
  )
}

export default ReservationsClient