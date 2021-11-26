import React from "react";
import { connect } from "react-redux";
import { Menu, Icon } from "semantic-ui-react";
import { setChannel } from "../../../actions/actioncreator";
import "../channels/channels.css";

const favouriteChannels = (props) => {
  const displayChannels = () => {
    if (Object.keys(props.favouriteChannels).length > 0) {
      return Object.keys(props.favouriteChannels).map((ChannelId) => {
        return (
          <Menu.Item
            className="channel_items"
            key={ChannelId}
            name={props.favouriteChannels[ChannelId]}
            onClick={() =>
              props.selectChannel({
                id: ChannelId,
                name: props.favouriteChannels[ChannelId],
                isFavourite: true,
              })
            }
            active={
              props.channel &&
              ChannelId === props.channel.id &&
              props.channel.isFavourite
            }
          >
            {"# " + props.favouriteChannels[ChannelId]}
          </Menu.Item>
        );
      });
    }
  };

  return (
    <Menu.Menu className="channel" style={{ marginTop: "35px" }}>
      <Menu.Item className="channel" style={{ fontSize: "17px" }}>
        <span>
          <Icon name="yellow star" />
          Starred
        </span>
        ({Object.keys(props.favouriteChannels).length})
      </Menu.Item>
      {displayChannels()}
    </Menu.Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    channel: state.channel.currentChannel,
    favouriteChannels: state.favouriteChannel.favouriteChannel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectChannel: (channel) => dispatch(setChannel(channel)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(favouriteChannels);
