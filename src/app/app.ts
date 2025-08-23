import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterOutlet } from '@angular/router';
import { Todo } from './todo/todo';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.less',
    imports: [
        Todo, 
        CommonModule,
        
    ]
})

export class App {
    
}
