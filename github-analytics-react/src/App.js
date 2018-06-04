// import React, { Component } from "react";
// import "./App.css";
// import axios from "axios";

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       username: "",
//     };

//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick() {
//     axios
//       .get("https://api.github.com/users/mahfuzk")
//       .then((response) => this.setState({ username: response.data.name }));
//   }

//   render() {
//     return (
//       <div className="button__container">
//         <button className="button" onClick={this.handleClick}>
//           Click Me
//         </button>
//         <p>{this.state.username}</p>
//       </div>
//     );
//   }
// }
// export default App;

import React from "react";
import axios from "axios";

const Card = (props) => {
  return (
    <div style={{ margin: "1em" }}>
      <img alt="avatar" style={{ width: "70px" }} src={props.avatar_url} />
      <div>
        <div style={{ fontWeight: "bold" }}>{props.name}</div>
        <div>{props.blog}</div>
      </div>
    </div>
  );
};

const CardList = (props) => {
  return <div>{props.cards.map((card) => <Card {...card} />)}</div>;
};

class Form extends React.Component {
  state = {
    userName: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(`https://api.github.com/users/${this.state.userName}`)
      .then((resp) => {
        this.props.onSubmit(resp.data);
        this.setState({ userName: "" });
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder="GitHub username"
          required
        />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    cards: [],
  };

  addNewCard = (cardInfo) => {
    this.setState((prevState) => ({
      cards: prevState.cards.concat(cardInfo),
    }));
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

export default App;
