import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { GroupMember } from "./GroupMember";

export const GroupMembers = () => {
  const {
    appState: { userMessages, group, qsssa },
  } = useContext(AppContext);

  return (
    <div className="row">
      <div className="col-md-12 col-lg-12">
        {qsssa.type === "CHAT" &&
          userMessages?.map(({ user }) => (
            <GroupMember key={user.id} user={user} />
          ))}
        {qsssa.type !== "CHAT" &&
          group?.UsersOnGroups?.map(({ user }) => (
            <GroupMember key={user.id} user={user} />
          ))}
      </div>
    </div>
  );
};
