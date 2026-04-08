import { Component } from '@angular/core';
import { SocialLink } from './footer.model';

@Component({
  selector: 'app-footer',
  templateUrl: './section-footer.component.html',
  styleUrls: ['./section-footer.component.scss'],
})
export class FooterComponent {
  public readonly CURRENT_YEAR: number = new Date().getFullYear();

  public readonly SOCIAL_LINKS: SocialLink[] = [
    {
      id: 1,
      name: 'Instagram',
      url: 'https://www.instagram.com',
      icon: 'img/instagram.svg',
    },
    {
      id: 2,
      name: 'Youtube',
      url: 'https://www.youtube.com',
      icon: 'img/youtube.svg',
    },
    {
      id: 3,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com',
      icon: 'img/linkedin.svg',
    },
    {
      id: 4,
      name: 'Facebook',
      url: 'https://www.facebook.com',
      icon: 'img/facebook.svg',
    },
    {
      id: 5,
      name: 'Twitter',
      url: 'https://www.twitter.com',
      icon: 'img/twitter.svg',
    },
  ];
}
