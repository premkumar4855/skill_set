import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SkillService } from '../../services/skill.service';
import { ToastrService } from 'ngx-toastr';


interface ISkills {
  SkillGroupName: string;
  categoryId: number;
  categoryName: string;
  checked: boolean;
  id: number;
  level: string;
  name: string;
}


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public skills: ISkills[] = [];
  public searchSkills;
  public filterData: any;
  public skillDetails: any = {};
  private subscription: Subscription;
  public searchedText: string = '';
  public selectedSkillEvent: any = []

  constructor(
    private service: SkillService,
    private toaster: ToastrService
  ) {

  }

  ngOnInit() {
    this.subscription = this.service.searchTerm.subscribe(response => {
      this.searchedText = this.capitalizeFirstLetter(response);
      this.fetchSkills();
    });
  }

  capitalizeFirstLetter(name) {
    return name[0].toUpperCase() + name.slice(1);
  }

  fetchSkills() {
    this.service.getSkills().subscribe(response => {
      this.searchSkills = response;
      this.filterData = this.searchSkills.filter(item => item.name.includes(this.searchedText));
    });
  }


  onSkillSelect(event: ISkills) {
    this.skills.push(event)
    if (event.checked == false) {
      const removeId = event.id;
      const index = this.skills.findIndex(item => item.id === removeId);
      if (index !== -1) {
        this.skills.splice(index, 1);
      }
      event.level = '';
    }
  }

  onLevelSelect(event, item) {
    const newSkill: ISkills = item;
    const index = this.skills.findIndex(item => item.id === newSkill.id);
    if (index !== -1) {
      this.skills[index] = newSkill;
    } else {
      this.skills.push(newSkill);
    }
  }

  onSubmit() {
    let validatedSkill: Array<any> = this.skills?.filter((element) => { return 'checked' in element && element.checked == true });
    console.log(this.skills);
    if (validatedSkill?.length == 0) {
      window.alert("please select skill")
    } else if (validatedSkill?.filter(element => element.checked == true && element.level == '').length != 0) {
      window.alert('Please select level for selected skill');
    } else {
      this.service.addSkills(validatedSkill).subscribe(response => {
        if (response) {
          this.toaster.success('Skills Added SuccessFully')
        }
      })
    }
  }
}
