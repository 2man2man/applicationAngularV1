import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    title = 'MainPage';

    showHead: boolean = false;

    constructor(private router: Router) {

        router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                if (event['url'] == '/login') {
                    this.showHead = false;
                } else {
                    this.showHead = true;
                }
            }
        });
    }



}