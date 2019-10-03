import {Component, OnInit} from '@angular/core';
import {AdminParsingService} from '../../services/admin-parsing.service';

@Component({
  selector: 'admin-parsing',
  templateUrl: './admin-parsing.component.html',
  styleUrls: ['./admin-parsing.component.less']
})

export class AdminParsingComponent implements OnInit {

  public file: File;

  constructor(private adminParsingService: AdminParsingService) {
  }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    let fileReader = new FileReader();
    this.file = event.target.files[0];
  }

  public sendFile(): void {
    this.adminParsingService.importFile(this.file).subscribe((data) => {
      console.log("Work!")
    }, error => {
      console.log(`This request was failed!(`);
    });
  }

}
