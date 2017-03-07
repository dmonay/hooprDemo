import React from 'react';

import HeaderBox from './HeaderBox';
import PlayerBoxTop from './PlayerBoxTop';
import PlayerBoxBottom from './PlayerBoxBottom';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // in production this would be supplied by server
    this.state = {
      type: 'profile',
      player: {
        name: {
          first: 'Stephen',
          last: 'Curry'
        },
        number: 30,
        position: 'PG',
        stats: {
          ppi: 5.67,
          outperform: 0.6432
        }
      },
      team: {
        name: 'Golden State Warriors'
      },
      league: {
        name: 'Warriors',
        division: 3,
        stats: {
          ppi: {
            avg: 6.12,
            best: 7.43
          }
        }
      }
    };
  }

  render() {
    const data3 = this.state;

    return (
      <div>
        <HeaderBox data3={data3} />
        <PlayerBoxTop data3={data3} />
        <PlayerBoxBottom />
      </div>
    );
  }
}
