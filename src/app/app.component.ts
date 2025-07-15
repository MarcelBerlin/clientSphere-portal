import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./pages/footer/footer.component";
import { SidenavComponent } from "./pages/sidenav/sidenav.component";
import { HeaderComponent } from './pages/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client-sphere-portal';
}
