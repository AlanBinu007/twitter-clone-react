import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddTweet } from "../actions/tweets";

import { Redirect } from "react-router-dom";

class NewTweet extends Component {
  state = {
    text: "",
    toHome: false
  };

  handleChange = e => {
    const text = e.target.value;

    this.setState(() => ({
      text
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { text } = this.state;

    //if we are at route /new, there is no id, so we are not replying to any tweet
    //if we are at route /tweet/:id, we are replying to that id
    const { dispatch, id } = this.props; //if id is a thing, it means we are replying to this id

    //todo: Add tweet to store
    dispatch(handleAddTweet(text, id));
    // console.log("New Tweet: ", text);

    //reset state to default
    this.setState(() => ({
      text: "",
      toHome: id ? false : true //if id is a thing, do not redirect, otherwise, you are at /new, so, after submit, redirect back to home
    }));
  };

  render() {
    const { text, toHome } = this.state;
    const tweetLeft = 280 - text.length;

    // redirect to home view if submitted from /new
    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h3 className="center">Compose new Tweet </h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happenning"
            value={text}
            onChange={this.handleChange}
            className="textarea"
            maxLength={280}
          />
          {/* show how many characters are left */}
          {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}

          {/* button is disabled if it's an empty string */}
          <button className="btn" type="submit" disabled={text === ""}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);
