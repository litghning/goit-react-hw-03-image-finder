import axios from 'axios';

const key = '32537278-8466db4d076cc3f8d180bd03a';

const fetchGallery = async (nameRequest, page) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: key,
      q: nameRequest,
      page: page,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });
  return response.data;
};

export { fetchGallery };