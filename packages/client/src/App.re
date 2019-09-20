open ReasonUrql.Hooks;

[@react.component]
let make = () => {
  let request = Query.UpcomingTracks.make();
  let ({response}, _) = useQuery(~request, ());

  switch (response) {
  | Fetching => <div> {React.string("Loading")} </div>
  | Error(_) => <div> {React.string("Error")} </div>
  | Data(d) =>
    <div className="grid grid-template-main mt-20">
      <div className="grid-center-main">
        <div className="grid grid-template-playlist grid-col-gap-16">
          <div>
            {switch (d##currentTrack) {
             | Some(current) =>
               <div>
                 {switch (current.albumArtURL) {
                  | Some(src) => <img className="shadow-lg rounded" src />
                  | None => React.null
                  }}
               </div>
             | None => React.null
             }}
          </div>
          <div>
            {d##upcomingTracks
             ->Belt.Array.map(track => <Track track />)
             ->React.array}
          </div>
        </div>
      </div>
    </div>
  | NotFound => <div> {React.string("Nothing")} </div>
  };
};
