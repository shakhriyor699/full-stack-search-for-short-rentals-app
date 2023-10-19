import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await req.json()

  const {
    totalPrice,
    startDate,
    endDate,
    listingId
  } = body

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error()
  }


  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          totalPrice,
          startDate,
          endDate
        }
      }
    }
  })

  return NextResponse.json(listingAndReservation)

}