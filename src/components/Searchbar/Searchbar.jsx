import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchImgValue: '',
  };

  searchValueChange = e => {
    this.setState({ searchImgValue: e.currentTarget.value.toLowerCase() });
  };

  searchSubmit = e => {
    e.preventDefault();
    if (this.state.searchImgValue.trim() === '') {
      toast.error('Please enter some world');
      return;
    }
    this.props.onSearch(this.state.searchImgValue);
    this.setState({ searchImgValue: '' });
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.searchSubmit}>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.searchValueChange}
            value={this.state.searchImgValue}
          />

          <SearchFormButton type="submit">
            <ImSearch />
          </SearchFormButton>
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

export default Searchbar;