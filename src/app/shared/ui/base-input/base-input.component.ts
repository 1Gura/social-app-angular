import { Component, Input, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-base-input',
  standalone: true,
  imports: [FormsModule, InputTextModule, NgIf],
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.scss',
})
export class BaseInputComponent implements OnInit {
  @Input() label = '';

  uniqueId = '';
  value: string | undefined;

  ngOnInit(): void {
    this.uniqueId = `input-${uuidv4()}`;
  }
}
