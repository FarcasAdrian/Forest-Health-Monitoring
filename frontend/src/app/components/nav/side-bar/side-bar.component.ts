import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserPanelService } from '../../../services/user-panel.service';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    public existAssigmentForest = true;

    constructor(private breakpointObserver: BreakpointObserver,
        public userPanelService: UserPanelService) {
        this.userPanelService.getUserCredentials();
    }

    ngOnInit() {
        this.userPanelService.assigmentForestDataSource.subscribe(
            tableSource => this.existAssigmentForest = tableSource && tableSource.forest ? true : false);
    }

    // check if the logged in user has a assigmented forest
    get hasForesterPrivilegies() {
        if (this.userPanelService.userTypeAccess !== 'user' && this.existAssigmentForest) {
            return true;
        }
        return false;
    }

    // check if the logged in user is a administrator
    get hasAdminPrivilegies() {
        if (this.userPanelService.userTypeAccess === 'admin') {
            return true;
        }
        return false;
    }
}
