import { SafeListing, SafeUser } from "@/app/types"
import { Reservation } from "@prisma/client"
import { FC } from "react"


interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
  reservations?: Reservation[]
}

const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser
}) => {
  return (
    <div>

    </div>
  )
}

export default ListingClient