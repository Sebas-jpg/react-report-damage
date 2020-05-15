import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
        photo: '',
        type_of_damage: '',
        date: '',
        location: '',
        repair_information: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('damages').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const damage = doc.data();
        this.setState({
          key: doc.id,
          photo: damage.photo,
          type_of_damage: damage.type_of_damage,
          date: damage.date,          
          location: damage.location,
          repair_information: damage.repair_information
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({video:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { photo, type_of_damage, date, location, repair_information } = this.state;

    const updateRef = firebase.firestore().collection('damages').doc(this.state.key);

    updateRef.set({
      photo,
      type_of_damage,
      date,
      location,
      repair_information
    }).then((docRef) => {
      this.setState({
        key: '',
        photo: '',
        type_of_damage: '',
        date: '',
        location: '',
        repair_information: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.log("Only a moderator can edit a record.");
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Edit the report
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to={`/show/${this.state.key}`} className="btn btn-primary">Back</Link></h4>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label htmlFor="type_of_damage">Type of damage:</label>
                <input type="text" className="form-control" name="type_of_damage" value={this.state.type_of_damage} onChange={this.onChange} placeholder="type of damage" />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input type="text" className="form-control" name="date" onChange={this.onChange} value={this.state.date} placeholder="date" cols="80" rows="1"/>
              </div>
              <div className="form-group">
                <label htmlFor="location">location:</label>
                <input type="text" className="form-control" name="location" value={this.state.location} onChange={this.onChange} placeholder="location" />
              </div>
              <div className="form-group">
                <label htmlFor="photo">photo:</label>
                <input type="text" className="form-control" name="photo" value={this.state.photo} onChange={this.onChange} placeholder="imgur url" />
              </div>
              <div className="form-group">
                <label htmlFor="repair_information">Repair information:</label>
                <textarea className="form-control" name="repair_information" value={this.state.repair_information} onChange={this.onChange} placeholder="repair information" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;