import { Bug } from '../models/Bug';

export class BugStorageService{
	private currentBugId = 0;
	private storage = window.localStorage;

	addNew(bugData : Bug) : Bug {
		let newBug = {...bugData, id : ++this.currentBugId};
		return this.save(newBug);
	}

	save(bug : Bug) : Bug{
		this.storage.setItem(bug.id.toString(), JSON.stringify(bug));
		return bug;
	}
	remove(bug : Bug) : void{
		this.storage.removeItem(bug.id.toString());
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