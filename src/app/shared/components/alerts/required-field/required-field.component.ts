import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-required-field',
  templateUrl: './required-field.component.html',
  styleUrls: ['./required-field.component.scss']
})
export class RequiredFieldComponent implements OnInit {

  @Input() text!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
