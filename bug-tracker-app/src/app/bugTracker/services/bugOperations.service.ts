import { Injectable } from '@angular/core';
import { Bug } from '../models/Bug';
import { BugStorageService } from './bugStorage.service';

@Injectable()
export class BugOperationsService{
	constructor(private bugStorage : BugStorageService){

	}
	createNew(bugName : string) : Bug{
		let newBug : Bug = {
			id : 0,
			name : bugName,
			isClosed : false,
			createdAt : new Date()
		};
		return this.bugStorage.addNew(newBug);
	}
	getAll(){
		return this.bugStorage.getAll();
	}
	toggle(bugToToggle : Bug) : Bug{
		let toggledBug = { ...bugToToggle, isClosed : !bugToToggle.isClosed};
		return toggledBug;
	}
}