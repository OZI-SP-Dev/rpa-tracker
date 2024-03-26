import { Avatar } from "@fluentui/react-components";

const UserAvatar = ({ user }: { user?: { EMail: string; Title: string } }) => {
  if (!user) return <></>;

  const initials =
    user.Title.substring(
      user.Title.indexOf(" ") + 1,
      user.Title.indexOf(" ") + 2
    ) + user.Title.substring(0, 1);

  return (
    //TODO Add <Popover> with dynamically loaded card to display user's details (Phone/Email/etc)
    <Avatar
      aria-label={user.Title}
      name={user.Title}
      initials={initials}
      image={{
        src: `/_layouts/15/userphoto.aspx?accountname=${user.EMail}&size=S`,
      }}
      size={32}
    ></Avatar>
  );
};

export default UserAvatar;
