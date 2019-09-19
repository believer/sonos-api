import { gql } from 'apollo-server-express'
import { getCurrentState } from '../sonos'

export const typeDefs = gql`
  enum PlayerState {
    playing
    paused
    stopped
  }

  extend type Query {
    playerState: PlayerState!
  }
`

export const resolvers = {
  Query: {
    playerState: () => getCurrentState()
  }
}
