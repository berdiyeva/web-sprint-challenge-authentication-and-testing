export const validateCredentials = (credentials, errors) => {
    if (!credentials.username.trim() || !credentials.password.trim()) {
      errors({
        username: {
          message: "username is required",
        },
        password: {
          message: "password is required",
        },
      });
    }
    if (credentials.password.length < 8) {
      errors((err) => {
        return {
          ...err,
          password: "password must have of minimum 8 characters",
        };
      });
    }
    if (credentials.username.length < 3) {
      errors((err) => {
        return {
          ...err,
          username: "username must have a minimum of 3 characters",
        };
      });
    }
  };