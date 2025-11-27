package com.helix.taskmanagementsystem.taskmodule.Controller;

import com.helix.taskmanagementsystem.authentication.entity.User;
import com.helix.taskmanagementsystem.authentication.repository.UserRepository;
import com.helix.taskmanagementsystem.taskmodule.dto.TaskRequest;
import com.helix.taskmanagementsystem.taskmodule.dto.TaskResponse;
import com.helix.taskmanagementsystem.taskmodule.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;
    private final UserRepository userRepository;

    public TaskController(TaskService taskService, UserRepository userRepository) {
        this.taskService = taskService;
        this.userRepository = userRepository;
    }

    private Long getUserId(Authentication auth) {
        String email = auth.getName();   // returns email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }

    // Create Task
    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @RequestBody TaskRequest request,
            Authentication auth
    ) {
        Long userId = getUserId(auth);
        TaskResponse response = taskService.createTask(request, userId);
        return ResponseEntity.ok(response);
    }

    // Get All Tasks
    @GetMapping
    public ResponseEntity<List<TaskResponse>> getTasks(Authentication auth) {
        Long userId = getUserId(auth);
        return ResponseEntity.ok(taskService.getAllTasks(userId));
    }

    // Get Single Task
    @GetMapping("/{taskId}")
    public ResponseEntity<TaskResponse> getTaskById(
            @PathVariable Long taskId,
            Authentication auth
    ) {
        Long userId = getUserId(auth);
        return ResponseEntity.ok(taskService.getTaskById(taskId, userId));
    }

    // Update Task
    @PutMapping("/{taskId}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long taskId,
            @RequestBody TaskRequest request,
            Authentication auth
    ) {
        Long userId = getUserId(auth);
        return ResponseEntity.ok(taskService.updateTask(taskId, request, userId));
    }

    // Delete Task
    @DeleteMapping("/{taskId}")
    public ResponseEntity<String> deleteTask(
            @PathVariable Long taskId,
            Authentication auth
    ) {
        Long userId = getUserId(auth);
        taskService.deleteTask(taskId, userId);
        return ResponseEntity.ok("Task deleted successfully");
    }


}