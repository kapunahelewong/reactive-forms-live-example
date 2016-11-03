import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

function passwordMatcher(c: AbstractControl) {
  return c.get('password').value === c.get('confirm').value
    ? null : {'nomatch': true};
}

@Component({
  selector: 'reactive-forms-comp',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent {
  form: FormGroup;
  addresses: FormArray;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      first: '',
      last: '',
      account: this._fb.group({
        username: '',
        password: ['', Validators.required],
        confirm: ['', Validators.required],
      }, {validator: passwordMatcher}),
      addresses: this.buildArray(),
      newsletter: ''
    });
    this.form.patchValue({
      first: 'Nancy',
      last: 'Drew'
    });
  }

  buildArray() : FormArray {
    this.addresses = this._fb.array([
      this.buildGroup()
      ]);
    return this.addresses
  }

  buildGroup() : FormGroup {
    return this._fb.group({
        street: ['', Validators.required],
        city: '',
        state: 'CA',
        zip: ''
    });
  }

  add() {
    this.addresses.push(this.buildGroup());
  }

}

