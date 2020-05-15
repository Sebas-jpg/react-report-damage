import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      damage: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('damages').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          damage: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('damages').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.log("Only a moderator can delete a record.");
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
          <h4><Link to={`/`} className="btn btn-primary">Back</Link></h4>
            <h3 className="panel-title">
              {this.state.damage.type_of_damage}
            </h3>
          </div>
          <div className="panel-body">
            <dl>
              <dt>Location:</dt>
              <dd>{this.state.damage.location}</dd>
              <dt>date:</dt>
              <dd>{this.state.damage.date}</dd>
              <dt>repair information:</dt>
              <dd>{this.state.damage.repair_information}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;