import {Component, OnInit} from '@angular/core';
import {AdminParsingService} from '../../services/admin-parsing.service';

@Component({
  selector: 'admin-parsing',
  templateUrl: './admin-parsing.component.html',
  styleUrls: ['./admin-parsing.component.less']
})

export class AdminParsingComponent implements OnInit {

  public file: File;
  private formatsExcelFiles: string[] = [".xlsx", ".xls"];
  public showErrorUpload: boolean = false;

  constructor(private adminParsingService: AdminParsingService) {
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
    console.log(this.file);
    this.adminParsingService.importFile(this.file).subscribe((data) => {
      console.log("Work!")
    }, error => {
      console.log(`This request was failed!(`);
    });
  }

}
