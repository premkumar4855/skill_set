import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from 'src/app/models/category_model';
import { SkillGroupModel } from 'src/app/models/skill_group';
import { technologiesModel } from 'src/app/models/technologies_model';
import { SkillService } from 'src/app/services/skill.service';



@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.scss']
})
export class AddSkillsComponent implements OnInit {
  public skills: any = {
    practiceId: '',
    categoryId: '',
    techStacks: []
  };
  public spinner: boolean = false;
  public skillsGroup: Array<SkillGroupModel>;
  public categories: Array<CategoryModel>;
  public technologies: Array<technologiesModel>;

  constructor(
    private fb: FormBuilder,
    private skillService: SkillService,
    private toaster: ToastrService

  ) {

  }
  //Fetch the SkillGroup Details to select practice.
  ngOnInit(): void {
    this.skillService.getSkillGroupDetails().subscribe((response: any) => {
      this.skillsGroup = response;
    });
  }

  //Fetch the categories based on the skillgroupId.
  onPracticeChange(event) {
    this.spinner = true;
    this.skillService.getCategorys(event).subscribe((response: any) => {
      this.skills.techStacks = [];
      this.categories = response;
      this.spinner = false;
    });
  }

  //Fetch the techstacks based on the categoryId
  onCategoryChange(event) {
    this.spinner = true;
    this.skillService.getTechnologies(event).subscribe((response: any) => {
      this.technologies = [...response];
      this.skills.techStacks = [...response];
      this.spinner = false;
    });
  }

  //Validating the level section based on the selected skill
  onSkillSelect(event) {
    if (event.checked == true) {
    } else if (event.checked == false && event.level != '') {
      event.level = ''
    };
  }





  //Fially filtering the skills which are unchecked and thi skills dont have the level value.
  onSubmit() {
    this.spinner = true;
    let validatedSkill: Array<any> = this.skills.techStacks?.filter((element) => { return 'checked' in element && element.checked == true })
    if (validatedSkill?.length == 0) {
      window.alert("please select skill");
      this.spinner = false;
    }
    else if (validatedSkill?.filter(element => element.checked == true && element.level == '').length != 0) {
      window.alert('Please select level for selected skill');
      this.spinner = false;
    } else {
      this.spinner = true;
      this.skills.techStacks = validatedSkill;
      this.skillService.addSkills(this.skills).subscribe(response => {
        if (response) {
          this.skills = {};
          this.toaster.success('Skills added successfully');
          this.spinner = false;
        }
      })
    }
  }

  onCancel() {
    this.skills = {};
  }
}



