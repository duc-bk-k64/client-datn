import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class BaseService {

    constructor() {}

    protected get apiUrl(): string {
        return `${environment.backendApiUrl}`;
    }
    protected get apiDefault(): string {
        return this.apiUrl + '/api';
    }
}
