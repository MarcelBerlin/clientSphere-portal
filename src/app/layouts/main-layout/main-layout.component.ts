import { Component } from '@angular/core';
import { HeaderComponent } from "../../pages/header/header.component";
import { SidenavComponent } from "../../pages/sidenav/sidenav.component";
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../../pages/footer/footer.component";

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, SidenavComponent, RouterModule, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
