import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Question} from '../question';
import {StackexchangeService} from '../stackexchange.service';
import { Location } from '@angular/common';


export enum KEY_CODE {
  BACKSPACE = 8,
}

@Component({
  selector: 'app-hero-detail-component',
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.scss']
})

export class HeroDetailComponent implements OnInit {

  question: Question;
  answers: [];
  id: string;

  constructor(private actRoute: ActivatedRoute,
              private router: Router,
              private stackService: StackexchangeService,
              private location: Location
              ) {

    this.id = this.actRoute.snapshot.params.id;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.BACKSPACE) {
      this.location.back();
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.router.navigate([], {
      queryParams: {
        search: null,
      },
      queryParamsHandling: 'merge'
    })
    this.getQuestion(this.id);
    this.getAnswers(this.id);

  }

  getQuestion(id){
    this.stackService.getQuestion(id)
      .subscribe(resp => {
        this.question = resp.body.items[0];
      });
  }

  getAnswers(id){
    this.stackService.getAnswers(id)
      .subscribe(resp => {
        this.answers = resp.body.items;
      });
  }


}
