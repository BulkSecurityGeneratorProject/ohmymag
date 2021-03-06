import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDepartement } from 'app/shared/model/departement.model';
import { DepartementService } from './departement.service';

@Component({
    selector: 'jhi-departement-update',
    templateUrl: './departement-update.component.html'
})
export class DepartementUpdateComponent implements OnInit {
    departement: IDepartement;
    isSaving: boolean;

    constructor(protected departementService: DepartementService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ departement }) => {
            this.departement = departement;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.departement.id !== undefined) {
            this.subscribeToSaveResponse(this.departementService.update(this.departement));
        } else {
            this.subscribeToSaveResponse(this.departementService.create(this.departement));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartement>>) {
        result.subscribe((res: HttpResponse<IDepartement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
