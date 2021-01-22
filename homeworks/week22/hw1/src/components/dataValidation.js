/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
export const validation = (values) => {
  const errors = {};

  // checking username
  if (!values.userName.trim()) {
    errors.userName = "User Name is required";
  } else {
    errors.userName = "";
  }

  // checking nickname
  if (!values.nickName.trim()) {
    errors.nickName = "Nick Name is required";
  } else {
    errors.nickName = "";
  }

  // checking password
  if (!values.password.trim()) {
    errors.password = "Password is required";
  } else {
    errors.password = "";
  }

  return errors;
};
