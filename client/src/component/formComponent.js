import React from "react";
const Form = (props) => {
  let buttonsStatus = props.buttonsStatus;
  let userToEdit = props.userToEdit;

  // add form
  let addUserButton = () => {
    return (
      <button type="submit" className="btn btn-info mt-3" onClick={() => props.insertUser()}>
        Add To Contact
      </button>
    );
  };
  let addUserResetButton = () => {
    return (
      <button type="reset" className="btn btn-info mt-3">
        Reset
      </button>
    );
  };
  // edit form
  let saveEditedButton = () => {
    return (
      <button type="submit" className="btn btn-info mt-3" onClick={() => props.editUser(userToEdit.id)}>
        Save Changes
      </button>
    );
  };
  let dontSaveChangesButton = () => {
    return <button className="btn btn-info mt-3">Cancel Edit</button>;
  };
  return (
    <div>
      <form action="get">
        <div className="myfForm mx-auto mt-5 p-5">
          <div className="row">
            <div className="col-12">
              <abbr title="Close">
                <i className="fas fa-times float-end" onClick={() => props.closeForm()}></i>
              </abbr>
            </div>
          </div>
          <div className="row">
            <label htmlFor="userName">Name:</label>
            <input type="text" id="userName" className="form-control" defaultValue={buttonsStatus === 0 ? "" : userToEdit.name} />
            <label htmlFor="userMail">Email:</label>
            <input type="email" id="userMail" className="form-control" defaultValue={buttonsStatus === 0 ? "" : userToEdit.mail} />
            <label htmlFor="userPhone">Phone:</label>
            <input type="tel" id="userPhone" className="form-control" defaultValue={buttonsStatus === 0 ? "" : userToEdit.phone} />
            <label htmlFor="userAge">Age:</label>
            <input type="number" id="userAge" className="form-control" defaultValue={buttonsStatus === 0 ? "" : userToEdit.age} />
            {buttonsStatus === 0 ? addUserButton() : saveEditedButton()}
            {buttonsStatus === 0 ? addUserResetButton() : dontSaveChangesButton()}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;

//
