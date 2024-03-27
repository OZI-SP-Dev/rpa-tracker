import {
  Avatar,
  Text,
  Tooltip,
  makeStyles,
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from "@fluentui/react-components";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "providers/UserProvider";
import { tokens } from "@fluentui/react-theme";
import { useRoles } from "api/rolesApi";

/* FluentUI Styling */
const useStyles = makeStyles({
  navHeader: {
    display: "flex",
    position: "fixed",
    zIndex: 1000,
    width: "100%",
    height: "3em",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor:
      import.meta.env.MODE === "testing"
        ? tokens.colorPaletteDarkOrangeBackground3
        : tokens.colorBrandBackground,
  },
  navHeaderPadding: {
    height: "3em",
  },
  navHeaderSiteName: {
    fontWeight: "bold",
    fontSize: "1.5em",
  },
  navLink: {
    marginLeft: "1em",
    marginRight: "1em",
    textDecorationLine: "none",
    ":hover": { textDecorationLine: "underline" },
    color: tokens.colorBrandBackgroundInverted,
  },
  subNavLink: {
    marginLeft: "1em",
    marginRight: "1em",
    textDecorationLine: "none",
    ":hover": { textDecorationLine: "underline" },
  },
  navAvatar: { marginLeft: "auto", marginRight: "5px" }, // Force the Avatar icon to be positioned at the right most side
});

export const AppHeader = () => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const roles = useRoles();

  const myRoles = roles.data?.filter(
    (item) => Number(item.user.Id) === userContext.user.Id
  );

  const isAdmin =
    myRoles?.filter((item) => item.Title === "Admin").length === 1;

  const title =
    "RPA Tracker" +
    (import.meta.env.MODE === "testing" || import.meta.env.DEV
      ? " TEST SYSTEM"
      : "");

  return (
    <>
      <div role="heading" aria-level={1} className={classes.navHeader}>
        <Link className={classes.navLink} to="/">
          <Text className={classes.navHeaderSiteName}>{title}</Text>
        </Link>
        <Link to="/New" className={classes.navLink}>
          New Request
        </Link>
        {isAdmin && (
          <Link to="/Roles" className={classes.navLink}>
            Roles
          </Link>
        )}

        <Popover trapFocus={true} closeOnScroll={true} withArrow={true}>
          <PopoverTrigger>
            <Tooltip
              relationship="description"
              content={userContext.user ? userContext.user?.Title : ""}
            >
              <Avatar
                className={classes.navAvatar}
                image={
                  // If we don't have an imageUrl such as when Impersonating, just show Initials
                  userContext.user?.imageUrl
                    ? { src: userContext.user?.imageUrl }
                    : undefined
                }
                name={userContext.user?.Title}
                size={32}
              ></Avatar>
            </Tooltip>
          </PopoverTrigger>
          <PopoverSurface aria-label="Your roles">
            {
              /** If the user has role(s), list them */
              myRoles && myRoles.length > 0 && (
                <ul>
                  {myRoles?.map((role) => (
                    <li key={role.Title}>{role.Title}</li>
                  ))}
                </ul>
              )
            }
            {
              /** If the user has no privleged role(s), just state standard account */
              myRoles && myRoles.length === 0 && (
                <ul>
                  <li>Standard user account</li>
                </ul>
              )
            }
          </PopoverSurface>
        </Popover>
      </div>
      {/* The below div is set to the same height of the above div,
            to ensure all content loaded has proper padding at the top so that it isn't below the header */}
      <div className={classes.navHeaderPadding}></div>
    </>
  );
};
