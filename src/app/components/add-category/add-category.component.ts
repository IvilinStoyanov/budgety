import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialIcons } from 'src/app/enums/material-icons-type';
import { Category } from 'src/app/models/category';
import { CommonService } from 'src/services/common.service';
import { NotificationService } from 'src/services/notification.service';

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

  panelOpenState: boolean;

  currentIconName: string;
  currentColorIndex: number;

  icons: any = [];
  foundedIcons: any = [];

  constructor(public commonService: CommonService, public notification: NotificationService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('data'));

    this.icons = Object.values(MaterialIcons).filter(icon => typeof icon !== 'number').map(value => ({ name: value }))

    this.createForm();

    const searchIconSubscription$ = this.form
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

  openPanel() {
    this.panelOpenState = !this.panelOpenState;
    console.log(this.panelOpenState);
  }

  selectColor(color: string, index: number) {
    this.currentColorIndex = index;
    this.form.get('color').setValue(color);
  }

  selectIcon(icon) {
    this.currentIconName = icon.name;
    this.form.get('icon').setValue(icon.name);
  }

  addCategory() {
    if(!this.currentIconName || !this.currentColorIndex)
    {
      this.notification.warn("Please select icon and color");
    }
    if (this.form.valid) {
      let nextCategoryIndex = this.data.categoryTemplates.length;

      // initial create of category
      let params = this.form.value;

      let category = { id: nextCategoryIndex, color: params.color, icon: params.icon, name: params.name, visible: true };

      this.data.categoryTemplates.push(category);

      this.commonService.saveData(this.data);

      this.form.reset();

      this.commonService.isAvailable.next(this.data);
      this.router.navigate(['/latest']);
      this.notification.success('Category successfully added');
    }
  }
}
