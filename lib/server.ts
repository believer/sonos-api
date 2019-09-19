import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import {
  typeDefs as currentTrackDefs,
  resolvers as currentTrackResolvers
} from './resolvers/currentTrack'
import {
  typeDefs as upcomingTracksDefs,
  resolvers as upcomingTracksResolvers
} from './resolvers/upcomingTracks'
import {
  typeDefs as playerStateDefs,
  resolvers as playerStateResolvers
} from './resolvers/playerState'
import merge from 'lodash.merge'

const typeDefs = gql`
  """
  Common props for all tracks
  """
  interface Track {
    title: String!
    artist: String!
    album: String!
  }

  type Query {
    _empty: String
  }
`

const resolvers = {
  Track: {
    __resolveType: () => 'Track'
  }
}

const server = new ApolloServer({
  typeDefs: [typeDefs, currentTrackDefs, upcomingTracksDefs, playerStateDefs],
  resolvers: merge(
    resolvers,
    upcomingTracksResolvers,
    currentTrackResolvers,
    playerStateResolvers
  )
})

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
