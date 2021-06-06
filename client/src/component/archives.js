import React from "react";
import DeletedUser from "../component/deletedUserComponent";

const Archive = (props) => {
  let allUsers = props.allDeletedUsers;

  return (
    <div className="archive mx-auto mt-5 p-5">
      <div className="row">
        <i className="fas fa-times float-end" onClick={() => props.closeArchive()}></i>
      </div>
      <div className="row">
        {allUsers.map((user, i) => (
          <DeletedUser name={user.name} mail={user.mail} userObj={user} userId={user.id} deletePermanentlyUser={props.deletePermanentlyUser} restoreUser={props.restoreUser} />
        ))}
      </div>
    </div>
  );
};

export default Archive;
