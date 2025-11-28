import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
//import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoadingOverlay } from './components/loading-overlay/loading-overlay';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Paginator } from './components/paginator/paginator';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { Uppercase } from '../core/directives/uppercase';
import { OnlyNumber } from '../core/directives/only-number';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterOutlet,
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    //HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    LoadingOverlay,
    RouterModule,
    MatPaginatorModule,
    Paginator,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    Uppercase,
    OnlyNumber
  ],
  exports: [
    CommonModule,
    RouterOutlet,
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    //HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    LoadingOverlay,
    RouterModule,
    MatPaginatorModule,
    Paginator,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    Uppercase,
    OnlyNumber
  ],
})
export class SharedModule { }
