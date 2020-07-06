import React, {useState} from 'react';
import './App.css';


class Identity extends React.Component {
    // const [firstname, setFirstname] = useState("");
    // const [lastname, setLastname] = useState("");
    // const [done, setDone] = useState("Thank you");
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            done: "",
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        return (
          <form>
              <label htmlFor="firstname">Firstname</label> <br/>
              <input type="text" name="firstname" value={this.state.firstname} placeholder="Firstname" onChange={this.onChangeHandler}/> <br/>
              <label htmlFor="lastname">Lastname</label> <br/>
              <input type="text" name="lastname" value={this.state.lastname} placeholder="Lastname" onChange={this.onChangeHandler}/> <br/>
              <select name="done" id="done" value={this.state.done} onChange={this.onChangeHandler}>
                  <option value="Thank you">Thank you</option>
                  <option value="Leave me alone">Leave me alone</option>
              </select>
          </form>
      );
    }
}

export default Identity;
