import { Injectable, Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BankAccount } from './bank-account.model';
import { BankAccountService } from './bank-account.service';
@Injectable()
export class BankAccountPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private bankAccountService: BankAccountService
    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.bankAccountService.find(id).subscribe(bankAccount => {
                this.bankAccountModalRef(component, bankAccount);
            });
        } else {
            return this.bankAccountModalRef(component, new BankAccount());
        }
    }

    bankAccountModalRef(component: Component, bankAccount: BankAccount): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bankAccount = bankAccount;
        modalRef.result.then(result => {
            console.log(`Closed with: ${result}`);
            this.isOpen = false;
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
            this.isOpen = false;
        });
        return modalRef;
    }
}
