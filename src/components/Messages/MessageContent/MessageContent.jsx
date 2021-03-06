import React from "react";
import { Comment, Image } from "semantic-ui-react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import "../messages.css";

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo();

const MessageContent = (props) => {
  return (
    <Comment>
      <Comment.Avatar src={props.message.user.avatar} />
      <Comment.Content className={props.ownMessage ? "ownMessage" : null}>
        <Comment.Author>{props.message.user.name}</Comment.Author>
        <Comment.Metadata>
          {timeAgo.format(props.message.timestamp)}
        </Comment.Metadata>
        <Comment.Text></Comment.Text>
        {String(props.message.image).includes(
          "https://firebasestorage.googleapis.com/v0/b/modulo-dd1f4.appspot.com/o/messages%2Fchat%2Fimages%"
        ) ? (
          <Image onLoad={props.imageLoaded} src={props.message.image} />
        ) : String(props.message.image).includes(
            "https://firebasestorage.googleapis.com/v0/b/modulo-dd1f4.appspot.com/o/messages%2Fchat%2Fpdfs%"
          ) ? (
          <Comment.Text
            href={props.message.image}
            style={{ color: "#4656cd", fontSize: "15px" }}
          >
            Checkout the uploaded PDF.
          </Comment.Text>
        ) : (
          <Comment.Text></Comment.Text>
        )}

        <Comment.Text>{props.message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default MessageContent;
