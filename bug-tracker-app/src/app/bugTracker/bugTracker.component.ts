import { Component } from '@angular/core';

import { Bug } from './models/Bug';

@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent{
	bugs : Bug[] = [];

	onAddNewClick(bugName){
		let newBug : Bug = {
			name : bugName,
			isClosed : false
		};
		this.bugs.push(newBug);
	}

	onBugNameClick(bug){
		bug.isClosed = !bug.isClosed;
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