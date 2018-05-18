import { Bug } from '../models/Bug';

export class BugStorageService{
	private currentBugId = 0;
	private storage = window.localStorage;

	addNew(bugData : Bug) : Bug {
		let newBug = {...bugData, id : ++this.currentBugId};
		this.storage.setItem(newBug.id.toString(), JSON.stringify(newBug))
		return newBug;
	}

	getAll() : Bug[]{
		let result = [];
		for(let index = 0, count = this.storage.length; index < count; index++){
			let key = this.storage.key(index),
				rawData = this.storage.getItem(key),
				bug = JSON.parse(rawData);
			result.push(bug);
			this.currentBugId = this.currentBugId > bug.id ? this.currentBugId : bug.id;
		}
		return result;
	}
}