import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  restaurantsListControl = new FormControl();
  options: string[] = ['deurali', 'kanchu ko vatti', 'madan grill kitchen and bar', 'Alucha'];
  filteredOptions: Observable<string[]>;

  constructor(protected router: Router, protected authService: AuthService) { }

  ngOnInit() {
    this.filteredOptions = this.restaurantsListControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  viewMenu(){
      this.router.navigateByUrl('/menu');
  }

  isLoggedIn(){
    return this.authService.isLoggedIn;
  }

}
