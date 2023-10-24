'use client'

import { SafeListing, SafeUser } from "@/app/types"
import { FC, useState } from "react"
import Container from "../Container"
import Heading from "../Heading/Heading"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import ListingCard from "../ListingCard"

interface PropertiesClientProps {
  listings: SafeListing[]
  currentuser?: SafeUser | null
}

const PropertiesClient: FC<PropertiesClientProps> = ({
  listings,
  currentuser
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = async (id: string) => {
    setDeletingId(id)

    try {
      await axios.delete(`/api/listings/${id}`)
      toast.success('Listing deleted')
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
    }
    setDeletingId('')
  }
  return (
    <Container>
      <Heading title='Properties' subtitle="List of your properties" />
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
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            onAction={onCancel}
            currentUser={currentuser}
            actionId={listing.id}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
          />
        ))}
      </div>
    </Container>
  )
}

export default PropertiesClient