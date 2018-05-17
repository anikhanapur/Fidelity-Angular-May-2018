import { Pipe, PipeTransform} from '@angular/core';

interface Comparer{
	(item1 : any, item2 : any) : number
}

@Pipe({
	name : 'sort',
	pure : true
})
export class SortPipe implements PipeTransform{

	private getDescendingComparerFor(comparer : Comparer) : Comparer{
		return function(item1, item2){
			return comparer(item1, item2) * -1;
	    }
	}
	private getComparerFor(attName : string) : Comparer{
		return function(item1, item2){
			if (item1[attName] < item2[attName]) return -1;
			if (item1[attName] > item2[attName]) return 1;
			return 0;
	    }
	}
	transform(data : any[], attrName : string, isDescending : boolean = false) : any[] {
		console.log('sort.transform triggered');
		if (!attrName) return data;
		let comparer = this.getComparerFor(attrName);
		if (isDescending){
			comparer = this.getDescendingComparerFor(comparer)
		}
		return data.sort(comparer);
	}
}

