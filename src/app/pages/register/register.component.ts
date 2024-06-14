import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form!: FormGroup;
  errorMsg: string = '';

  errorMessage = '';
  hide = true

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private authGuard: AuthService,
    private router: Router,
    private userService: UserService
  ) {

    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      senha: [null, [Validators.required]],
    });

  }


  register() {
    this.spinner.show();
    this.userService.register(this.form.value).subscribe({
      next: () => {
        this.spinner.hide();
        this.router.navigate(['/events']);
      },
      error: (err) => {
        this.errorMsg = err.error.message;
        this.spinner.hide();
      },
    });
  }
}