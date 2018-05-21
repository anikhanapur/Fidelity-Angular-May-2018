import { Component, OnInit } from '@angular/core';
import { BugOperationsService } from './services/bugOperations.service';

import { Bug } from './models/Bug';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';


window['Observable'] = Observable;

@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit{
	bugs : Bug[] = [];
	bugSortBy : string = 'name';
	bugSortDescending : boolean = false;

	ngOnInit(){
		this.loadBugs();
	}

	loadBugs(){
		this.bugOperations.getAll()
			.subscribe(bugs => this.bugs = bugs);
	}
	constructor(private bugOperations : BugOperationsService){
		
	}
	
	onNewBugCreation(newBug : Bug){
		this.bugs = [...this.bugs, newBug];
	}	

	onBugNameClick(bugToToggle){
		
		this.bugOperations
			.toggle(bugToToggle)
			.subscribe(toggledBug => 
				this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug));
		
	}
	
	onRemoveClosedClick(){
		/*this.bugs = this.bugs.filter(function(bug){
			return !bug.isClosed;
		});*/
		let responses = this.bugs
			.filter(bug => bug.isClosed)
			.map(closedBug => this.bugOperations.remove(closedBug));
		Observable
		this.loadBugs();
	}

	getClosedCount(){
		//console.log('getClosedCount triggered');
		
	}


}







