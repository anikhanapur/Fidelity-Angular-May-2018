import { Component } from '@angular/core';
import { BugOperationsService } from './services/bugOperations.service';

import { Bug } from './models/Bug';

@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent{
	bugs : Bug[] = [];
	bugSortBy : string = 'name';
	bugSortDescending : boolean = false;

	

	constructor(private bugOperations : BugOperationsService){
		this.bugs = this.bugOperations.getAll();
	}
	
	onNewBugCreation(newBug : Bug){
		this.bugs = [...this.bugs, newBug];
	}	

	onBugNameClick(bugToToggle){
		//bugToToggle.isClosed = !bugToToggle.isClosed;
		let toggledBug = this.bugOperations.toggle(bugToToggle);
		/*this.bugs = this.bugs.map(function(bug){
			if (bug === bugToToggle){
				return toggledBug;
			} else {
				return bug;
			}
		});*/
		this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug);
	}
	
	onRemoveClosedClick(){
		/*this.bugs = this.bugs.filter(function(bug){
			return !bug.isClosed;
		});*/
		this.bugs
			.filter(bug => bug.isClosed)
			.forEach(closedBug => this.bugOperations.remove(closedBug));
		this.bugs = this.bugOperations.getAll();
	}

	getClosedCount(){
		//console.log('getClosedCount triggered');
		
	}


}







