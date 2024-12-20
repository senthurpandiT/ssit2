import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../Services/common.service';
import { selectedLanguage } from '../../Interfaces/validation-interfaces';
import { frequentVariables } from '../../Interfaces/roles';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  template: `@defer(when common.selectedLang) {
    <div class="dropdown lang-dropdown ">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
      >
        <img
          loading="lazy"
          src="{{ common.selectedLang?.flag }}"
          alt="{{ common.selectedLang }}"
          width="20"
          height="20"
        />
        &nbsp;
        {{ common.selectedLang?.language }}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a
          *ngFor="let language of common.languageList"
          class="dropdown-item"
          (click)="langugaeSelected(language)"
        >
          <img
            loading="lazy"
            src="{{ language.flag }}"
            width="20"
            height="20"
          />
          {{ language.language }}
        </a>
      </div>
    </div>
    }`,
  styles: '',
})
export class LanguageComponent {
  constructor(public common: CommonService) {

  }
  async langugaeSelected(lang: selectedLanguage) {
    this.common.selectedLang = lang;
    localStorage.setItem(frequentVariables.declaredLslangauge, JSON.stringify(lang));
    await this.common.translateLanguage(lang?.code);
  }
}
