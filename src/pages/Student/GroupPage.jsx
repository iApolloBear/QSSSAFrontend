import { useEffect, useCallback, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { useParams } from "react-router-dom";
import { baseUrl, fetchWithToken } from "../../helpers/fetch";
import Picker from "emoji-picker-react";
import useRecorder from "../../hooks/useRecorder";
import { types } from "../../types/types";
import { ChatBox } from "../../components/Student/ChatBox";
import { GroupMembers } from "../../components/Student/GroupMembers";
import { AppContext } from "../../context/AppContext";

export const GroupPage = () => {
  const { id } = useParams();
  const [qsssa, setQSSSA] = useState({});
  const [ready, setReady] = useState(false);
  const {
    auth: { name, uid },
  } = useContext(AuthContext);
  const {
    appState: { group, messages },
    dispatch,
  } = useContext(AppContext);
  const { socket } = useContext(SocketContext);
  const [audio, audioURL, isRecording, startRecording, stopRecording] =
    useRecorder();
  const [available, setAvailable] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("blob", audio);
    formData.append("groupId", group?.id);
    const resp = await fetchWithToken("answer", formData, "POST", true);
    //socket?.emit("answer", { id: group._id, user: uid, accessCode: id });
  };

  const onChange = ({ target }) => setMessage(target.value);
  const onEmojiClick = (e, { emoji }) => setMessage(`${message}${emoji}`);

  const getQSSSA = useCallback(async (id) => {
    const fetchQSSSA = await fetchWithToken(`qsssa/${id}`);
    setQSSSA(fetchQSSSA);
  }, []);

  const joinRoom = useCallback(
    (id) => {
      socket?.emit("join", id);
    },
    [socket]
  );

  const getMyGroup = useCallback(async () => {
    const { group } = await fetchWithToken(`student/my-group/${id}`);
    if (group) {
      const { messages } = await fetchWithToken(`message/${group.id}`);
      const { users } = await fetchWithToken(`message/members/${group.id}`);
      dispatch({ type: types.groupLoaded, payload: group });
      dispatch({ type: types.messagesLoaded, payload: messages });
      dispatch({ type: types.userMessagesLoaded, payload: users });
      socket?.emit("join-group", group.id);
    }
  }, [id, dispatch, socket]);

  const sendMessage = async () => {
    if (message.length === 0) return;
    await fetchWithToken(
      "message",
      { text: message, groupId: group?.id },
      "POST"
    );
    socket?.emit("send-message", group.id);
    setMessage("");
  };

  useEffect(() => {
    joinRoom(id);
    return () => socket?.emit("leave", id);
  }, [joinRoom, id, socket]);

  useEffect(() => {
    setReady(false);
  }, [setReady]);

  useEffect(() => {
    getQSSSA(id);
  }, [getQSSSA, id]);

  useEffect(() => {
    getMyGroup();
    return () => socket?.emit("leave", group.id);
  }, [getMyGroup, group.id, socket]);

  return (
    <main style={{ background: ready && group?.color ? group?.color : "" }}>
      <div className="grp-main">
        <div className="container">
          <h2 className="text-center pt-4">{ready && group?.name}</h2>
          <div className="d-flex justify-content-between top-title-main">
            <p>{qsssa.qsssa?.accessCode}</p>
            <p>{qsssa.qsssa?.topic}</p>
          </div>
          <div className="justify-content-center row">
            <div className="col-lg-12">
              <div className="justify-content-center row">
                <div className="col-lg-6">
                  <div className="py-4 "></div>
                  <div className="questions-custom">
                    <p>While you are waiting think about this question: </p>
                    <h6>Question: {qsssa.qsssa?.question}</h6>
                    <audio src={audioURL} controls />
                    {qsssa.qsssa?.img && (
                      <img
                        className="img-fluid"
                        src={`${baseUrl}/upload/qsssas/${id}`}
                        alt={`${qsssa}`}
                      />
                    )}
                    {ready && group !== undefined && (
                      <ChatBox
                        color={group?.color}
                        messages={messages}
                        uid={uid}
                      />
                    )}
                    {ready && group?.selected?.name ? (
                      <h3 className="text-center my-5">
                        {group.selected.name} will go first
                      </h3>
                    ) : ready && group ? (
                      <h3 className="text-center my-5">
                        The student with the {group?.identifier} will go first
                      </h3>
                    ) : (
                      <></>
                    )}
                    {ready && group && (
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
                          <td>
                            <button
                              onClick={() => {
                                socket.emit("ready", { uid });
                                setReady(true);
                              }}
                              className="btn btn-small btn-primary"
                            >
                              Ready to answer
                            </button>
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
                      disabled={
                        group?.active === false &&
                        group?.selectedId !== uid &&
                        group?.selectedId !== null
                      }
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
