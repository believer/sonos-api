type currentTrack = {
  albumArtURL: option(string),
  artist: string,
  duration: int,
  title: string,
};

type upcomingTrack = {
  album: string,
  albumArtURI: option(string),
  artist: string,
  title: string,
};

module UpcomingTracks = [%graphql
  {|
  query upcomingTracks {
    currentTrack @bsRecord {
      albumArtURL
      artist
      duration
      title
    }
    upcomingTracks @bsRecord {
      album
      albumArtURI
      artist
      title
    }
  }
|}
];
