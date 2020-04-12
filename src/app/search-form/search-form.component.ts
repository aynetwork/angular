import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  searchForm;

  constructor(
    private formBuilder: FormBuilder, private router: Router
  ) {
    this.searchForm = this.formBuilder.group({
      search: '',
    });
  }

  ngOnInit(): void {
  }

  onSubmit(customerData) {
    this.router.navigate([
      'crisis-center', { search: customerData.search }]);

    console.warn('Your order has been submitted', customerData);
  }

}
