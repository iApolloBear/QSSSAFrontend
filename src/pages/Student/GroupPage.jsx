import { useEffect, useCallback, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { RoomContext } from "../../context/RoomContext";
import { MessagesContext } from "../../context/messages/MessagesContext";
import { SocketContext } from "../../context/SocketContext";
import { GroupsContext } from "../../context/groups/GroupsContext";
import { useParams } from "react-router-dom";
import {
  fetchWithoutToken,
  baseUrl,
  fetchWithToken,
} from "../../helpers/fetch";
import Picker from "emoji-picker-react";
import useRecorder from "../../hooks/useRecorder";
import { types } from "../../types/types";

export const GroupPage = () => {
  const { id } = useParams();
  const [qsssa, setQSSSA] = useState({});
  const {
    auth: { name, uid },
  } = useContext(AuthContext);
  const { messagesState, dispatch: messageDispatch } =
    useContext(MessagesContext);
  const {
    groupsState: { group },
    dispatch: groupsDispatch,
  } = useContext(GroupsContext);
  const { socket } = useContext(SocketContext);
  const { room, join } = useContext(RoomContext);
  const [users] = useState(false);
  const [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  const [commentView, setCommentView] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [message, setMessage] = useState("");

  const onChange = ({ target }) => setMessage(target.value);
  const onEmojiClick = (e, { emoji }) => setMessage(`${message}${emoji}`);

  const getQSSSA = useCallback(
    async (id) => {
      const fetchQSSSA = await fetchWithoutToken(`qsssa/${id}`);
      join(id);
      setQSSSA(fetchQSSSA);
    },
    [join]
  );

  const getMessages = useCallback(
    async (id) => {
      const { messages } = await fetchWithToken(`messages/${id}`);
      messageDispatch({ type: types.messagesLoaded, payload: messages });
    },
    [messageDispatch]
  );

  const getMyGroup = useCallback(async () => {
    const { group } = await fetchWithToken(`groups/${room}/my-group`);
    groupsDispatch({ type: types.groupsLoaded, payload: group });
  }, [groupsDispatch, room]);

  const sendMessage = async () => {
    if (message.length === 0) return;
    socket?.emit("message", { id: room, text: message, user: uid });
    setMessage("");
  };

  useEffect(() => {
    getQSSSA(id);
  }, [getQSSSA, id]);

  useEffect(() => {
    getMyGroup();
  }, [getMyGroup]);

  useEffect(() => {
    getMessages(id);
  }, [getMessages, id]);

  return (
    <main>
      <div className="grp-main">
        <div className="container">
          <h2 className="text-center top-title-main">{group.name}</h2>
          <div className="d-flex justify-content-between top-title-main">
            <p>{qsssa.qsssa?.accessCode}</p>
            <p>{qsssa.qsssa?.topic}</p>
          </div>
          <div className="row">
            {/*{groups.map((group) => (*/}
            {/*<span>{group.name}</span>*/}
            {/*)*/}
          </div>
          <div className="justify-content-center row">
            <div className="col-lg-12">
              <div className="justify-content-center row">
                <div className="col-lg-6">
                  <div className="py-4 ">
                    {messagesState?.messages.map((message) =>
                      message.user._id === uid ? (
                        <div className="outgoing_msg">
                          <div className="sent_msg">
                            <p>{message.text}</p>
                            <span className="time_date">
                              {message.user.name}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="incoming_msg">
                          <div className="received_msg">
                            <div className="received_withd_msg">
                              <p>{message.text}</p>
                              <span className="time_date">
                                {message.user.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
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
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="form-main multi-group">
                <div className="form-wrap">
                  <h2 className="h5">&nbsp;</h2>
                  <div className="inner-box">
                    <ul className="mb-5 list-group">
                      {users &&
                        qsssa.qsssa?.users &&
                        qsssa.qsssa.users
                          .filter((user) => user.name !== name)
                          .map((user) => (
                            <div className="list-group-item ">
                              <div className="d-flex justify-content-between">
                                <div>{user.name}</div>
                                <div>
                                  <i
                                    style={{ cursor: "pointer" }}
                                    className="far fa-thumbs-up mx-2"
                                  ></i>
                                  <i
                                    style={{ cursor: "pointer" }}
                                    className="far fa-comment-alt"
                                    onClick={() => setCommentView(user._id)}
                                  ></i>
                                </div>
                              </div>
                              {commentView === user._id && (
                                <div className="mt-2">
                                  <input
                                    className="form-control"
                                    placeholder="Type a comment"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                    </ul>
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
                                  onClick={stopRecording}
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
                                    onClick={startRecording}
                                    className="btn btn-small rec-button"
                                  >
                                    <span>
                                      <i className="fas fa-microphone" />
                                      Record
                                    </span>
                                  </button>
                                </>
                              )}
                              {audioURL && (
                                <button className="btn btn-small btn-secondary">
                                  Submit
                                </button>
                              )}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                socket.emit("ready", { uid, room });
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
