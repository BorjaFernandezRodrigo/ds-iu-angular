import { NgDocRootComponent, NgDocNavbarComponent, NgDocSidebarComponent } from "@ng-doc/app";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'App',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, NgDocRootComponent, NgDocNavbarComponent, NgDocSidebarComponent],
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'ds-iu-angular-doc';
}
