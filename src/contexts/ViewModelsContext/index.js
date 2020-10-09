import React from 'react';
import LoginVM from '../../viewmodels/LoginVM';
import SearchVM from '../../viewmodels/SearchVM';
import ArtistVM from '../../viewmodels/ArtistVM';
import AlbumVM from '../../viewmodels/AlbumVM';

export const ViewModelsContext = React.createContext({
  loginVM: new LoginVM(),
  searchVM: new SearchVM(),
  artistVM: new ArtistVM(),
  albumVM: new AlbumVM(),
});
