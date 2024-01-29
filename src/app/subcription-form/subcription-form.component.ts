import { Component } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subcription-form',
  templateUrl: './subcription-form.component.html',
  styleUrls: ['./subcription-form.component.css']
})
export class SubcriptionFormComponent {
  isEmailError: boolean = false

  constructor(
    private subService: SubscribersService,
    private toastr : ToastrService
  ){}

  onSubmit(formData: any) {
    const subData: Sub = {
      name: formData.value.name,
      email: formData.value.email
    }

    this.subService.checkSubs(subData.email).subscribe(val => {
      if (val.empty) {
        this.subService.addSub(subData)
        this.toastr.success('Registration Successfully')
        formData.reset()
      } else {
        this.toastr.error('Email address is already in use')
      }
    })
  }
}
