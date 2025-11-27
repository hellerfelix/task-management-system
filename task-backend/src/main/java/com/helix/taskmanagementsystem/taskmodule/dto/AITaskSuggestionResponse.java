package com.helix.taskmanagementsystem.taskmodule.dto;

import lombok.Data;
import java.util.List;

@Data
public class AITaskSuggestionResponse {
    private String taskTitle;
    private List<String> suggestions;
}
