import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private ignoredUrl: string[] = [];

  constructor() { }

  isUrlIgnored(url) {
    if (this.ignoredUrl.some(fragment => url.includes(fragment)))
      return true;

    return false;
  }

  setUrls(Urls: string[]) {
    this.ignoredUrl.push(...Urls);
  }

}
