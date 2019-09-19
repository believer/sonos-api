import { currentTrack, getQueue } from '../sonos'
import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type QueueTrack implements Track {
    # Implements
    title: String!
    artist: String!
    album: String!

    # Own props
    albumArtURI: String
  }

  extend type Query {
    upcomingTracks: [QueueTrack!]!
  }
`

export const resolvers = {
  Query: {
    upcomingTracks: async () => {
      const current = await currentTrack()
      const queue = await getQueue()

      if (queue === false) {
        return []
      }

      return queue.items.slice(current.queuePosition)
    }
  }
}
