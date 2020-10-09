import { action, configure, observable } from 'mobx';

configure({ enforceActions: 'observed' });

class SearchQuery {
  @observable
  currentQuery = '';

  @observable
  savedQuery = '';

  @observable
  queryResult = null;

  @action
  setQuery = query => {
    this.currentQuery = query;
  };

  @action
  saveQuery = () => {
    this.savedQuery = this.currentQuery;
  };

  @action
  setResult = result => {
    this.queryResult = result;
  };
}

export default SearchQuery;
