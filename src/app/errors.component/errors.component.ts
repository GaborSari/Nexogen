import { AfterContentInit, AfterViewInit, Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/services/common.service';

declare var google: any;

@Component({
    selector: 'errors',
    templateUrl: './errors.component.html'
})
export class ErrorsComponent {

    errors: Array<any> = new Array<any>();


    constructor(private router: Router, private common: CommonService) {

        this.common.errors.subscribe(error => {
            this.errors.push(error);
        });
    }


}
