import React from "react";
const UserCard = (props) => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-12">
      <div className="card theCard m-2">
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <div className="card-text summaryShow">Email: {props.mail}</div>
          <div className="card-text summaryShow">Phone: {props.phone}</div>
          <div className="card-text summaryShow">Age: {props.age}</div>
          <button className="btn btn-warning m-2" onClick={() => props.editUserClicked(props.userObj)}>
            Edit User <i className="fas fa-user-edit"></i>
          </button>
          <button className="btn btn-danger m-2" onClick={() => props.deleteUser(props.userId)}>
            Delete User <i className="fas fa-user-times"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
