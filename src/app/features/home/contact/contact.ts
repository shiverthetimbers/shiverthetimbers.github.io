import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  resetForm(form: HTMLFormElement) {
    setTimeout(() => form.reset(), 0);
  }
}
