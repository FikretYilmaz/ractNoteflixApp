import { ArrowBackOutlined } from '@mui/icons-material';
import React from 'react';
import ReactPlayer from 'react-player';
import { Link, useLocation, useParams } from 'react-router-dom';
import './watch.scss';
const Watch = () => {
  const { trailerKey } = useParams();

  const url = `https://www.youtube.com/watch?v=${trailerKey}`;
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>

      <ReactPlayer
        playing={true}
        className="video"
        width="100%"
        height="100vh"
        url={url}
      />
    </div>
  );
};

export default Watch;
