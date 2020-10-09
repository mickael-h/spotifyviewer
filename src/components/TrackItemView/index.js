import { observer } from 'mobx-react-lite';
import React from 'react';
import { Icon, ListItem } from 'react-native-elements';
import { useLocale, useViewModels } from '../../hooks';

const TrackItemView = observer(props => {
  const item = props.trackItem;
  const { track } = useLocale();
  const { albumVM } = useViewModels();

  const isCurrentlyPlayingMe = albumVM.albumRepo.currentlyPlayingId == item.id;
  const canPreview = item.previewUrl != null;

  const render = () => {
    return (
      <ListItem bottomDivider onPress={canPreview ? onPreviewPress : null}>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{`${track} #${item.trackNumber}`}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content right={true}>
          {renderPlayIcon()}
        </ListItem.Content>
      </ListItem>
    );
  };

  const renderPlayIcon = () => {
    if (canPreview) {
      return (
        <Icon
          type='font-awesome'
          name={isCurrentlyPlayingMe ? 'pause' : 'play'}
          color='grey'
        />
      );
    } else {
      return null;
    }
  };

  const onPreviewPress = () => {
    if (!isCurrentlyPlayingMe) {
      albumVM.playTrack(item);
    } else {
      albumVM.stopPlaying();
    }
  };

  return render();
});

export default TrackItemView;
