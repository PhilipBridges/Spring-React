package com.example.agile.controllers;

import com.example.agile.domain.Task;
import com.example.agile.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/board")
public class TaskController {

    @Autowired
    private TaskService taskService;


    @PostMapping("")
    public ResponseEntity<?> addTaskToBoard(@Valid @RequestBody Task task, BindingResult result, Authentication authentication) {

        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();

            for (FieldError error: result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }

            return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
        }

        task.setOwner(authentication.getName());

        Task newTask = taskService.saveOrUpdateTask(task);

        return new ResponseEntity<Task>(newTask, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<Task> getAllTasks(Authentication authentication) {
        return taskService.findByOwner(authentication.getName());
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<?> getTaskById(@PathVariable Long taskId) {
        Task foundTask = taskService.findById(taskId);
        return new ResponseEntity<Task>(foundTask, HttpStatus.OK);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteById(@PathVariable Long taskId) {
        taskService.delete(taskId);
        return new ResponseEntity<String>("Task deleted.", HttpStatus.OK);
    }
}
