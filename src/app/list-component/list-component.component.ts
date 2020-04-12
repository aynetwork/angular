import {Component, HostListener, OnInit} from '@angular/core';
import {StackexchangeService} from '../stackexchange.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../question';

export enum KEY_CODE {
  LEFT_ARROW = 39,
  ENTER = 13,
  RIGHT_ARROW = 37
}


@Component({
  selector: 'app-crisis-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss']
})
export class CrisisListComponent implements OnInit {

  constructor(private stackService: StackexchangeService, private activatedRoute: ActivatedRoute, private router: Router) { }
  static sortColumnField = 'title';
  localSort = 'title';
  currentSelected = 0;
  questions: Question[];
  userQuestions: [];
  noData = false;
  order = 'desc';

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    try {
      if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
        console.log(KEY_CODE.RIGHT_ARROW);
        this.currentSelected = (this.currentSelected - 1 >= 0) ? this.currentSelected - 1 : this.currentSelected ;
        event.preventDefault();
      }
      if (event.keyCode === KEY_CODE.LEFT_ARROW) {
        console.log(KEY_CODE.LEFT_ARROW);
        this.currentSelected = (this.currentSelected + 1 < this.questions.length) ? this.currentSelected + 1 : this.currentSelected;
        event.preventDefault();
      }
      if (event.keyCode === KEY_CODE.ENTER) {
        const url = `/crisis-center/${this.questions[this.currentSelected].question_id}`;
        this.router.navigateByUrl(url);
        event.preventDefault();
      }
    } catch (e) {

    }
  }

  showDetails(event, id): void {
    this.getHero(id);

    // alert(event.target.attributes.href);
    event.preventDefault();
  }
  showTag(event, tagName): void {
    this.getTag(tagName);
    event.preventDefault();
  }
  sortColumn(event, column): void {
    CrisisListComponent.sortColumnField = this.localSort = column;

    this.questions = this.questions.sort(this.sortFn);
    if (this.order === 'desc') {
      this.order = 'asc';
      this.questions.reverse();
    } else {
      this.order = 'desc';
    }
    event.preventDefault();
  }
  sortFn(a, b): number {
    const d = CrisisListComponent.sortColumnField;
    // если сортировка по автору
    if (d  === 'author'){
      return a.owner.display_name > b.owner.display_name ? 1 : a.owner.display_name === b.owner.display_name ? 0 : -1;
    } else {
      return a[d] > b[d] ? 1 : a.owner.display_name === b.owner.display_name ? 0 : -1;
    }
  }
  getHero(userId: number): void {
    this.stackService.getUserQuestions(userId)
      .subscribe(resp => {
        this.userQuestions = resp.body.items;
        this.noData = this.userQuestions.length !== 0;
      });
  }
  getTag(tagName: string): void {
    this.stackService.getTagQuestions(tagName)
      .subscribe(resp => {
        this.userQuestions = resp.body.items;
        this.noData = this.userQuestions.length !== 0;
        console.log(this.noData);
      });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const searchString = this.activatedRoute.snapshot.params.search;
      this.getHeroes(searchString);
    });
  }

  getHeroes(searchString: string): void {
    this.stackService.getQuestions(searchString)
      .subscribe(resp => {
        this.questions = resp.body.items;
      });
  }

}
