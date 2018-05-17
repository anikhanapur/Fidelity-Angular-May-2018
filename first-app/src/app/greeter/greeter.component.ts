import { Component } from '@angular/core';

@Component({
	selector : 'app-greeter',
	templateUrl : 'greeter.component.html'
})
export class GreeterComponent{
	 message = 'Welcome to Angular!';

	 onClearClick(){
	  	this.message = '';
	  }
	  onGreetClick(userName){
	  	this.message = `Hi ${userName}, Have a nice day!`;
	  }
}