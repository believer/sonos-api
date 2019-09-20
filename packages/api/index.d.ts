declare module 'sonos' {
  interface Track {
    title: string
    artist: string
    album: string
  }

  interface CurrentTrack extends Track {
    albumArtURL?: string
    position: number
    duration: number
    queuePosition: number
  }

  interface QueueTrack extends Track {
    albumArtURI?: string
  }

  enum PlayerState {
    playing = 'playing',
    paused = 'paused',
    stopped = 'stopped'
  }

  export class Sonos {
    constructor(ip: string)

    currentTrack(): Promise<CurrentTrack>

    getQueue(): Promise<false | { items: QueueTrack[] }>

    getCurrentState(): Promise<PlayerState>
  }
}
