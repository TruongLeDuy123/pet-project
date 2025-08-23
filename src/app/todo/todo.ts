import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Task } from '../models/task.model';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-todo',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './todo.html',
    styleUrl: './todo.less'
})
export class Todo {
    tasks: Task[] = []
    todoForm: FormGroup
    isBrowser: boolean
    editingTask: Task | null = null
    filter: 'all' | 'active' | 'completed' = 'all'

    constructor(
        private fb: FormBuilder,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.todoForm = this.fb.group({
            title: ['', Validators.required]
        })
        this.isBrowser = isPlatformBrowser(this.platformId)
        if (this.isBrowser) this.loadTasks()
    }

    get filteredTasks(): Task[] {
        if (this.filter === 'active') {
            return this.tasks.filter(task => !task.completed)
        }
        if (this.filter === 'completed') {
            return this.tasks.filter(task => task.completed)
        }
        return this.tasks
    }

    setFilter(newFilter: 'all' | 'active' | 'completed') {
        this.filter = newFilter
    }

    addTask() {
        if (this.todoForm.invalid) return

        if (this.editingTask) {
            this.editingTask.title = this.todoForm.value.title
            this.editingTask = null
        }
        else {
            const newItem: Task = {
                id: Date.now(),
                title: this.todoForm.value.title,
                completed: false
            }
            this.tasks.push(newItem)
        }
        this.todoForm.reset()
        if (this.isBrowser) this.saveTasks()
    }

    toggleTask(task: Task) {
        task.completed = !task.completed
        if (this.isBrowser) this.saveTasks()
    }

    editTask(task: Task) {
        this.editingTask = task
        this.todoForm.setValue({ title: task.title })
    }

    deleteTask(taskId: number) {
        this.tasks = this.tasks.filter(task => task.id !== taskId)
        if (this.isBrowser) this.saveTasks()
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }

    loadTasks() {
        const data = localStorage.getItem('tasks')
        if (data) {
            this.tasks = JSON.parse(data)
        }
    }
}
