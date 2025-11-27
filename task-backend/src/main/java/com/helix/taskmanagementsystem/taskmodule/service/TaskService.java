package com.helix.taskmanagementsystem.taskmodule.service;

import com.helix.taskmanagementsystem.AI.AISuggestionService;
import com.helix.taskmanagementsystem.taskmodule.dto.TaskRequest;
import com.helix.taskmanagementsystem.taskmodule.dto.TaskResponse;
import com.helix.taskmanagementsystem.taskmodule.entity.Task;
import com.helix.taskmanagementsystem.authentication.entity.User;
import com.helix.taskmanagementsystem.taskmodule.repository.TaskRepository;
import com.helix.taskmanagementsystem.authentication.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final AISuggestionService aiSuggestionService;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository, AISuggestionService aiSuggestionService) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.aiSuggestionService = aiSuggestionService;
    }

    // Convert Entity → DTO (NO AI SUGGESTIONS HERE)
    private TaskResponse mapToResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getPriority(),
                task.getCreatedAt(),
                task.getUpdatedAt(),
                null // No suggestions for normal fetch
        );
    }

    // Create a new task
    public TaskResponse createTask(TaskRequest request, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setUser(user);

        Task saved = taskRepository.save(task);

        // Generate AI SUGGESTIONS
        List<String> suggestions = aiSuggestionService.generateSuggestions(
                task.getTitle(),
                task.getDescription()
        );

        // Return response WITH SUGGESTIONS
        return new TaskResponse(
                saved.getId(),
                saved.getTitle(),
                saved.getDescription(),
                saved.getStatus(),
                saved.getPriority(),
                saved.getCreatedAt(),
                saved.getUpdatedAt(),
                suggestions
        );
    }

    // Get all tasks of logged-in user
    public List<TaskResponse> getAllTasks(Long userId) {
        return taskRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get single task by ID
    public TaskResponse getTaskById(Long taskId, Long userId) {

        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        return mapToResponse(task);
    }

    // Update task
    public TaskResponse updateTask(Long taskId, TaskRequest request, Long userId) {

        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());

        Task updated = taskRepository.save(task);

        return mapToResponse(updated);
    }

    // Delete task
    public void deleteTask(Long taskId, Long userId) {
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        taskRepository.delete(task);
    }
}