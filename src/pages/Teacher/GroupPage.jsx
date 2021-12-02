import { useEffect, useCallback, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { baseUrl, fetchWithToken } from "../../helpers/fetch";
import { types } from "../../types/types";
import { SocketContext } from "../../context/SocketContext";
import { AppContext } from "../../context/AppContext";
import useRecorder from "../../hooks/useRecorder";
import { ChatBox } from "../../components/Student/ChatBox";
import { GroupMembers } from "../../components/Student/GroupMembers";
import Picker from "emoji-picker-react";

export const GroupPage = () => {
  const { id } = useParams();
  const [audio, audioURL, isRecording, startRecording, stopRecording] =
    useRecorder();
  const { socket } = useContext(SocketContext);
  const [available, setAvailable] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const {
    auth: { name, uid },
  } = useContext(AuthContext);
  const {
    appState: { group, qsssa, messages },
    dispatch,
  } = useContext(AppContext);

  const joinRoom = useCallback(
    (id) => {
      socket?.emit("join", id);
    },
    [socket]
  );

  const onChange = ({ target }) => setMessage(target.value);
  const onEmojiClick = (e, { emoji }) => setMessage(`${message}${emoji}`);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("blob", audio);
    formData.append("groupId", group?.id);
    await fetchWithToken("answer", formData, "POST", true);
    socket?.emit("get-user-messages", id);
    socket?.emit("reload-group", id);
    socket?.emit("get-teacher-groups", id);
  };

  const sendMessage = async () => {
    if (message.length === 0) return;
    await fetchWithToken("message", { text: message, groupId: id }, "POST");
    socket?.emit("send-message", id);
    socket?.emit("reload-group", id);
    socket?.emit("get-user-messages", id);
    setMessage("");
  };

  const getGroup = useCallback(
    async (id) => {
      const { group } = await fetchWithToken(`group/group/${id}`);
      if (group) {
        const { messages } = await fetchWithToken(`message/${id}`);
        const { users } = await fetchWithToken(`message/members/${id}`);
        dispatch({ type: types.groupLoaded, payload: group });
        dispatch({ type: types.messagesLoaded, payload: messages });
        dispatch({ type: types.userMessagesLoaded, payload: users });
      } else {
        dispatch({ type: types.groupLoaded, payload: {} });
        dispatch({ type: types.messagesLoaded, payload: [] });
        dispatch({ type: types.userMessagesLoaded, payload: [] });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    joinRoom(id);
    return () => socket?.emit("leave", id);
  }, [joinRoom, socket, id]);

  useEffect(() => {
    getGroup(id);
  }, [getGroup, id]);

  return (
    <main style={{ background: group?.color ? group?.color : "" }}>
      <div className="grp-main">
        <div className="container">
          <h2 className="text-center pt-4">{group?.name}</h2>
          <div className="d-flex justify-content-between top-title-main">
            <p>{qsssa.accessCode}</p>
            <p>{qsssa.topic}</p>
          </div>
          <div className="justify-content-center row">
            <div className="col-lg-12">
              <div className="justify-content-center row">
                <div className="col-lg-6">
                  <div className="py-4 "></div>
                  <div className="questions-custom">
                    <p>While you are waiting think about this question: </p>
                    <h6>Question: {qsssa.question}</h6>
                    <audio src={audioURL} controls />
                    {qsssa.img && (
                      <img
                        className="img-fluid"
                        src={`${baseUrl}/upload/qsssas/${qsssa.accessCode}`}
                        alt={`${qsssa.question}`}
                      />
                    )}
                    {group !== undefined && (
                      <ChatBox
                        color={group?.color}
                        messages={messages}
                        uid={uid}
                      />
                    )}
                    {group?.selectedId !== null ? (
                      <h3 className="text-center my-5">
                        {group?.selected?.name} will go first
                      </h3>
                    ) : group?.identifier !== "" ? (
                      <h3 className="text-center my-5">
                        The student with the {group?.identifier} will go first
                      </h3>
                    ) : (
                      <></>
                    )}
                    {group && (
                      <GroupMembers group={group} messages={messages} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="form-main multi-group">
                <div className="form-wrap">
                  <div className="inner-box">
                    <table>
                      <thead>
                        <tr>
                          <th>Student Name</th>
                          <th>Record Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{name}</td>
                          <td>
                            <span className="rec-main">
                              {isRecording ? (
                                <button
                                  onClick={() => {
                                    setAvailable(true);
                                    stopRecording();
                                  }}
                                  className="btn btn-small rec-button"
                                >
                                  <span>
                                    <i className="fas fa-microphone" />
                                    Stop
                                  </span>
                                </button>
                              ) : (
                                <>
                                  <button
                                    onClick={() => {
                                      setAvailable(false);
                                      startRecording();
                                    }}
                                    className="btn btn-small rec-button"
                                  >
                                    <span>
                                      <i className="fas fa-microphone" />
                                      Record
                                    </span>
                                  </button>
                                </>
                              )}
                              {available && (
                                <button
                                  onClick={onSubmit}
                                  className="btn btn-small btn-secondary"
                                >
                                  Submit
                                </button>
                              )}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="input-group mt-5">
                    <input
                      type="text"
                      placeholder="Enter your message"
                      className="form-control mb-0"
                      name="message"
                      value={message}
                      onChange={onChange}
                    />
                    <div className="input group-append">
                      <button
                        type="button"
                        className="code-button btn-small btn btn-primary"
                        onClick={() => setEmoji(!emoji)}
                        style={{ right: "15px" }}
                      >
                        {!emoji ? "\uD83D\uDE00" : "\u2715"}
                      </button>
                      <Picker
                        pickerStyle={{
                          position: "absolute",
                          right: "0",
                          bottom: "100%",
                          zIndex: "9",
                          display: emoji ? "flex" : "none",
                        }}
                        onEmojiClick={onEmojiClick}
                      />
                      <button
                        type="button"
                        className="code-button btn-small btn btn-primary"
                        onClick={sendMessage}
                      >
                        <i className="fa fa-paper-plane" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
