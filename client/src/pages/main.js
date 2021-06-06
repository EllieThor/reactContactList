import React, { Component } from "react";
import "../css/style.css";
import axios from "axios";
import { connect } from "react-redux";
import Form from "../component/formComponent";
import Archive from "../component/archives";
import SortByCOMP from "../component/sortComponent";
import SearchUser from "../component/searchComponent";
import UserCard from "../component/userCardComponent";

class Main extends Component {
  componentDidMount() {
    this.printAllUsers();
  }
  // patterns OBJ
  printByOBJ = {
    typeToFilterBy: "name",
    searchBy: "",
    sortBy: "AtoZ",
  };

  // print All Users
  printAllUsers = async () => {
    let printByPatterns = {
      typeToFilterBy: this.printByOBJ.typeToFilterBy,
      searchBy: this.printByOBJ.searchBy,
      sortBy: this.printByOBJ.sortBy,
    };

    try {
      let users = await axios.post("http://www.localhost:5001/users/getUsersFromDb", printByPatterns);
      console.log(users);
      if (users.statusText === "OK") {
        this.props.updateUsers(users.data);
      } else {
        alert("something went wrong, please reload again");
      }
    } catch (err) {
      console.log("Error ", err);
    }
  };

  // print All Deleted Users
  getDeletedUsersFromDb = async () => {
    try {
      let users = await axios.post("http://www.localhost:5001/users/getDeletedUsersFromDb");
      console.log(users);
      if (users.statusText === "OK") {
        this.props.updateDeletedUsers(users.data);
      } else {
        alert("something went wrong, please reload again");
      }
    } catch (err) {
      console.log("Error ", err);
    }
  };

  // Buttons Area

  addUserClicked = () => {
    this.props.updateButtonsForm(0);

    // close archive if he is open
    this.props.updateArchives(0);

    // open addUser form
    this.props.updateShowForm(true);
  };

  archivesClicked = () => {
    this.getDeletedUsersFromDb();

    // close addUser form if he is open
    this.props.updateShowForm(false);

    // open archive
    this.props.updateArchives(1);
  };

  editUserClicked = (userObj) => {
    // close archive if he is open
    this.props.updateArchives(0);
    this.props.updateButtonsForm(1);
    this.props.updateShowForm(true);
    this.props.updateUserToForm(userObj);
  };

  closeForm = () => {
    this.props.updateShowForm(false);
  };

  closeArchive = () => {
    this.props.updateArchives(0);
  };

  // pattern to print all users Cards

  filterBy = (e) => {
    this.printByOBJ.typeToFilterBy = e.target.value;
  };

  searchBy = (e) => {
    this.printByOBJ.searchBy = e.target.value;
    this.printAllUsers();
  };

  sortByFN = (e) => {
    this.printByOBJ.sortBy = e.target.value;
    this.printAllUsers();
  };

  insertUser = async () => {
    let currentUser = {
      name: document.getElementById("userName").value,
      mail: document.getElementById("userMail").value,
      phone: document.getElementById("userPhone").value,
      age: document.getElementById("userAge").value,
    };
    console.log("currentUser: ", currentUser);
    try {
      let users = await axios.post(`http://www.localhost:5001/users/insertUser`, currentUser);
      console.log(users);
      if (users.statusText === "OK") {
        this.printAllUsers();
      } else {
        alert("something went wrong, please reload again");
      }
    } catch (err) {
      console.log("Error ", err);
    }
  };

  deleteUser = async (userId) => {
    let UserIdOBJ = {
      id: userId,
    };
    try {
      let users = await axios.post(`http://www.localhost:5001/users/updateDeleteUsers`, UserIdOBJ);
      console.log(users);
      if (users.statusText === "OK") {
        this.printAllUsers();
        this.getDeletedUsersFromDb();
      } else {
        alert("something went wrong, please reload again");
      }
    } catch (err) {
      console.log("Error ", err);
    }
  };

