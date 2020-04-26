import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private loaderState: Subject<any> = new Subject<any>();

  public showLoader(text: string): void {
    this.loaderState.next({ loaderText: text, visible: true });
  }

  public hideSpinner(): void {
    this.loaderState.next({ visible: false });
  }

  public getLoaderObservable(): Observable<any> {
    return this.loaderState.asObservable();
  }
}
