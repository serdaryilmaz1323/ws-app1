import { IAlbum, IPhoto } from '../models/album.model';
import axios from 'axios';

export const AlbumService = {
  fetchAlbumList: async (userId: number): Promise<IAlbum[]> => {
    return await axios
      .get<IAlbum[]>('https://jsonplaceholder.typicode.com/albums')
      .then(response => {
        return response.data.filter(item => item.userId === userId);
      })
      .catch(error => {
        return [];
      });
  },
  fetchPhotoList: async (albumId: number): Promise<IPhoto[]> => {
    return await axios
      .get<IPhoto[]>('https://jsonplaceholder.typicode.com/photos?albumId=' + albumId)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return [];
      });
  },
};
