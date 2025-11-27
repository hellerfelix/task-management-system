package com.helix.taskmanagementsystem.taskmodule.repository;

import com.helix.taskmanagementsystem.authentication.entity.User;
import com.helix.taskmanagementsystem.taskmodule.entity.Task;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserId(Long userId);

    // Get a task owned by a specific user
    Optional<Task> findByIdAndUserId(Long taskId, Long userId);
}
