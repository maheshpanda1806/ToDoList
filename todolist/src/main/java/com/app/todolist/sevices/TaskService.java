package com.app.todolist.sevices;

import com.app.todolist.models.Task;
import com.app.todolist.repositories.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepo taskRepo;

    @Autowired
    public TaskService(TaskRepo tr){
        this.taskRepo = tr;
    }

    public List<Task> getAllTasks(){
        return taskRepo.findAll();
    }


    public Task addTask(Task t){
        return taskRepo.save(t);
    }


    public void deleteTask(Long id){
        taskRepo.deleteById(id);
    }
    public Task updateTask(Long id, Task updatedTask) {
        return taskRepo.findById(id)
                .map(task -> {
                    task.setTitle(updatedTask.getTitle());
                    task.setCompleted(updatedTask.isCompleted());
                    return taskRepo.save(task);
                })
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }
}
