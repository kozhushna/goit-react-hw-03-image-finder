import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '34313610-1e4a8498015aaf70caf78cfd3';
const PAGE_SIZE = 12;

async function getImages(searchQuery, page) {
  const { data } = await axios.get(BASE_URL, {
    params: {
      q: searchQuery,
      page: page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: PAGE_SIZE,
    },
  });

  // if (data.totalHits === 0) {
  //   throw new Error(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   );
  // }

  return {
    total: data.totalHits,
    images: data.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    })),
  };
}

export default getImages;

// export default class ImagesApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//     this.total = 0;
//     this.currentImages = 0;
//   }

//   async fetchImages() {
//     const result = await axios.get(BASE_URL, {
//       params: {
//         q: this.searchQuery,
//         page: this.page,
//         key: API_KEY,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         per_page: PAGE_SIZE,
//       },
//     });
//     console.log(result);

//     if (result.data.totalHits === 0) {
//       throw new Error(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     }
//     this.incrementPage();
//     this.currentImages += result.data.hits.length;
//     this.total = result.data.totalHits;
//     console.log(123);
//     return result.data.hits.map(
//       ({ id, webformatURL, largeImageURL, tags }) => ({
//         id,
//         webformatURL,
//         largeImageURL,
//         tags,
//       })
//     );
//   }

//   isLastPage() {
//     return this.currentImages >= this.total;
//   }

//   incrementPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//     this.currentImages = 0;
//     this.total = 0;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }
