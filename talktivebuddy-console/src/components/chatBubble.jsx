import React from "react";
import { noUserImg } from "../utils/noUser";
import { formatDateTimeFromISO } from "../utils/dateTime";
import { useSelector } from "react-redux";

const ChatBubble = ({
  obj,
  containerRef,
  i,
  talkingPeople,
  isSending = false,
  sendMessa,
  sendMsgerror,
  handleSendMsg,
}) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div key={i + 1} className="" ref={containerRef}>
        <div
          className={`p-3 d-inline-block d-flex align-items-center ${
            obj.senderId === user._id ? "float-right flex-row-reverse" : ""
          }`}
        >
          <div
            className={`d-flex flex-row align-items-center ${
              obj.senderId === user._id ? "flex-row-reverse" : ""
            }`}
          >
            <img
              alt="Profile Picture"
              src={
                obj.senderId === user?._id
                  ? user?.image || noUserImg
                  : talkingPeople?.image || noUserImg
              }
              className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
            />
            {!sendMsgerror && obj?.save === "saving" ? (
              <span className="mr-1 simple-icon-paper-plane"></span>
            ) : obj?.save === "saving" && sendMsgerror ? (
              <span
                className="mr-2 font-weight-bold cursor-hand simple-icon-reload"
                onClick={() => {
                  handleSendMsg(obj);
                }}
              ></span>
            ) : (
              ""
            )}
            <div
              className="card p-0 mx-2"
              style={
                obj?.save === "saving" && sendMsgerror
                  ? { border: "1px solid red" }
                  : {}
              }
            >
              <div className="chat-text-left p-2">
                <p className="mb-0 text-semi-muted">{obj?.text}</p>
              </div>
            </div>
          </div>
          <span className="text-extra-small text-muted">
            {formatDateTimeFromISO(obj?.createdAt) || "4:38"}
          </span>
        </div>
      </div>
      <div className="clearfix" />
    </>
  );
};

export default ChatBubble;
