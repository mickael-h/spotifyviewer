import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, ScrollView, Text, View, RefreshControl } from 'react-native';
import { Button, Input } from 'react-native-elements';
import AlbumItemView from '../../components/AlbumItemView';
import ArtistItemView from '../../components/ArtistItemView';
import { useLocale, useViewModels } from '../../hooks';
import style from './style';

const Search = observer(({ route, navigation }) => {
  const { searchVM } = useViewModels();
  const [refreshing, setRefreshing] = useState(false);
  const {
    search,
    artist,
    error,
    unexpected_error,
  } = useLocale();

  useEffect(() => {
    setRefreshing(false);
    if (searchVM.searchRepo.artistItems.length == 0) {
      searchVM.fetchNewReleases();
    }
  }, [searchVM.searchRepo.artistItems]);

  useEffect(() => {
    setRefreshing(false);
  }, [searchVM.searchRepo.newReleasesItems]);

  const render = () =>
    <View style={style.main}>
      {renderSearchBar()}
      {renderItems()}
    </View>;

  const renderSearchBar = () =>
    <View style={style.searchBar}>
      <Input
        containerStyle={style.input}
        placeholder={artist}
        leftIcon={{ type: 'font-awesome', name: 'search' }}
        onChangeText={text => searchVM.setQuery(text)}
      />
      <Button
        containerStyle={style.button}
        title={search}
        onPress={onSearchButtonPress}
      />
    </View>;

  const onSearchButtonPress = () => {
    Keyboard.dismiss();
    searchVM.sendQuery();
  };

  const renderItems = () => {
    const NO_QUERY_ERROR = 'No search query';
    const repo = searchVM.searchRepo;

    if (repo.error != null && repo.error != NO_QUERY_ERROR) {
      return renderErrorMessage(repo.error);
    } else if (repo.unexpectedError) {
      return renderUnexpectedError(repo.unexpectedError);
    } else if (repo.artistItems.length > 0) {
      return renderSearchResults(repo.artistItems);
    } else {
      return renderNewReleases(repo.newReleasesItems);
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

  const renderSearchResults = items =>
    <ScrollView
      style={style.scrollView}
      refreshControl={renderNewReleasesRefresh()}
    >
      {renderArtistViews(items)}
    </ScrollView>;

  const renderNewReleases = items =>
    <ScrollView
      style={style.scrollView}
      refreshControl={renderSearchRefresh()}
    >
      {renderAlbumViews(items)}
    </ScrollView>;

  const renderArtistViews = items =>
    items.map((item, i) =>
      <ArtistItemView
        key={i}
        artistItem={item}
        navigation={navigation}
      />
    );

  const renderAlbumViews = items =>
    items.map((item, i) =>
      <AlbumItemView
        key={i}
        albumItem={item}
        navigation={navigation}
      />
    );

  const renderSearchRefresh = () =>
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefreshSearchResults}
    />;

  const renderNewReleasesRefresh = () =>
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefreshNewReleases}
    />;

  const onRefreshSearchResults = useCallback(() => {
    setRefreshing(true);
    searchVM.refreshQuery();
  }, []);

  const onRefreshNewReleases = useCallback(() => {
    setRefreshing(true);
    searchVM.fetchNewReleases();
  }, []);

  return render();
});

export default Search;
