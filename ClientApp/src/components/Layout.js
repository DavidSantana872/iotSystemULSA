import React, { Component } from 'react';
import StartApp from "./StartApp"
export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <StartApp>
          
        </StartApp>
      </div>
    );
  }
}
