import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLoginSubmit = (e, user) => {
    this.props.handleLoginSubmit(e, user);
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <form onSubmit={e => this.handleLoginSubmit(e, this.state)}>
        <div className="container ">
          <div className="col-md-3" />
          <div className="col-md-6">
            <div className="row myborder">
              <h4 className="h4-text">Log In</h4>
              <hr />
              <div className="input-group margin-bottom-20">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-user mycolor" />
                </span>
                <input
                  className="form-control"
                  placeholder="User Name"
                  name="username"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.username}
                  required
                />
              </div>
              <br />

              <div className="input-group margin-bottom-20">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-lock mycolor" />
                </span>
                <input
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  required
                />
              </div>
              <br />

              <div className="row">
                <div className="col-md-12">
                  <button className="btn-u pull-left" type="submit">
                    Log in
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-2" />
          </div>
        </div>
      </form>
    );
  }
}

export default LoginForm;
