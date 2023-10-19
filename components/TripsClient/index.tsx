'use client'

import { SafeReservation, SafeUser } from "@/app/types"
import { FC, useState } from "react"
import Container from "../Container"
import Heading from "../Heading/Heading"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import ListingCard from "../ListingCard"

interface TripsClientProps {
  reservations: SafeReservation[]
  currentuser?: SafeUser | null
}

const TripsClient: FC<TripsClientProps> = ({
  reservations,
  currentuser
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
      <Heading title='Trips' subtitle="Where you've been and where you're going" />
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
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            onAction={onCancel}
            currentUser={currentuser}
            actionId={reservation.id}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient