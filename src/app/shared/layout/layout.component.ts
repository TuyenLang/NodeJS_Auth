import { Component, Injector, inject, OnInit, effect } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  authService = inject(AuthService);
  isLoggedIn = false;
  injector = inject(Injector);
  ngOnInit(): void{
    effect(
      () => {
              this.isLoggedIn = this.authService.isLoggedIn();
            },
            {injector: this.injector} 
  );
  }
}
