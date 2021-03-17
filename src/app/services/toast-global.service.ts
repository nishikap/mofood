import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastGlobalService {

  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  success(message) {
    this.show(message, { classname: 'bg-success text-light', delay: 10000 });
  }

  normal(message: string) {
    this.show(message);
  }

  error(message: string) {
    this.show(message, { classname: 'bg-danger text-light', delay: 15000 });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
