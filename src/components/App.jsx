import React, {Component} from "react";
import Searchbar from "./Searchbar";
import ImageGallery from './ImageGallery/';
import Loader from './Loader';

import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import { MainApp } from './App.styled';
 import {fetchGallery} from '../Api/Api'
 import LoadMore from "./LoadMore";
 
class App extends Component {
  state = {
    images: [],
    imgSearch: '',
    page: 1,
    isLoading: false,
    error: null,
    totalHits: null,
  };

  searchFormSubmit = imgSearch => {
    this.setState({
      imgSearch,
      page: 1,
      images: [],
      totalHits: null,
    });
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.imgSearch !== this.state.imgSearch ||
      prevState.page !== this.state.page 
    ) {
      this.setState({ isLoading: true });
      try {
        const images = await fetchGallery(
          this.state.imgSearch,
          this.state.page
        );

        const altImages = images.hits.map(
          ({ id, webformatURL, tags, largeImageURL }) => ({
            id,
            webformatURL,
            tags,
            largeImageURL,
          })
        );

        if (images.totalHits === 0) {
          return toast.error('Sorry, didn`t find, try another');
        }
        if (this.state.page >= 2) {
          return this.setState({
            images: [...prevState.images, ...altImages],
            totalHits: images.totalHits,
          });
        }

        this.setState({
          images: altImages,
          totalHits: images.totalHits,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  showBtnLoadMore = () => {
    const ShowBtn = this.state.totalHits - this.state.page * 12;
    if (ShowBtn > 0 && !this.state.isLoading) {
      return true;
    }
    return false;
  };
  render() {
    const { isLoading, images, totalHits } = this.state;

    return (
      <MainApp>
        <Searchbar onSearch={this.searchFormSubmit} />
        

        {totalHits > 0 ? <ImageGallery images={images} /> : null}

        {isLoading && <Loader />}
        {this.showBtnLoadMore() && <LoadMore onClick={this.loadMore} />}
        <ToastContainer />
      </MainApp>
    );
  }
}

export default App;