import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { GroupMember } from "./GroupMember";

export const GroupMembers = () => {
  const {
    appState: { userMessages, group },
  } = useContext(AppContext);

  return (
    <div className="row">
      <div className="col-md-12 col-lg-12">
        {group.selectedId !== null
          ? userMessages?.map(({ user }) => (
              <GroupMember key={user.id} user={user} />
            ))
          : group?.UsersOnGroups?.map(({ user }) => (
              <GroupMember key={user.id} user={user} />
            ))}
      </div>
    </div>
  );
};