  deletePermanentlyUser = async (userId) => {
    let UserIdOBJ = {
      id: userId,
    };
    try {
      let users = await axios.post(`http://www.localhost:5001/users/deletePermanentlyUserFromDb`, UserIdOBJ);
      console.log(users);
      if (users.statusText === "OK") {
        this.getDeletedUsersFromDb();
      } else {
        alert("something went wrong, please reload again");
      }
    } catch (err) {
      console.log("Error ", err);
    }
  };

  restoreUser = async (userId) => {
    let UserIdOBJ = {
      id: userId,
    };
    try {
      let users = await axios.post(`http://www.localhost:5001/users/restoreUser`, UserIdOBJ);
      console.log(users);
      if (users.statusText === "OK") {
        this.getDeletedUsersFromDb();
        this.printAllUsers();
      } else {
        alert("something went wrong, please reload again");
      }
    } catch (err) {
      console.log("Error ", err);
    }
  };

  editUser = async (userId) => {
    let editedUser = {
      id: userId,
      name: document.getElementById("userName").value,
      mail: document.getElementById("userMail").value,
      phone: document.getElementById("userPhone").value,
      age: document.getElementById("userAge").value,
    };

    try {
      let users = await axios.post(`http://www.localhost:5001/users/updateUsersFromDb`, editedUser);
      console.log(users);
      if (users.statusText === "OK") {
        this.printAllUsers();
      } else {
        alert("something went wrong, please reload again");
      }
    } catch (err) {
      console.log("Error ", err);
    }
  };

  render() {
    return (
      <div className="p-3">
        <div className="row">
          <div className="col-4">
            <abbr title="Add New Contact">
              <i className="fas fa-user-plus fa-2x" onClick={() => this.addUserClicked()}></i>
            </abbr>
          </div>
          <div className="col-4 text-center">
            <h2>Contacts List</h2>
          </div>
          <div className="col-4">
            <abbr title="Archives" className="float-end">
              <i className=" fas fa-archive fa-2x" onClick={() => this.archivesClicked()}></i>
            </abbr>
          </div>
        </div>
        <div className="row mb-5" id="form-sec">
          {this.props.showForm ? <Form closeForm={this.closeForm} userToEdit={this.props.userToEdit} buttonsStatus={this.props.buttonsStatus} insertUser={this.insertUser} editUser={this.editUser} /> : ""}
        </div>
        <div className="row mb-5" id="archive-sec">
          {this.props.archives === 1 ? <Archive closeArchive={this.closeArchive} allDeletedUsers={this.props.deletedUsers} deletePermanentlyUser={this.deletePermanentlyUser} restoreUser={this.restoreUser} /> : ""}
        </div>
        <div className="row mb-5" id="search-sec">
          <div className="col-lg-8 col-md-12 pb-3">
            <SearchUser filterBy={this.filterBy} searchBy={this.searchBy} />
          </div>
          <div className="col-lg-4 col-md-12">
            <SortByCOMP sortByFN={this.sortByFN} />
          </div>
        </div>
        <div className="row">
          {this.props.users.map((user, i) => (
            <UserCard key={i} name={user.name} mail={user.mail} phone={user.phone} age={user.age} userObj={user} userId={user.id} deleteUser={this.deleteUser} editUserClicked={this.editUserClicked} />
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
    showForm: state.showForm,
    buttonsStatus: state.buttonsStatus,
    userToEdit: state.userToEdit,
    archives: state.archives,
    deletedUsers: state.deletedUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUsers(value) {
      dispatch({
        type: "updateUsers",
        payload: value,
      });
    },
    updateShowForm(value) {
      dispatch({
        type: "UpdateShowForm",
        payload: value,
      });
    },
    updateButtonsForm(value) {
      dispatch({
        type: "updateButtonsForm",
        payload: value,
      });
    },
    updateUserToForm(value) {
      dispatch({
        type: "updateUserToForm",
        payload: value,
      });
    },
    updateArchives(value) {
      dispatch({
        type: "updateArchives",
        payload: value,
      });
    },
    updateDeletedUsers(value) {
      dispatch({
        type: "updateDeletedUsers",
        payload: value,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
