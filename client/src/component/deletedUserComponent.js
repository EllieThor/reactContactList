import React from "react";
const DeletedUser = (props) => {
  return (
    <div>
      <div className="row deletedUserROW m-1">
        <div className="col-4">
          <h5 className="">{props.name}</h5>
          <h6 className="">{props.mail}</h6>
        </div>
        <div className="col-4">
          <button className="btn btn-success mt-3" onClick={() => props.restoreUser(props.userId)}>
            Restore contact
          </button>
        </div>
        <div className="col-4">
          <button className="btn btn-danger mt-3" onClick={() => props.deletePermanentlyUser(props.userId)}>
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletedUser;
