export const UserRole = (RoleID) => {
  if (RoleID == 1) {
    return "Admin";
  } else if (RoleID == 2) {
    return "Manager";
  } else if (RoleID == 3) {
    return "Office Boy";
  } else if (RoleID == 4) {
    return "User";
  } else if (RoleID == 5) {
    return "HR";
  }
};
