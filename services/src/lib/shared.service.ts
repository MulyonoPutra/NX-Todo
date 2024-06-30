/* eslint-disable @typescript-eslint/no-empty-function */

import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class SharedService {
	private visibilitySource = new BehaviorSubject<boolean>(false);
	currentVisibility = this.visibilitySource.asObservable();

	constructor() {}

	changeVisibility(isVisible: boolean) {
		this.visibilitySource.next(isVisible);
	}
}
