import { LightningElement, wire } from 'lwc'; 
import fetchAccounts from '@salesforce/apex/AccountController.fetchAccounts';
import { NavigationMixin } from 'lightning/navigation';

const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
];
 
const columns = [   
    { label: 'Name', fieldName: 'Name' }, 
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Is Active?', fieldName: 'Is_Active__c', type: 'boolean' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }, 
];

export default class SampleLWC extends NavigationMixin( LightningElement ) {
     
    accounts; 
    error; 
    columns = columns; 

    @wire( fetchAccounts )  
    wiredAccount( { error, data } ) {

        if ( data ) {

            this.accounts = data;
            this.error = undefined;

        } else if ( error ) {

            this.error = error;
            this.accounts = undefined;

        }

    }

    handleRowAction( event ) {

        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch ( actionName ) {
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        actionName: 'view'
                    }
                });
                break;
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Account',
                        actionName: 'edit'
                    }
                });
                break;
            default:
        }

    }

}