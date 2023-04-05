import { Component } from '@angular/core';
import { SkillService } from './services/skill.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: 'Skill Portal'
  public search;
  public enteredText: string = '';
  public searchSkill: boolean = false;

  constructor(
    private service: SkillService
  ) {

  }

  onSearchEnter(event) {
    this.enteredText = event;
  }

  searchSkills() {
    if (this.enteredText.length < 3) {
      window.alert('Minimum 3 characters required');
    } else {
      this.searchSkill = true;
      this.service.searchTerm.next(this.enteredText);
    }
  }

  resetSearch() {
    this.searchSkill = false;
    this.search = '';
    this.enteredText = '';
  }

}
