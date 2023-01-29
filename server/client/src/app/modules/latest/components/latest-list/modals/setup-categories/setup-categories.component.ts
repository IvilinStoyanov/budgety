import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categories } from 'src/app/enums/categories.enum';
import { CategoriesColors } from 'src/app/enums/categories-colors.enum';

@Component({
  selector: 'app-setup-categories',
  templateUrl: './setup-categories.component.html',
  styleUrls: ['./setup-categories.component.scss']
})
export class SetupCategoriesComponent {
  categoryTemplates = [
    { name: Categories.Salary, icon: 'attach_money', color: CategoriesColors.Salary, isSelected: false },
    { name: Categories.Car, icon: 'directions_car_filled', color: CategoriesColors.Car, isSelected: false },
    { name: Categories.Grocery, icon: 'shopping_cart', color: CategoriesColors.Grocery, isSelected: false },
    { name: Categories.Food, icon: 'restaurant', color: CategoriesColors.Food, isSelected: false },
    { name: Categories.Coffee, icon: 'local_cafe', color: CategoriesColors.Coffee, isSelected: false },
    { name: Categories.Haircut, icon: 'content_cut', color: CategoriesColors.Haircut, isSelected: false },
    { name: Categories.MedicalSupplies, icon: 'medication', color: CategoriesColors.MedicalSupplies, isSelected: false },
    { name: Categories.Holiday, icon: 'holiday_village', color: CategoriesColors.Holiday, isSelected: false },
    { name: Categories.Utilities, icon: 'receipt', color: CategoriesColors.Utilities, isSelected: false },
    { name: Categories.Rent, icon: 'bedroom_parent', color: CategoriesColors.Rent, isSelected: false },
    { name: Categories.LoanPayments, icon: 'credit_score', color: CategoriesColors.LoanPayments, isSelected: false }
  ];

  constructor(public dialogRef: MatDialogRef<SetupCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SetupCategoriesComponent) { }

  select(index: number) {
    this.categoryTemplates[index].isSelected = !this.categoryTemplates[index].isSelected;
  }

  import() {
    const filteredCategories = this.categoryTemplates.filter(category => category.isSelected);

    this.dialogRef.close(filteredCategories);
  }
}
