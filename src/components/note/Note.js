import {
  Add,
  NoteAltOutlined,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import API_KEY from '../../js/apiKey';
import './listItem.scss';

const ListItem = ({ movie }) => {
  useEffect(() => {}, []);
  return (
    <div className="listItem">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt="item"
      />
      <React.Fragment>
        <div className="itemInfo">
          <div className="icons"></div>
          <div className="itemInfoTop"></div>
          <div className="desc">gdfgdfgdfgfdgg</div>
          <div className="genre">fgfddddddddddddd</div>
        </div>
      </React.Fragment>
      )
    </div>
  );
};

export default ListItem;
