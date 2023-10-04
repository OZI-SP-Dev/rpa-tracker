import { createContext, useState } from "react";
//import { RoleType, useUserRoles } from "api/RolesApi";
import { Person, useCurrentUser } from "api/UserApi";

/** The UserContext object
 * Provides the logged in user and roles objects, or if impersonating, the info for the user/roles being impersonated
 * Also provides an impersonate function to update
 */
export const UserContext = createContext({
  // This value would ONLY be used if a component tried referencing it, and there was no Provider for that context above it.
  // We use thie Context.Provider at a high level object in the tree, so it should never be referenced as undefined
  user: new Person({ Id: 0, Title: "Placeholder", EMail: "Placeholder" }),
  roles: undefined,
  impersonate: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // Get the current logged in user
  const loggedInUser = useCurrentUser();
  const [user, setUser] = useState(loggedInUser);
  //const { data: roles } = useUserRoles(user.Id);

  /**
   * Turn on/off or change the impersonated user
   *
   * @param user - Optional - If passed will impersonate that user, if not passed, will revert to being logged in user
   */
  const impersonate = (user?: Person) => {
    if (user) {
      setUser(user);
    } else {
      setUser(loggedInUser);
    }
  };

  /** The object to be passed to the Provider for all Consumers to use */
  const userContext = {
    user,
    //roles: roles ? roles : undefined,
    roles: undefined,
    impersonate: impersonate,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};
