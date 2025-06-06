import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { GroupMember } from "./GroupMember";

export const GroupMembers = () => {
  const {
    appState: { userMessages, group, qsssa, members },
  } = useContext(AppContext);

  return (
    <div className="row">
      <div className="col-md-12 col-lg-12">
        {qsssa.type === "CHAT" &&
          userMessages?.map(({ user }) => (
            <GroupMember key={user.id} user={user} />
          ))}
        {qsssa.type === "IN_PERSON" &&
          members.map(({ user }) => <GroupMember key={user.id} user={user} />)}
        {qsssa.type === "RECORDINGS" &&
          group?.UsersOnGroups?.map(({ user }) => (
            <GroupMember key={user.id} user={user} />
          ))}
      </div>
    </div>
  );
};
