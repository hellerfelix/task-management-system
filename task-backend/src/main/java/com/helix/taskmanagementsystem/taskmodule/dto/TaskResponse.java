package com.helix.taskmanagementsystem.taskmodule.dto;

import com.helix.taskmanagementsystem.taskmodule.entity.TaskPriority;
import com.helix.taskmanagementsystem.taskmodule.entity.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;     // ENUM
    private TaskPriority priority; // ENUM
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<String> suggestions;
}
