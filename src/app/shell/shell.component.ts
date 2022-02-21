import { Title } from '@angular/platform-browser';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthenticationService, CredentialsService } from '@app/auth';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  opened = true;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private media: MediaObserver

  ) {}

  ngOnInit() {
    console.log(window.innerWidth);
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 63;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 63;
      this.opened = false;
    }
  }


  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
