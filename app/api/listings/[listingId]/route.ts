import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prisma";

interface IParams {
  listingId?: string
}

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error()
  }


  const { listingId } = params;


  if(!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid Id')
  }

  const listing = await prisma.listing.delete({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  })

  return NextResponse.json(listing);
}