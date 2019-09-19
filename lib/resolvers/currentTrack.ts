import { gql } from 'apollo-server-express'
import { currentTrack } from '../sonos'

export const typeDefs = gql`
  type CurrentTrack implements Track {
    # Implements
    title: String!
    artist: String!
    album: String!

    # Own props
    albumArtURL: String
    position: Int!
    duration: Int!
    queuePosition: Int!
  }

  extend type Query {
    currentTrack: CurrentTrack
  }
`

export const resolvers = {
  Query: {
    currentTrack: async () => {
      const current = await currentTrack()

      if (current.queuePosition === 0) {
        return null
      }

      return current
    }
  }
}
