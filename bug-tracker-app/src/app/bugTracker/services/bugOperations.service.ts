import { Injectable } from '@angular/core';
import { Bug } from '../models/Bug';
import { BugStorageService } from './bugStorage.service';
import { BugServerService } from './bugServer.service';
import { Observable } from 'rxjs';

@Injectable()
export class BugOperationsService{
	constructor(private bugStorage : BugStorageService, private bugServer : BugServerService){

	}
	createNew(bugName : string) : Observable<Bug>{
		let newBug : Bug = {
			id : 0,
			name : bugName,
			isClosed : false,
			createdAt : new Date()
		};
		return this.bugServer.addNew(newBug);
	}
	getAll() : Observable<Bug[]>{
		return this.bugServer.getAll();
	}
	toggle(bugToToggle : Bug) : Observable<Bug>{
		let toggledBug = { ...bugToToggle, isClosed : !bugToToggle.isClosed};
		return this.bugServer.save(toggledBug);
	}
	remove(bug : Bug) : Observable<any> {
		return this.bugServer.remove(bug);
	}
}