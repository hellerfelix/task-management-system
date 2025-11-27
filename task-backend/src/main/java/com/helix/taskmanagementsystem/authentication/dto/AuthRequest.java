package com.helix.taskmanagementsystem.authentication.dto;

import lombok.Data;

@Data
public class AuthRequest {

    private String email;
    private String password;

}
