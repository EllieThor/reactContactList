const initialState = {
  users: [],
  deletedUsers: [],
  showForm: false,
  buttonsStatus: 0,
  userToEdit: {},
  archives: 0,
};

function rootReducer(state = initialState, action) {
  console.log("root:", action.type);

  switch (action.type) {
    case "updateUsers":
      state = { ...state, users: action.payload };
      break;
    case "UpdateShowForm":
      state = { ...state, showForm: action.payload };
      break;
    case "updateButtonsForm":
      state = { ...state, buttonsStatus: action.payload };
      break;
    case "updateUserToForm":
      state = { ...state, userToEdit: action.payload };
      break;
    case "updateArchives":
      state = { ...state, archives: action.payload };
      break;
    case "updateDeletedUsers":
      state = { ...state, deletedUsers: action.payload };
      break;
  }
  return state;
}

export default rootReducer;
