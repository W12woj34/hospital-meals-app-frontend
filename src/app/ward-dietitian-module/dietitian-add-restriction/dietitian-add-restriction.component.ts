import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DietaryRestrictionService} from '../../service/base/dietary-restriction.service';
import {DietaryRestriction} from '../../dataBaseObjects/dietary-restriction';
import {RestrictionStatusService} from '../../service/base/restriction-status.service';
import {ConfirmDialogComponent} from '../../tools-module/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dietitian-add-restriction',
  templateUrl: './dietitian-add-restriction.component.html',
  styleUrls: ['./dietitian-add-restriction.component.css']
})
export class DietitianAddRestrictionComponent implements OnInit {


  restriction = '';

  constructor(public dialogRef: MatDialogRef<DietitianAddRestrictionComponent>,
              public dialog: MatDialog,
              private dietaryRestrictionService: DietaryRestrictionService,
              private restrictionStatusService: RestrictionStatusService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  onConfirm(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) {
        return;
      }
      this.restrictionStatusService.get('1').subscribe(status => {
        const dto: DietaryRestriction = {id: null, restriction: this.restriction, patientId: this.data.id, status};
        this.dietaryRestrictionService.post(dto, '').subscribe(() => {
          this.dialogRef.close(true);
        });
      });
    });


  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
