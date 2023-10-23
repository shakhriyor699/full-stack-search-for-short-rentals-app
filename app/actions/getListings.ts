import prisma from '../libs/prisma'

export interface IListingsParams {
  userId?: string
}



const getListings = async (params: IListingsParams) => {
  try {
    const { userId } = params

    let query: any = {}

    if (userId) {
      query.userId = userId
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }))
  } catch (error: any) {
    throw new Error(error)
  }
}

export default getListings