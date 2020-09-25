import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Copyright &copy; 2020 Nguyễn Văn Ngọc
    </span>
    <div class="socials">
      <a href="https://github.com/nvn41091" target="_blank" class="ion ion-social-github"></a>
      <a href="https://facebook.com/nvn.hus" target="_blank" class="ion ion-social-facebook"></a>
    </div>
  `,
})
export class FooterComponent {
}
