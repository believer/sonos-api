[@react.component]
let make = (~track: Query.upcomingTrack) => {
  <div
    className="grid rounded grid-template-track
    grid-col-gap-5 items-center border-b border-color-gray-200 py-4">
    {switch (track.albumArtURI) {
     | Some(src) => <img className="h-10 w-10 rounded" src />
     | None => React.null
     }}
    <div className="text-gray-800"> {React.string(track.artist)} </div>
    <div className="text-gray-500"> {React.string(track.title)} </div>
  </div>;
};
