package com.helix.taskmanagementsystem.taskmodule.dto;

import com.helix.taskmanagementsystem.taskmodule.entity.TaskPriority;
import com.helix.taskmanagementsystem.taskmodule.entity.TaskStatus;
import lombok.Data;

@Data
public class TaskRequest {
    private String title;
    private String description;
    private TaskStatus status;
    private TaskPriority priority;
}
