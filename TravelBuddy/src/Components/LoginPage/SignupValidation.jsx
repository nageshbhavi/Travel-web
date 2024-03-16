const Validation = (name, email, password) => {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for matching Email IDs.
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/; // Regular expression to check the strength of a Password.

  if (name === "") {
    error.name = "Name should not be empty!";
  } else {
    error.name = "";
  }

  if (email === "") {
    error.email = "Email cannot be empty!";
  } else if (!email_pattern.test(email)) {
    error.email = "Invalid email!";
  } else {
    error.email = "";
  }

  if (password === "" || password.length < 8) {
    error.password = "Password must contain at least 8 characters";
  } else {
    error.password = "";
  }
  return error;
};

export default Validation;
