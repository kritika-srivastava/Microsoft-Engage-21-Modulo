import React, { useState, useEffect, useRef } from "react";
import MessageHeader from "./MessageHeader/MessageHeader";
import MessageContent from "./MessageContent/MessageContent";
import MessageInput from "./MessageInput/MessageInput";
import {
  setFavouriteChannel,
  removeFavouriteChannel,
} from "../../actions/actioncreator";
import firebase from "../../server/firebase";
import { connect } from "react-redux";
import { Comment, Segment } from "semantic-ui-react";
import "./messages.css";

const Messages = (props) => {
  const messageRef = firebase.database().ref("messages");
  const usersRef = firebase.database().ref("users");
  const [SearchTermState, setSearchTermState] = useState("");
  const [messageState, setMessageState] = useState([]);

  let divRef = useRef();

  useEffect(() => {
    if (props.channel) {
      setMessageState([]);
      messageRef.child(props.channel.id).on("child_added", (snap) => {
        setMessageState((currentState) => {
          let updatedState = [...currentState];
          updatedState.push(snap.val());
          return updatedState;
        });
      });

      return () => messageRef.child(props.channel.id).off();
    }
  }, [props.channel]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.user) {
      usersRef
        .child(props.user.uid)
        .child("favourite")
        .on("child_added", (snap) => {
          props.setFavouriteChannel(snap.val());
        });

      usersRef
        .child(props.user.uid)
        .child("favourite")
        .on("child_removed", (snap) => {
          props.removeFavouriteChannel(snap.val());
        });

      return () => usersRef.child(props.user.uid).child("favourite").off();
    }
  }, [props.user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    divRef.scrollIntoView({ behavior: "smooth" });
  }, [messageState]);

  const displayMessages = () => {
    let messagesToDisplay = SearchTermState
      ? filterMessageBySearchTerm()
      : messageState;
    if (messagesToDisplay.length > 0) {
      return messagesToDisplay.map((message) => {
        return (
          <MessageContent
            imageLoaded={imageLoaded}
            ownMessage={message.user.id === props.user?.uid}
            key={message.timestamp}
            message={message}
          />
        );
      });
    }
  };

  const imageLoaded = () => {
    divRef.scrollIntoView({ behavior: "smooth" });
  };
  const uniqueUsersCount = () => {
    const uniqueUsers = messageState.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);

    return uniqueUsers.length;
  };

  const searchTermChange = (e) => {
    const target = e.target;
    setSearchTermState(target.value);
  };

  const filterMessageBySearchTerm = () => {
    const regex = new RegExp(
      SearchTermState.replace(/([.?*+^$[\]\\(){}|-])/g, ""),
      "gi"
    );
    const messages = messageState.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    return messages;
  };

  const starChange = () => {
    let favouriteRef = usersRef
      .child(props.user.uid)
      .child("favourite")
      .child(props.channel.id);
    if (isStarred()) {
      favouriteRef.remove();
    } else {
      favouriteRef.set({
        channelId: props.channel.id,
        channelName: props.channel.name,
      });
    }
  };

  const isStarred = () => {
    return Object.keys(props.favouriteChannel).includes(props.channel?.id);
  };

  return (
    <div>
      <MessageHeader
        starChange={starChange}
        starred={isStarred()}
        searchTermChange={searchTermChange}
        isPrivateChat={props.channel?.isPrivateChat}
        channelName={props.channel?.name}
        uniqueUsers={uniqueUsersCount()}
      />
      <Segment className="msg_content">
        <Comment.Group>
          {displayMessages()}
          <div ref={(currentEl) => (divRef = currentEl)}></div>
        </Comment.Group>
      </Segment>
      <MessageInput />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    channel: state.channel.currentChannel,
    user: state.user.currentUser,
    favouriteChannel: state.favouriteChannel.favouriteChannel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFavouriteChannel: (channel) => dispatch(setFavouriteChannel(channel)),
    removeFavouriteChannel: (channel) =>
      dispatch(removeFavouriteChannel(channel)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Messages);
