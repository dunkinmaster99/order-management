import { Component, InjectionToken, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { KshitijBackendServiceService } from '../services/kshitij-backend-service.service';
import { ScrollStrategy } from '@angular/cdk/overlay';
import { NotificationService } from 'src/app/util/services/notification.service';
import { Route, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

//const MAT_AUTOCOMPLETE_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  FormData!: FormGroup;
  today = new Date(Date.now() + (3600 * 1000 * 24));
  productArray!: FormArray;
  partyTypeList: any[] = [];
  productList: any[] = [];
  isPincodeChange: boolean = false;
  newEntry!: FormGroup
  finalAmount: number = 0;
  dropdownSettings2!: IDropdownSettings;
  dropdownSettings3!: IDropdownSettings;

  constructor(private builder: FormBuilder, private kshitijService: KshitijBackendServiceService,
    private notifyService: NotificationService,
    private router: Router) {
  }
  ngOnInit(): void {
    this.initform();
    this.loadData();
    this.dropdownSettings2 = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };

    this.dropdownSettings3 = {
      singleSelection: true,
      idField: 'productId',
      textField: 'name',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
  }
  conditionsList = [
    { id: 1, value: "first", label: "first" },
    { id: 2, value: "second", label: "second" },
  ]

  unitList = [
    { id: 1, value: "pcs" },
    { id: 2, value: "pkt" },
    { id: 3, value: "roll" }
  ]

  partyTypeList2 = [
    { id: 1, value: "parth" },
    { id: 2, value: "sandeep" },
    { id: 3, value: "sai" },
    { id: 4, value: "pritam" },
    { id: 5, value: "rumit" },
  ]

  priorityList = [
    { id: 1, value: "High" },
    { id: 2, value: "Medium" },
    { id: 3, value: "Low" }
  ]
  // leiinfo: String = `Pick A date`

  initform() {

    this.productArray = this.builder.array([]);
    this.FormData = this.builder.group({
      // dealPartyConfigId: new FormControl('', []),
      // dealMasterId: new FormControl('', []),
      // partyMasterId: new FormControl(0, []),
      partyName: new FormControl('', [Validators.required]),
      orderNo: new FormControl('', [Validators.required]),
      gstinNo: new FormControl('', [Validators.required]),
      orderDate: new FormControl('', [Validators.required]),
      line1: new FormControl('', [Validators.required]),
      line2: new FormControl('', [Validators.required]),
      line3: new FormControl('', []),
      line4: new FormControl('', []),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      isDeliveryAddressSame: new FormControl(true, [Validators.required]),
      isPushedinTally: new FormControl(false),
      Dline1: new FormControl(''),
      Dline2: new FormControl(''),
      Dline3: new FormControl(''),
      Dline4: new FormControl(''),
      d_state: new FormControl(''),
      d_country: new FormControl(''),
      d_pincode: new FormControl(''),
      narration: new FormControl('', []),
      priority: new FormControl('', [Validators.required]),
      finalAmount: new FormControl({ value: '', disabled: true }, [Validators.required]),


      productArrayForm: this.productArray,
    });
    this.addProduct();

  }

  loadData() {
    this.kshitijService.listAllCustomers().subscribe(
      (data: any) => {
        this.partyTypeList = data.result;
      });

    this.kshitijService.listAllProducts().subscribe(
      (data: any) => {
        this.productList = data.result;
      }
    )
  }


  convertDateToDatepickerFormat(date: any) {
    return moment(new Date(date)).format("YYYY-MM-DD")
  }

  pincodeDisplayFn(project: any) {
    //console.log(project);
    return project ? project.pincode : null;
  }
  addProduct() {
    this.newEntry = this.builder.group({
      // conditionDropdown: new FormControl('', [Validators.required]),
      category: new FormControl('', []),
      conditionValue: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      rate: new FormControl('', [Validators.required]),
      amount: new FormControl({ value: '', disabled: true }, [Validators.required]),

    });
    this.newEntry.controls['category'].disable();
    this.newEntry.valueChanges.subscribe(() => {
      const rate: any = this.newEntry.get('rate')?.value;
      const quantity: any = this.newEntry.get('quantity')?.value;
      // const discount: any = this.newEntry.get('discount')?.value;
      var total = rate * quantity;
      // var disc_100 = discount/100;
      //var fin_disc = total * disc_100;
      var tadisc = total;
      const amount: any = tadisc.toFixed(2);
      this.newEntry.get('amount')?.setValue(amount);
    })
    this.productArray.push(this.newEntry)
  }
  removeProduct(index: any) {
    console.log(index);
    this.productArray.removeAt(index);
  }

  displayFn(option: any): string {
    // Customize how the option is displayed
    return option ? option.name : '';
  }

  onAddressToggleChange() {
    if (this.FormData.controls['isDeliveryAddressSame'].value) {
      this.FormData.controls['Dline1'].setValue(this.FormData.controls['line1'].value);
      this.FormData.controls['Dline2'].setValue(this.FormData.controls['line2'].value);
      this.FormData.controls['Dline3'].setValue(this.FormData.controls['line3'].value);
      this.FormData.controls['Dline4'].setValue(this.FormData.controls['line4'].value);
      this.FormData.controls['d_state'].setValue(this.FormData.controls['state'].value);
      this.FormData.controls['d_country'].setValue(this.FormData.controls['country'].value);
      this.FormData.controls['d_pincode'].setValue(this.FormData.controls['pincode'].value);
      this.FormData.controls['Dline1'].clearValidators();
      this.FormData.controls['Dline2'].clearValidators();
      this.FormData.controls['Dline3'].clearValidators();
      this.FormData.controls['Dline4'].clearValidators();
      this.FormData.controls['d_state'].clearValidators();
      this.FormData.controls['d_country'].clearValidators();
      this.FormData.controls['d_pincode'].clearValidators();

    }
    else {
      this.FormData.controls['Dline1'].setValue('');
      this.FormData.controls['Dline2'].setValue('');
      this.FormData.controls['Dline3'].setValue('');
      this.FormData.controls['Dline4'].setValue('');
      this.FormData.controls['d_state'].setValue('');
      this.FormData.controls['d_country'].setValue('');
      this.FormData.controls['d_pincode'].setValue('');
      this.FormData.controls['Dline1'].setValidators([Validators.required]);
      this.FormData.controls['Dline2'].setValidators([Validators.required]);
      this.FormData.controls['Dline3'].setValidators([]);
      this.FormData.controls['Dline4'].setValidators([]);
      this.FormData.controls['d_state'].setValidators([Validators.required]);
      this.FormData.controls['d_country'].setValidators([Validators.required]);
      this.FormData.controls['d_pincode'].setValidators([Validators.required]);
    }
  }

  goBack() {
    if (localStorage.getItem('jwtToken')) {
      if (JSON.parse(localStorage.getItem('roles') || '{}')[0].roleName == "Admin") {
        this.router.navigate(['order-list'])
      }
      if (JSON.parse(localStorage.getItem('roles') || '{}')[0].roleName == "Sales") {
        this.router.navigate(['salesListing'])
      }
    }
  }


  onSubmit() {

    console.log(this.FormData.controls['priority'].value);
    this.finalAmount = 0;
    const stock_items: any[] = [];
    this.productArray.controls.forEach((element: AbstractControl) => {
      console.log(element);
      console.log(Number(element.get('conditionValue')?.value[0].productId));

      // let properties = "Finish = " + element.get('finish')?.value + ", Size = " + element.get('size')?.value + 
      // ", Thickness = " + element.get('thickness')?.value + ", Size = " + element.get('size')?.value + 
      // ", Grade = " + element.get('grade')?.value + ", Color = " + element.get('color')?.value ;
      const Stock_item = {
        productId: Number(element.get('conditionValue')?.value[0].productId),
        properties: element.get('remarks')?.value,
        amount: Number(element.get('amount')?.value),
        quantity: Number(element.get('quantity')?.value),
        rate: Number(element.get('rate')?.value),
        unit: element.get('unit')?.value,
        status: 1
      }
      this.finalAmount = this.finalAmount + Number(element.get('amount')?.value),
        stock_items.push(Stock_item);
    });
    console.log(stock_items);
    let data = this.FormData.getRawValue();
    console.log(data.partyName[0]);
    const payload = {
      orderNumber: data.orderNo,
      narration: data.narration,
      priority: data.priority,

      statusId: 1,
      customerId: data.partyName[0].id,
      // isPushedInTally: data.isPushedinTally?'1':'0',
      isPushedInTally: '0',
      isDeliveryAddressSame: data.isDeliveryAddressSame ? '1' : '0',
      d_AddressLine1: data.isDeliveryAddressSame ? data.line1 : data.Dline1,
      d_AddressLine2: data.isDeliveryAddressSame ? data.line2 : data.Dline2,
      d_AddressLine3: data.isDeliveryAddressSame ? data.line3 : data.Dline3,
      d_AddressLine4: data.isDeliveryAddressSame ? data.line4 : data.Dline4,
      d_State: data.isDeliveryAddressSame ? data.state : data.d_state,
      d_Country: data.isDeliveryAddressSame ? data.country : data.d_country,
      d_Pincode: Number(data.isDeliveryAddressSame ? data.pincode : data.d_pincode),
      gst: data.gstinNo,
      finalAmount: Number(this.finalAmount.toFixed(2)),
      orderDate: data.orderDate,
      products: stock_items
    }
    console.log(payload);

    this.kshitijService.createOrder(payload).subscribe((data: any) => {
      this.notifyService.showSuccess(data.message, '');
      this.goBack();
    },
      (error: any) => {
        this.notifyService.showError(error.message, '');
      }
    )
  }

  partySelection(data: any) {
    console.log(data);
    // console.log(id.target.value);
    const selectedParty = this.partyTypeList.filter((single: any) => single.id === Number(data.id)
    )
    console.log(selectedParty);
    this.FormData.controls['line1'].setValue(selectedParty[0].addressLine1);
    this.FormData.controls['line2'].setValue(selectedParty[0].addressLine2);
    this.FormData.controls['line3'].setValue(selectedParty[0].addressLine3);

    this.FormData.controls['line4'].setValue(selectedParty[0].addressLine4);
    this.FormData.controls['gstinNo'].setValue(selectedParty[0].gstin);

  }

  productSelection(data: any, i: any) {
    console.log(data);
    const selecteProduct = this.productList.filter((single: any) => single.productId === Number(data.productId)
    )
    console.log(selecteProduct);
    this.productArray.at(i).get('category')?.patchValue(selecteProduct[0].category);


  }




} 