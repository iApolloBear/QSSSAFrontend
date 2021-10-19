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
  const [ready, setReady] = useState(false);
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
  const [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
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

  const getMessages = useCallback(async () => {
    if (group?._id) {
      const { messages } = await fetchWithToken(`messages/${group?._id}`);
      messageDispatch({ type: types.messagesLoaded, payload: messages });
    }
  }, [messageDispatch, group]);

  const getMyGroup = useCallback(async () => {
    const { group } = await fetchWithToken(`groups/${room}/my-group`);
    groupsDispatch({ type: types.groupsLoaded, payload: group });
  }, [groupsDispatch, room]);

  const sendMessage = async () => {
    if (message.length === 0) return;
    socket?.emit("message", { id: group._id, text: message, user: uid });
    setMessage("");
  };

  useEffect(() => {
    setReady(false);
  }, [setReady]);

  useEffect(() => {
    getQSSSA(id);
  }, [getQSSSA, id]);

  useEffect(() => {
    getMyGroup();
  }, [getMyGroup]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <main style={{ background: ready ? group?.color : "" }}>
      <div className="grp-main">
        <div className="container">
          <h2 className="text-center pt-4">{ready && group?.name}</h2>
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
                    <div className="my-5">
                      {ready &&
                        group !== undefined &&
                        messagesState?.messages?.map((message) =>
                          message.user._id === uid ? (
                            <div key={message._id} className="outgoing_msg">
                              <div className="sent_msg">
                                <p>{message.text}</p>
                                <span className="time_date">
                                  {message.user.name}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div key={message._id} className="incoming_msg">
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
                      <div className="col-md-12 col-lg-12">
                        <div className="form-main multi-group">
                          <div
                            style={{ background: group.color }}
                            className="form-wrap"
                          >
                            <h2 className="h5">{group.name}</h2>
                            <div className="inner-box">
                              <table>
                                <thead>
                                  <tr>
                                    <th>Student Name:</th>
                                    <th>Record Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {group.users?.map((user) => (
                                    <tr key={user._id}>
                                      <td>{user.name}</td>
                                      <td>
                                        <i className="far fa-play-circle"></i>
                                        Pending
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
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
                        group?.active === false && group?.selected?._id !== uid
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
