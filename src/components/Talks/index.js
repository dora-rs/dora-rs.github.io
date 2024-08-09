import React from "react";
import ReactPlayer from "react-player";

const youtubelist = [
  {
    url: "https://www.youtube.com/watch?v=TxGXkJhb0bo&t=720s",
  },
  {
    url: "https://youtu.be/dvYL4g74aZY?si=sb242FMAcbq8XYOm",
  },
  {
    url: "https://www.youtube.com/watch?v=I1LPurHths4",
  },
];

export default function Talks() {
  return (
    <section className="margin-top--xl margin-bottom--xl">
      <div className="container">
        {youtubelist.map(({ url }) => (
          <div
            className="player__wrapper margin-top--lg margin-bottom--lg"
            style={{
              height: "500px",
              margin: "auto",
            }}
          >
            <ReactPlayer
              url={url}
              className="player"
              width="100%"
              height="100%"
            />
          </div>
        ))}
        <br />
      </div>
    </section>
  );
}
