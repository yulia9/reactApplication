// @flow
import React from 'react';
import jss from 'jss';
import injectSheet from 'react-jss';

const styles = {
  warning: {
    fontWeight: 'bolder',
    fontSize: '16px',
    marginTop: '15px',
    fontStyle: 'italic',
    color: '#d9534f',
    textAlign: 'center',
  }
};

type Props = {
  message: string
};

const Warning = function(props:any) {
  return (
    <div>
      <p className={props.classes.warning}> {props.message} </p>
    </div>
  );
}

export default injectSheet(styles)(Warning);

