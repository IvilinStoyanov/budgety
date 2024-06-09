import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private ignoredUrl: string[] = [];

  isUrlIgnored(url: string): boolean {
    if (this.ignoredUrl.some(fragment => url.includes(fragment))) return true;

    return false;
  }

  setUrls(Urls: string[]): void {
    this.ignoredUrl.push(...Urls);
  }
}
