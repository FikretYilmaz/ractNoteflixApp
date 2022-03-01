import { ArrowBackOutlined } from '@mui/icons-material';
import React from 'react';
import ReactPlayer from 'react-player';
import { Link, useLocation } from 'react-router-dom';
import './watch.scss';
const Watch = () => {
  const location = useLocation();

  const { key } = location;
  const trailer = 'https://www.youtube.com/watch?v=1D_qK6jWNAM';
  console.log(location);
  console.log(`https://www.youtube.com/watch?v=${key}`);
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      {/* <iframe
        className="video"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${key}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe> */}
      <ReactPlayer
        className="video"
        width="100%"
        height="100vh"
        url={trailer}
      />
    </div>
  );
};

export default Watch;
