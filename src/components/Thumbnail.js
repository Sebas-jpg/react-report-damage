import React, { Component } from 'react';

class Thumbnail extends Component {

  // constructor(props) {
  //   super(props);
  // }

 
  render() {
    const thumbnailUrl = "https://i.imgur.com/" + this.props.img;
    console.log(this.props.img );

    return (
       <img src={thumbnailUrl} alt="damage or vandalism" /> 
    )
    }

}

export default Thumbnail
