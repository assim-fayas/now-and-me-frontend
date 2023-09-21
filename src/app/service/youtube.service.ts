import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  constructor(private http: HttpClient) { }

  getVideoDetails(videoId: string) {
    const apiKey = 'AIzaSyDSgllCUl5khPKifiClnQ-PRAd2YtFQ1RE'
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
    return this.http.get(url);
  }


}
