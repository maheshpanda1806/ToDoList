package com.app.todolist.controllers;

import com.app.todolist.sevices.TaskService;
import org.springframework.web.bind.annotation.*;
import com.app.todolist.models.Task;

import java.util.List;

@RestController
@RequestMapping("api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    private TaskService service;

    public TaskController(TaskService service){
        this.service = service;
    }

    @GetMapping
    public List<Task> getTask(){
        return service.getAllTasks();
    }

    @PostMapping
    public Task addTask(@RequestBody Task task){
        return service.addTask(task);
    }

    @PutMapping("/{id}")
    public void updateTask(@PathVariable Long id, @RequestBody Task updatedTask){
        service.updateTask(id, updatedTask);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        service.deleteTask(id);
    }
}
