import { Bug } from '../models/Bug';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BugServerService{
	private baseUrl = 'http://localhost:3000/bugs';

	constructor(private httpClient : HttpClient){

	}
	getAll() : Observable<Bug[]>{
		return this.httpClient
			.get<Bug[]>(this.baseUrl);
	}

	addNew(bugData : Bug) : Observable<Bug> {
		return this.save(bugData);
	}

	save(bug : Bug) : Observable<Bug> {
		if (bug.id === 0){
			return this.httpClient
				.post<Bug>(this.baseUrl, bug);
		} else {
			return this.httpClient
				.put<Bug>(`${this.baseUrl}/${bug.id}`, bug);
		}
	}
	remove(bug : Bug) : Observable<any> {
		return this.httpClient
			.delete<any>(`${this.baseUrl}/${bug.id}`);
	}
}

