export const ChatBox = ({ color, messages, uid }) => {
  return (
    <div className="my-5">
      <div className="card">
        <div className="card-header">Chat</div>
        <div
          className="card-body"
          style={{
            height: "500px",
            overflowY: "scroll",
            background: color ? color : "",
          }}
        >
          {messages?.map((message) =>
            message.user._id === uid ? (
              <div key={message._id} className="outgoing_msg">
                <div className="sent_msg">
                  <p>{message.text}</p>
                  <span className="time_date">{message.user.name}</span>
                </div>
              </div>
            ) : (
              <div key={message._id} className="incoming_msg">
                <div className="received_msg">
                  <div className="received_withd_msg">
                    <p>{message.text}</p>
                    <span className="time_date">{message.user.name}</span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
