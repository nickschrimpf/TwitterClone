import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
    imports:[
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatTabsModule,
        MatProgressBarModule,
        MatProgressSpinnerModule
        
        
    ],
    exports:[
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatTabsModule,
        MatProgressBarModule,
        MatProgressBarModule
    ]
})
export class MaterialModule {}