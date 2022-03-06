import React from 'react';
import List from '../../components/list/List';
import './search.scss';

const Search = ({ searchMovie }) => {
  return (
    <div className="search">
      {searchMovie && <List searchMovie={searchMovie} />}
    </div>
  );
};

export default Search;
