// @flow

import React from 'react';
import jss from 'jss';
import injectSheet from 'react-jss';

const styles = {
  headerTitle: {
    margin: '15px 0 30px',
    color: '#d9534f',
  }
};

type headerProps = {
    title: number
};

const Header = function (props: headerProps) {

  const { title, classes } = props;
  
  return (
    <header>
      <h2 className={classes.headerTitle}> { title } </h2>
    </header>
  );
}

export default injectSheet(styles)(Header);