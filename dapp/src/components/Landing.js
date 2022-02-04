import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Columns from './Columns';
import Brands from './Brands';

function Landing() {
  return (
    <div className="Landing">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <Header />
      <Columns />
      <Brands />
    </div>
  );
}

export default Landing;
