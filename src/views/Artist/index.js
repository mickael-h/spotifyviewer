import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import AlbumItemView from '../../components/AlbumItemView';
import { useLocale, useViewModels } from '../../hooks';
import style from './style';

const Artist = observer(({ route, navigation }) => {
  const { artistVM } = useViewModels();
  const {
    error,
    unexpected_error,
  } = useLocale();

  artistVM.setArtist(route?.params?.artistItem);

  const render = () =>
    <View style={style.main}>
      {renderItems()}
    </View>;

  const renderItems = () => {
    const repo = artistVM.artistRepo;

    if (repo.error != null) {
      return renderErrorMessage(repo.error);
    } else if (repo.unexpectedError) {
      return renderUnexpectedError(repo.unexpectedError);
    } else {
      return renderArtistResults(repo.albumItems);
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

  const renderArtistResults = items =>
    <ScrollView style={style.scrollView} >
      {renderAlbumViews(items)}
    </ScrollView>;

  const renderAlbumViews = items =>
    items.map((item, i) =>
      <AlbumItemView
        key={i}
        albumItem={item}
        navigation={navigation}
      />
    );

  return render();
});

export default Artist;
