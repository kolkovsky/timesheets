import {Component, OnInit} from '@angular/core';
import {AdminParsingService} from '../../services/admin-parsing.service';
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";

@Component({
  selector: 'admin-parsing',
  templateUrl: './admin-parsing.component.html',
  styleUrls: ['./admin-parsing.component.less']
})

export class AdminParsingComponent implements OnInit {

  public file: File;
  private formatsExcelFiles: string[] = [".xlsx", ".xls"];
  public showErrorUpload: boolean = false;

  constructor(private adminParsingService: AdminParsingService,
              private loaderService: Ng4LoadingSpinnerService) {
  }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    if (event.target && event.target.files[0]) {
      let file: File = event.target.files[0];
      this.showErrorUpload = !this.formatsExcelFiles.some(format => file.name.includes(format));
      this.file = !this.showErrorUpload ? file : null;
    }
  }

  public sendFile(): void {
    this.loaderService.show();
    this.adminParsingService.importFile(this.file).subscribe((data) => {
      this.loaderService.hide();
    }, error => {
      console.info("Fuck shit!");
      this.loaderService.hide();
    });
  }

}
