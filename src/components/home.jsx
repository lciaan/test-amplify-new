import React, { Component } from "react";
import { Button, Alert } from "react-bootstrap";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: " ",
    };
  }
  render() {
    return (
      <div className="container" style={{ marginTop: 12 }}>
        <Alert variant="info">
          <Alert.Heading>Hey, nice to see you!</Alert.Heading>
          <p>
            Amazon Vinsight makes it easy for customers to analyze video product reviews,
            by extracting the sentiment of the speaker and the keywords mentioned. The
            customer selects a video, and the service will consider wording, voice tone,
            and gestures to automatically generate a report with the transcription and
            actionable insights.
          </p>
          <hr />
        </Alert>
      </div>
    );
  }
}

export default Home;

