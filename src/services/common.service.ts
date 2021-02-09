import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CommonService {
    errors: Subject<Error> = new Subject();

    addError(error: Error) {
        this.errors.next(error);
    }
}

