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
   this.file = event.target.files;
  }

  public sendFile(): void {
    this.adminParsingService.importFile(this.file).subscribe( () => {
        console.log("SUCCESS!!!!!!!!!!!!!!!");
    });
  }

}
