import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { technologiesModel } from '../models/technologies_model';
import { CategoryModel } from '../models/category_model';
import { SkillGroupModel } from '../models/skill_group';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  public apiUrl: string = 'http://localhost:3000'; //Created this api by using json-server.
  public searchTerm: BehaviorSubject<any> = new BehaviorSubject<any>({}); //This Behaviour is created for pass the searched name from parent to child component.

  constructor(
    private http: HttpClient
  ) {

  }

  //Fetch the SkillGroup Details to select the Practice.
  getSkillGroupDetails(): Observable<SkillGroupModel[]> {
    return this.http.get<SkillGroupModel[]>(this.apiUrl + '/skillsGroup')
  }

  //Fetch the Category Details based on SkillsGroupId to select the Category.
  getCategorys(skillsGroupId: number): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.apiUrl + '/categorys?skillsGroupId=' + skillsGroupId);
  }

  //Fetch the TechStack Details based on the categoryId to select technologies.
  getTechnologies(categoryId: number): Observable<technologiesModel> {
    return this.http.get<technologiesModel>(this.apiUrl + '/techStacks?categoryId=' + categoryId)
  }

  //Fetch the Technologies Based on the name for search
  getSkills(): Observable<technologiesModel[]> {
    return this.http.get<technologiesModel[]>(this.apiUrl + '/techStacks')
  }

  //Post method to Create Added Skills into Skills section in db.json file file
  addSkills(skills: object): Observable<technologiesModel> {
    return this.http.post<technologiesModel>(this.apiUrl + '/skills', skills)
  }

}
