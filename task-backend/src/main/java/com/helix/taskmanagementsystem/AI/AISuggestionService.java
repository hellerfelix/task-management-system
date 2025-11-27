package com.helix.taskmanagementsystem.AI;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class AISuggestionService {

    public List<String> generateSuggestions(String title, String description) {
        String text = (title + " " + description).toLowerCase();

        List<String> suggestions = new ArrayList<>();

        // 🔹 Bug related tasks
        if (text.contains("bug") || text.contains("error") || text.contains("fix")) {
            suggestions.add("Check backend logs to identify the root cause.");
            suggestions.add("Reproduce the issue in a controlled environment.");
            suggestions.add("Write unit tests to prevent regression.");
        }

        // 🔹 UI/Frontend related tasks
        if (text.contains("ui") || text.contains("frontend") || text.contains("design")) {
            suggestions.add("Use consistent spacing and responsive layout.");
            suggestions.add("Test UI on different screen sizes.");
            suggestions.add("Follow component-driven design principles.");
        }

        // 🔹 Backend / API tasks
        if (text.contains("api") || text.contains("backend") || text.contains("authentication")) {
            suggestions.add("Check Postman request payload and headers.");
            suggestions.add("Validate input data before saving.");
            suggestions.add("Log incoming requests for debugging.");
        }

        // 🔹 Study / learning tasks
        if (text.contains("study") || text.contains("interview") || text.contains("learn")) {
            suggestions.add("Create a structured study plan.");
            suggestions.add("Use mock tests to evaluate progress.");
            suggestions.add("Divide tasks into small achievable goals.");
        }

        // 🔹 Default fallback suggestions
        if (suggestions.isEmpty()) {
            suggestions.add("Break the task into smaller steps.");
            suggestions.add("Define clear acceptance criteria.");
            suggestions.add("Estimate a realistic deadline.");
        }

        return suggestions;
    }
}
