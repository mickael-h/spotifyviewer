import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import TrackItemView from '../../components/TrackItemView';
import { useLocale, useViewModels } from '../../hooks';
import style from './style';

const Album = observer(({ route, navigation }) => {
  const { albumVM } = useViewModels();
  const {
    error,
    unexpected_error,
  } = useLocale();

  albumVM.setAlbum(route?.params?.albumItem);

  const render = () =>
    <View style={style.main}>
      {renderItems()}
    </View>;

  const renderItems = () => {
    const repo = albumVM.albumRepo;

    if (repo.error != null) {
      return renderErrorMessage(repo.error);
    } else if (repo.unexpectedError) {
      return renderUnexpectedError(repo.unexpectedError);
    } else {
      return renderAlbumResults(repo.trackItems);
    }
  };

  const renderErrorMessage = message =>
    <Text>
      {`${error}: ${message}`}
    </Text>;

  const renderUnexpectedError = message =>
    <Text>
      {`${unexpected_error}: ${message}`}
    </Text>;

  const renderAlbumResults = items =>
    <ScrollView style={style.scrollView} >
      {renderTrackViews(items)}
    </ScrollView>;

  const renderTrackViews = items =>
    items.map((item, i) =>
      <TrackItemView
        key={i}
        trackItem={item}
        navigation={navigation}
      />
    );

  return render();
});

export default Album;
