import { action, computed, configure, observable } from 'mobx';
import SearchRepo from '../../repositories/SearchRepo';

configure({ enforceActions: 'observed' });

class SearchVM {
  @observable
  searchRepo = new SearchRepo();

  @computed
  get searchResults() {
    return this.searchRepo.searchQuery.queryResult;
  }

  @action
  setQuery = query => {
    this.searchRepo.setQuery(query);
  };

  @action
  sendQuery = () => {
    this.searchRepo.sendCurrentQuery();
  };

  @action
  refreshQuery = () => {
    this.searchRepo.refreshQuery();
  };

  @action
  fetchNewReleases = () => {
    this.searchRepo.fetchNewReleases();
  };
}

export default SearchVM;
