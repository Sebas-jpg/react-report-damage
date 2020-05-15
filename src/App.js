import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase, { auth, provider } from './Firebase';
import Thumbnail from './components/Thumbnail';


class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('damages');
    this.unsubscribe = null;
    this.state = {
      damages: [],
      user: null
    };
  this.login = this.login.bind(this);
  this.logout = this.logout.bind(this);
  }

  onCollectionUpdate = (querySnapshot) => {
    const damages = [];
    querySnapshot.forEach((doc) => {
      const { photo, type_of_damage, date, location, repair_information } = doc.data();
      damages.push({
        key: doc.id,
        doc, // DocumentSnapshot
        photo,
        type_of_damage,
        date,
        location,
        repair_information
      });
    });
    this.setState({
      damages
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    })
  }

  login(){
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      localStorage.setItem('user', user.uid);
      this.setState({
        user
      });
      window.location.reload(false);
      console.log(this.state);
    });
  }
  logout(){
    auth.signOut()
    .then(() =>{
      this.setState({
        user: null
      });
      window.location.reload(false);
    });
  }

  render() {
    return (
      <div>
      <div>
      {this.state.user ?
      <button className="btn btn-primary" onClick={this.logout}>Log Out</button>
      :
      <button className="btn btn-primary" onClick={this.login}>Log In</button>
    }
    </div>
    
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Reported damages:
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/create" className="btn btn-primary">Report damage</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Type of damage</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Repair information</th>
                </tr>
              </thead>
              <tbody>
                {this.state.damages.map(damage =>
                  <tr key={damage.key}>
                    <td><Link to={`/show/${damage.key}`}><Thumbnail img={damage.photo} /></Link></td>
                    <td><Link to={`/show/${damage.key}`}>{damage.type_of_damage}</Link></td>
                    <td>{damage.date}</td>
                    <td>{damage.location}</td>
                    <td>{damage.repair_information}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
   </div>
    );
  }
}

export default App;