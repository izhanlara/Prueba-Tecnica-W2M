import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <p>&copy; 2025 SUPERHEROCRUD, Inc</p>
      <div class="rrds-icons">
        <a href="#" target="_blank" aria-label="Instagram">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="#" target="_blank" aria-label="YouTube">
          <i class="fab fa-youtube"></i>
        </a>
        <a href="#" target="_blank" aria-label="LinkedIn">
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="#" target="_blank" aria-label="Facebook">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#" target="_blank" aria-label="Twitter">
          <i class="fab fa-twitter"></i>
        </a>
      </div>
    </footer>
  `,
  styleUrls: ['./footer-styles.scss'],
})
export class FooterComponent {}
