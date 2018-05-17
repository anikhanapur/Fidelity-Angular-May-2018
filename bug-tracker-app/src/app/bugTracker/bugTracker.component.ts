import { Component } from '@angular/core';
import { BugOperationsService } from './services/bugOperations.service';

import { Bug } from './models/Bug';

@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent{
	bugs : Bug[] = [];

	constructor(private bugOperations : BugOperationsService){

	}
	onAddNewClick(bugName){
		let newBug : Bug = this.bugOperations.createNew(bugName);
		this.bugs.push(newBug);
	}

	onBugNameClick(bug){
		//bug.isClosed = !bug.isClosed;
		this.bugOperations.toggle(bug);
	}
	
	onRemoveClosedClick(){
		/*this.bugs = this.bugs.filter(function(bug){
			return !bug.isClosed;
		});*/

		this.bugs = this.bugs.filter(bug => !bug.isClosed);
	}

	getClosedCount(){
		return this.bugs.reduce(function(prevResult, bug){
			return bug.isClosed ? ++prevResult : prevResult;
		}, 0);
	}


}