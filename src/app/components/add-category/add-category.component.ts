import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MaterialIcons } from 'src/app/enums/material-icons-type';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  private _searchIconSubscription: Subscription = new Subscription();

  form: FormGroup;
  data: any;
  searchText: string;

  activeIndex: number;
  currentIconName: string;

  icons: any = [];
  foundedIcons: any = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('data'));

    this.icons = Object.values(MaterialIcons).filter(icon => typeof icon !== 'number') .map(value => ({ name: value}))

    console.log(this.icons);

    this.createForm();

    var searchIconSubscription$ = this.form
      .get('searchText')
      .valueChanges.subscribe((value) => { this.searchText = value; });

    this._searchIconSubscription.add(searchIconSubscription$);
  }

  ngOnDestroy() {
    this._searchIconSubscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['', Validators.required],
      searchText: ['']
    });
  }

  selectIcon(icon, index) {
    console.log(icon, index);
    this.activeIndex = index;
    this.currentIconName = icon.name;
  }

  addCategory() {

  }

}
