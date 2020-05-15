import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('damages');
    this.state = {
        photo: '',
        type_of_damage: '',
        date: '',
        location: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { photo, type_of_damage, date, location} = this.state;

    this.ref.add({
      photo,
      type_of_damage,
      date,
      location
    }).then((docRef) => {
      this.setState({
        photo: '',
        type_of_damage: '',
        date: '',
        location: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { photo, type_of_damage, date, location } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Report damage
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Back</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="type_of_damage">Type of damage:</label>
                <input type="text" className="form-control" name="type_of_damage" value={type_of_damage} onChange={this.onChange} placeholder="pothole, graffiti..." />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input type="test" className="form-control" name="date" onChange={this.onChange} placeholder="date" 
                defaultValue={date}/>
              </div>
              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <input type="text" className="form-control" name="location" value={location} onChange={this.onChange} placeholder="location" />
              </div>
              <div className="form-group">
                <label htmlFor="photo">Photo:</label>
                <input type="text" className="form-control" name="photo" value={photo} onChange={this.onChange} placeholder="https://i.imgur.com/..." />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;